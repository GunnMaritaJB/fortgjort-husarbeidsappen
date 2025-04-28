param(
    [string[]]$SelectedFolders
)

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

# If folders were selected, filter groups
if ($SelectedFolders) {
    $groupedFlows = $groupedFlows | Where-Object {
        $folderName = Split-Path $_.Name -Leaf
        $SelectedFolders -contains $folderName
    }

    if ($groupedFlows.Count -eq 0) {
        Write-Host "No matching folders found for: $SelectedFolders" -ForegroundColor Red
        exit 1
    }
}

# Add metadata for the report
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Initialize arrays to store summary data
$folderSummaries = @()
$totalAllTests = 0
$totalAllPassed = 0
$totalAllFailed = 0

# Run tests per folder
$folderCounter = 1

foreach ($group in $groupedFlows) {
    $folderPath = $group.Name
    $folderName = Split-Path $folderPath -Leaf

    # Create a log file per folder
    $outputFile = Join-Path -Path $logFolder -ChildPath "$folderName-test-results.md"

    if (Test-Path $outputFile) {
        Remove-Item $outputFile -Force
    }

    Write-Host "Running tests in folder: $folderName" -ForegroundColor Yellow

    # Markdown header for each folder
    $mdHeader = @"
# Test Results: ${folderCounter}: $folderName

- **Date:** $timestamp
- **Test Count:** $($group.Group.Count)

## Test Execution Summary
"@

    Add-Content -Path $outputFile -Value $mdHeader

    # Track test statistics
    $passedTests = 0
    $failedTests = 0

    foreach ($flow in $group.Group) {
        $flowName = $flow.Name
        Write-Host "  Running test: $flowName" -ForegroundColor Cyan

        Add-Content -Path $outputFile -Value "### Test: $flowName"
        Add-Content -Path $outputFile -Value "- **Path:** ``$($flow.FullName)``"
        Add-Content -Path $outputFile -Value "- **Time:** $(Get-Date -Format 'HH:mm:ss')"

        try {
            $result = & maestro test $flow.FullName 2>&1

            if ($LASTEXITCODE -eq 0) {
                Write-Host "    Test passed: $flowName" -ForegroundColor Green
                Add-Content -Path $outputFile -Value "- **Status:** [PASSED]"
                $passedTests++
            } else {
                Write-Host "    Test failed: $flowName" -ForegroundColor Red
                Add-Content -Path $outputFile -Value "- **Status:** [FAILED]"
                $failedTests++
            }

            Add-Content -Path $outputFile -Value "#### Output:"
            Add-Content -Path $outputFile -Value '```'
            $result | Out-String | Add-Content -Path $outputFile
            Add-Content -Path $outputFile -Value '```'
        } catch {
            Write-Host "    Error running test: $flowName" -ForegroundColor Red
            Add-Content -Path $outputFile -Value "- **Status:** [ERROR]"
            Add-Content -Path $outputFile -Value "#### Error Details:"
            Add-Content -Path $outputFile -Value '```'
            Add-Content -Path $outputFile -Value "Error running $($flow.FullName): $_"
            Add-Content -Path $outputFile -Value '```'
            $failedTests++
        }

        Add-Content -Path $outputFile -Value "`n---`n"
    }

    $totalTests = $passedTests + $failedTests
    $summaryContent = Get-Content $outputFile

    $testSummary = @"
## Summary
- **Total Tests:** $totalTests
- **Passed:** $passedTests
- **Failed:** $failedTests
"@

    $updatedContent = $summaryContent[0..2] + $testSummary + $summaryContent[3..$summaryContent.Length]
    $updatedContent | Set-Content -Path $outputFile

    # Store folder summary
    $folderSummary = [PSCustomObject]@{
        FolderNumber = $folderCounter
        FolderName = $folderName
        TotalTests = $totalTests
        PassedTests = $passedTests
        FailedTests = $failedTests
        PassRate = if ($totalTests -gt 0) { [math]::Round(($passedTests / $totalTests) * 100, 1) } else { 0 }
    }

    $folderSummaries += $folderSummary

    $totalAllTests += $totalTests
    $totalAllPassed += $passedTests
    $totalAllFailed += $failedTests

    $folderCounter++
}

# Only create a general summary if no specific folders were selected
if (-not $SelectedFolders) {
    # Create a general summary file
    $summaryFile = Join-Path -Path $logFolder -ChildPath "test-summary.md"
    if (Test-Path $summaryFile) {
        Remove-Item $summaryFile -Force
    }

    $overallPassRate = if ($totalAllTests -gt 0) { [math]::Round(($totalAllPassed / $totalAllTests) * 100, 1) } else { 0 }

    # Summary header
    $summaryHeader = @"
# Test Execution Summary

- **Date:** $timestamp
- **Total Test Folders:** $($folderSummaries.Count)
- **Total Tests:** $totalAllTests
- **Total Passed:** $totalAllPassed
- **Total Failed:** $totalAllFailed
- **Overall Pass Rate:** $overallPassRate%

## Folders
"@

    Add-Content -Path $summaryFile -Value $summaryHeader

    # Write the numbered folder list
    foreach ($summary in $folderSummaries) {
        Add-Content -Path $summaryFile -Value "$($summary.FolderNumber): $($summary.FolderName)"
    }

    # Then table header
    $tableHeader = @"

## Test Results by Folder

| # | Total Tests | Passed | Failed | Pass Rate |
|:-:|------------:|-------:|-------:|----------:|
"@

    Add-Content -Path $summaryFile -Value $tableHeader

    # Calculate dynamic padding
    $padTotalTests = ($folderSummaries | Measure-Object -Property TotalTests -Maximum).Maximum.ToString().Length + 6
    $padPassedTests = ($folderSummaries | Measure-Object -Property PassedTests -Maximum).Maximum.ToString().Length + 6
    $padFailedTests = ($folderSummaries | Measure-Object -Property FailedTests -Maximum).Maximum.ToString().Length + 6
    $padPassRate = 10

    # Write each folder's test row nicely aligned
    foreach ($summary in $folderSummaries) {
        $row = "| {0,-2} | {1,$padTotalTests} | {2,$padPassedTests} | {3,$padFailedTests} | {4,$padPassRate} |" -f `
            $summary.FolderNumber, `
            $summary.TotalTests, `
            $summary.PassedTests, `
            $summary.FailedTests, `
            ("$($summary.PassRate)%")
        Add-Content -Path $summaryFile -Value $row
    }

    # Add ASCII chart section
    $chartSection = @"

## Visual Summary

### Test Results
"@

    Add-Content -Path $summaryFile -Value $chartSection
    Add-Content -Path $summaryFile -Value '```'

    $chartWidth = 50
    if ($totalAllTests -gt 0) {
        $passedWidth = [Math]::Round(($totalAllPassed / $totalAllTests) * $chartWidth)
        $failedWidth = $chartWidth - $passedWidth

        $passedBar = "[PASS] " + ("#" * $passedWidth) + " $totalAllPassed ($overallPassRate%)"
        $failedBar = "[FAIL] " + ("#" * $failedWidth) + " $totalAllFailed ($([math]::Round(100 - $overallPassRate, 1))%)"

        Add-Content -Path $summaryFile -Value $passedBar
        Add-Content -Path $summaryFile -Value $failedBar
    } else {
        Add-Content -Path $summaryFile -Value "No tests were executed."
    }

    Add-Content -Path $summaryFile -Value '```'
}

# Final output
Write-Host ""
Write-Host "All tests finished! Markdown reports saved in: $logFolder" -ForegroundColor Green
if (-not $SelectedFolders) {
    Write-Host "General summary available at: $summaryFile" -ForegroundColor Green
}
