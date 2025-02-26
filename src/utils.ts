import fs from 'fs/promises';
import path from 'path';
import type { ISteps } from './types';


export async function createStep(stepObj: ISteps, tourName: string) {
	const { file, description, searchString, title, offset = 0 } = stepObj;
	// if we dont need to search for file or search string then the step object is the actual content
	if (!file || !searchString) return stepObj;

	const filePath = path.resolve(__dirname, '../..', file);
	let fileContent: string;
	try {
		fileContent = await fs.readFile(filePath, 'utf8');
	} catch (error) {
		console.log(`Search string "${searchString}" not found in file ${file} \nTours : ${tourName}, \nStep : ${title} \n`);
		return;
	}
	const lines = fileContent.split('\n');

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].includes(searchString)) {
			return { file, description, line: i + 1 + offset, title };
		}
	}
	console.log(`Search string "${searchString}" not found in file ${file} \nTours : ${tourName}, \nStep : ${title} \n`);
	return { file, description, line: 1, title };
}

export const slugify = (str: string) =>
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

/**
 * Reads all .tour files in the .tours directory, extracts file paths and indices,
 * finds the line numbers of search strings in corresponding files, and updates
 * the .tour files with the new line numbers.
 * 
 * @param toursDir - Path to the .tours directory.
 * @param otherDir - Path to the directory containing files for search.
 */
export async function processAndUpdateTourFiles(toursDir: string, otherDir: string): Promise<void> {
    
    try {
        // Check if directories exist
        await fs.access(toursDir);
        await fs.access(otherDir);
    } catch {
        throw new Error(`One of the directories does not exist: ${toursDir} or ${otherDir}`);
    }

    // Step 1: Read all .tour files
    const tourFiles = (await fs.readdir(toursDir)).filter(file => file.endsWith(".tour"));

    for (const tourFile of tourFiles) {
        const filepathAndIndexArr: { file: string; index: number }[] = [];
        const newLineNumbers: string[] = [];

        const tourFilePath = path.join(toursDir, tourFile);
        const fileContent = JSON.parse(await fs.readFile(tourFilePath, "utf-8"));

        fileContent.steps.forEach((step: any, index: number) => {
            filepathAndIndexArr.push({
                file: step.file || "NOTPRESENT",
                index,
            });
        });

        const searchStringsPath = path.join(otherDir, tourFile.replace(/\.tour$/, ".js"));
        try {
            await fs.access(searchStringsPath);
        } catch {
            // console.warn(`Search strings file does not exist for: ${tourFile}`);
            continue;
        }

        // Dynamically import the search strings
        const { searchStrings } = await import(searchStringsPath);

        // Process each file and find new line numbers
        for (let i = 0; i < filepathAndIndexArr.length; i++) {
            const { file, index } = filepathAndIndexArr[i];

            if (file === "NOTPRESENT" || searchStrings[index] === "NOTAPPLICABLE") {
                newLineNumbers.push("NA");
                continue;
            }

            if (searchStrings[index] === "1" || searchStrings[index] === "2") {
                newLineNumbers.push(searchStrings[index]);
                continue;
            }

            const rootDir = path.resolve(__dirname, "../..");
            const fullPath = path.join(rootDir, file);
			
            try {
                await fs.access(fullPath);
            } catch {
                newLineNumbers.push("NA");
                continue;
            }

            const targetFileContent = await fs.readFile(fullPath, "utf-8");
            const searchString = searchStrings[index];
            const lines = targetFileContent.split("\n");

            // Find line number for the search string
            const lineNumber = lines.findIndex((line) => line.includes(searchString));
            newLineNumbers.push(lineNumber !== -1 ? (lineNumber + 1).toString() : "NA");
        }

        // Step 3: Update the .tour file with new line numbers
        fileContent.steps.forEach((step: any, index: number) => {
            if (step.line !== undefined) {
                const lineNumber = newLineNumbers[index];
                step.line = lineNumber !== "NA" ? parseInt(lineNumber, 10) : lineNumber; // Convert to number if valid
            }
        });

        // Write the updated content back to the .tour file
        await fs.writeFile(tourFilePath, JSON.stringify(fileContent, null, 2));
    }

    console.log("Tours Updated successfully");
}
