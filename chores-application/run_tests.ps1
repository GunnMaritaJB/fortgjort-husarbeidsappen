# Define paths
$testsFolder = ".\tests"
$logFolder = ".\test_logs"

# Check if maestro is installed
try {
    $maestroVersion = maestro --version 2>&1
    Write-Host "Using Maestro version: $maestroVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Maestro is not installed or not in PATH. Please install Maestro first." -ForegroundColor Red
    Write-Host "See https://maestro.mobile.dev/getting-started/installing-maestro" -ForegroundColor Yellow
    exit 1
}

# Make sure the test_logs folder exists
if (-Not (Test-Path $logFolder)) {
    New-Item -ItemType Directory -Path $logFolder | Out-Null
    Write-Host "Created log directory: $logFolder" -ForegroundColor Gray
}

# Find all .yaml and .yml files in tests/ and subfolders
$flowFiles = Get-ChildItem -Path $testsFolder -Recurse -Include *.yaml, *.yml

if ($flowFiles.Count -eq 0) {
    Write-Host "No test files found in $testsFolder" -ForegroundColor Yellow
    exit 0
}

# Group the flow files by their parent folder
$groupedFlows = $flowFiles | Group-Object { $_.DirectoryName }

# Run tests per folder
foreach ($group in $groupedFlows) {
    $folderPath = $group.Name
    $folderName = Split-Path $folderPath -Leaf

    # Create a log file per folder
    $outputFile = Join-Path -Path $logFolder -ChildPath "$folderName-test-results.txt"

    # Clear old output file if it exists
    if (Test-Path $outputFile) {
        Remove-Item $outputFile -Force
    }

    Write-Host "Running tests in folder: $folderName" -ForegroundColor Yellow

    foreach ($flow in $group.Group) {
        $flowName = $flow.Name
        Write-Host "  Running test: $flowName" -ForegroundColor Cyan

        # Append flow name and date to the folder's output file
        Add-Content -Path $outputFile -Value "===== Running: $($flow.FullName) ===== $(Get-Date)"

        # Run the maestro test and append both stdout and stderr output
        try {
            $result = & maestro test $flow.FullName 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "    Test passed: $flowName" -ForegroundColor Green
            } else {
                Write-Host "    Test failed: $flowName" -ForegroundColor Red
            }
            $result | Out-String | Add-Content -Path $outputFile
        } catch {
            Write-Host "    Error running test: $flowName" -ForegroundColor Red
            Add-Content -Path $outputFile -Value "Error running $($flow.FullName): $_"
        }

        Add-Content -Path $outputFile -Value "`n"  # Add a newline for better separation
    }
} # closing } for the outer foreach

Write-Host ""
Write-Host "All tests finished! Logs saved in: $logFolder" -ForegroundColor Green
