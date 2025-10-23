// SPDX-License-Identifier: MIT
//
// The MIT License (MIT)
// 
// Copyright (c) 2025 AIR Institute and BISITE (USAL)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Script to update the license into very code file
// Also updates tha table of dependencies and their licenses

"use strict";

const Path = require("path");
const FS = require("fs");

const SPDX_LICENSE_ID = "MIT";
const LICENSE = FS.readFileSync(Path.resolve(__dirname, "LICENSE")).toString();

const SOURCE_CODE_FILE_EXTENSIONS = [".ts", ".js", ".mjs", ".sol"];

function isSourceCodeFile(file) {
    for (let ext of SOURCE_CODE_FILE_EXTENSIONS) {
        if (file.endsWith(ext)) {
            return true;
        }
    }

    return false;
}

function updateLicenseInCodeFile(file, licenseComment) {
    const fileContents = FS.readFileSync(file).toString();
    const fileLines = fileContents.split("\n");

    if (fileLines[0].trim().startsWith("// SPDX-License-Identifier")) {
        if ((fileLines[1] || "").trim().startsWith("// License-From:")) {
            // External license, do not update
            return;
        }

        let linesOldComment = [];
        let shouldAddSpace = false;

        for (let i = 0; i < fileLines.length; i++) {
            if (!fileLines[i].trim().startsWith("//")) {
                // End of comment
                shouldAddSpace = !!fileLines[i].trim();
                break;
            }

            linesOldComment.push(fileLines[i]);
        }

        if (linesOldComment.map(l => l.trim()).join("\n") !== licenseComment.split("\n").map(l => l.trim()).join("\n")) {
            // License comment mismatch, update

            const finalContent = (licenseComment + (shouldAddSpace ? "\n" : "")).split("\n").concat(fileLines.slice(linesOldComment.length)).join("\n");

            FS.writeFileSync(file, finalContent);
            console.log(`Updated LICENSE comment for ${file}`);
        }
    } else {
        // No license comment

        const finalContent = (licenseComment + "\n").split("\n").concat(fileLines).join("\n");

        FS.writeFileSync(file, finalContent);
        console.log(`Added LICENSE comment for ${file}`);
    }
}

function updateLicenseInCodeFiles() {
    console.log("Updating license comment in source files...");

    const licenseComment = ["// SPDX-License-Identifier: " + SPDX_LICENSE_ID, "//"].concat(LICENSE.split("\n").map(l => "// " + l)).join("\n");

    const folders = [Path.resolve(__dirname)];

    while (folders.length > 0) {
        const folder = folders.shift();

        const folderFiles = FS.readdirSync(folder);

        for (const folderFile of folderFiles) {
            const folderFilePath = Path.resolve(folder, folderFile);
            const fileStats = FS.statSync(folderFilePath);

            if (fileStats.isDirectory()) {
                if ([".git", "node_modules", "dist", "build"].includes(folderFile)) {
                    continue;
                }

                folders.push(folderFilePath);
            } else if (fileStats.isFile()) {
                if (isSourceCodeFile(folderFile)) {
                    updateLicenseInCodeFile(folderFilePath, licenseComment);
                }
            }
        }
    }

    console.log("Done: Updated license comments for all source code files");
}

function readDependencies(project, dependenciesType, dependenciesMap) {
    const dependencies = JSON.parse(FS.readFileSync(Path.resolve(project.path, "package.json")).toString())[dependenciesType] || {};

    for (const dependency of Object.keys(dependencies)) {
        if (dependencies[dependency].startsWith("file:")) {
            continue; // Local dependency
        }

        if (dependenciesMap.has(dependency)) {
            dependenciesMap.get(dependency).usedBy.push(project);
            continue;
        }

        const dependencyData = {
            name: dependency,
            link: "https://www.npmjs.com/package/" + dependency,
            usedBy: [project],
            license: "Unknown",
        };

        try {
            const pkg = JSON.parse(FS.readFileSync(Path.resolve(project.path, "node_modules", dependency, "package.json")).toString());
            dependencyData.license = pkg.license || "Unknown";
        } catch (ex) {
            console.error(ex);
            console.error("Could not open the package.json file for dependency " + dependency + ". Make sure you installed the dependencies before running this script.");
            process.exit(1);
        }

        dependenciesMap.set(dependency, dependencyData);
    }
}

function generateTableFromDependenciesMap(dependenciesMap) {
    let mdLines = [
        "| Dependency | License | Used By |",
        "| --- | --- | --- |",
    ];

    const deps = Array.from(dependenciesMap.values()).sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else {
            return 1;
        }
    });

    for (let dep of deps) {
        const namePart = "[" + dep.name + "](" + dep.link + ")";
        const licensePart = "[" + dep.license + "](https://opensource.org/license/" + dep.license.toLowerCase() + ")";
        const usedByPart = dep.usedBy.map(u => `[${u.name}](${u.linkForMd})`).join(", ");

        mdLines.push(`| ${namePart} | ${licensePart} | ${usedByPart}`);
    }

    return mdLines;
}

function updateDependenciesTable() {
    console.log("Generating dependencies table...");

    const projectsWithDependencies = [
        {
            name: "EVM-Bridge",
            path: Path.resolve(__dirname, "evm-bridge"),
            linkForMd: "./evm-bridge/package.json",
        },
        {
            name: "Smart-Contracts",
            path: Path.resolve(__dirname, "smart-contracts"),
            linkForMd: "./smart-contracts/package.json",
        },
    ];

    const dependenciesMap = new Map();

    for (const project of projectsWithDependencies) {
        readDependencies(project, "dependencies", dependenciesMap);
    }

    const devDependenciesMap = new Map();

    for (const project of projectsWithDependencies) {
        readDependencies(project, "devDependencies", devDependenciesMap);
    }


    let mdLines = [
        "# Dependencies table",
        "",
        "This file contains a table with all the dependencies of the project, and their licenses.",
        "",
        "In order to update this file, along with the license comments in source files, run the following script:",
        "",
        "```sh",
        "node license.update.js",
        "```",
        "",
    ];

    mdLines.push("## Direct dependencies");
    mdLines.push("");
    mdLines.push("Dependencies used directly by the source code of the project.");
    mdLines.push("");

    mdLines = mdLines.concat(generateTableFromDependenciesMap(dependenciesMap));

    mdLines.push("");

    mdLines.push("## Development dependencies");
    mdLines.push("");
    mdLines.push("Dependencies used to compile, lint or test the source code or the project.");
    mdLines.push("");

    mdLines = mdLines.concat(generateTableFromDependenciesMap(devDependenciesMap));

    mdLines.push("");


    FS.writeFileSync(Path.resolve(__dirname, "DEPENDENCIES.md"), mdLines.join("\n"));

    console.log("Done: Generated dependencies table");

}

updateLicenseInCodeFiles();
updateDependenciesTable();

