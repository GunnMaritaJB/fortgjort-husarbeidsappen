const fs = require("fs");
const path = require("path");

function patchLibrary(libraryPath, targetFiles) {
  console.log(`Patching ${libraryPath} for Gradle compatibility...`);

  try {
    // Read the file
    let content = fs.readFileSync(libraryPath, "utf8");
    let modified = false;

    // Check each target file
    for (const targetFile of targetFiles) {
      if (!content.includes(`pickFirst "**/${targetFile}"`)) {
        // Find the android block
        const androidBlockIndex = content.indexOf("android {");

        if (androidBlockIndex !== -1) {
          // Look for existing packagingOptions block
          const packagingOptionsIndex = content.indexOf(
            "packagingOptions {",
            androidBlockIndex
          );

          if (packagingOptionsIndex !== -1) {
            // Add to existing packagingOptions block
            const packagingBlockEnd = content.indexOf(
              "}",
              packagingOptionsIndex
            );
            const newOption = `        pickFirst "**/${targetFile}"\n`;

            content =
              content.slice(0, packagingBlockEnd) +
              newOption +
              content.slice(packagingBlockEnd);
          } else {
            // Insert our packagingOptions at the beginning of the android block
            const insertPosition = content.indexOf("{", androidBlockIndex) + 1;
            const packagingBlock = `
    packagingOptions {
        pickFirst "**/${targetFile}"
    }
`;

            content =
              content.slice(0, insertPosition) +
              packagingBlock +
              content.slice(insertPosition);
          }

          modified = true;
          console.log(`Added pickFirst for ${targetFile}`);
        }
      } else {
        console.log(`Library already patched for ${targetFile}`);
      }
    }

    // Only write if we made changes
    if (modified) {
      fs.writeFileSync(libraryPath, content);
      console.log(`Successfully patched ${libraryPath}`);
    }
  } catch (error) {
    console.error(`Failed to patch ${libraryPath}:`, error);
  }
}

// List of libraries and their conflicting files
const librariesToPatch = [
  {
    path: path.resolve(
      __dirname,
      "node_modules/react-native-gesture-handler/android/build.gradle"
    ),
    files: ["libc++_shared.so"],
  },
  {
    path: path.resolve(
      __dirname,
      "node_modules/react-native-screens/android/build.gradle"
    ),
    files: ["libfbjni.so", "libreactnative.so"],
  },
];

// Patch each library
librariesToPatch.forEach((lib) => {
  patchLibrary(lib.path, lib.files);
});

console.log("Patching complete!");
