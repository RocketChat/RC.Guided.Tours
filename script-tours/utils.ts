import fs from 'fs/promises';
import path from 'path';
import { ISteps } from './types';


export async function createStep(stepObj: ISteps, tourName: string) {
	const { file, description, searchString, title, offset = 0 } = stepObj;
	if (!file || !searchString) return stepObj;

	const filePath = path.resolve(__dirname, '..', file);
	const fileContent = await fs.readFile(filePath, 'utf8');
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

