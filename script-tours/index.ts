import fs from 'fs/promises';
import path from 'path';
import { slugify } from './utils';
import { rocketchatOnboarding, understandingMonorepo, repositoryOverview, messageSentClient, messageSentServer, createEndPoint, createDBModel, useDBModel, services, addNewService, createNewPackage } from './tours/index';
import { ITours } from './types';

/*
 * Creates a new directory called .tours in the root directory of the project.
 * Create the json content of the tours and stores them in toursObjArray
 * Creates a new file for each tour in the .tours directory and stores the json content in the file.
*/
async function main() {
	try {
		const baseDir = path.resolve(__dirname, '..');
		const newDir = path.join(baseDir, '.tours');
		await fs.mkdir(newDir, { recursive: true });
		const toursObjArray = await Promise.all([
			rocketchatOnboarding(),
			understandingMonorepo(),
			repositoryOverview(),
			messageSentClient(),
			messageSentServer(),
			createEndPoint(),
			createDBModel(),
			useDBModel(),
			services(),
			addNewService(),
			createNewPackage(),
		]) as ITours[];

		toursObjArray.forEach(async (tour, index) => {
			const serialNumber = (index + 1).toString().padStart(2, '0');

			const fileName = serialNumber + '---' + slugify(tour.title) + '.tour';
			tour.title = serialNumber + ' - ' + tour.title;

			const newFile = path.join(newDir, fileName);
			await fs.writeFile(newFile, JSON.stringify(tour, null, 2));
		});
		console.log('Tours created successfully');
	} catch (error: any) {
		console.log(error.message);
	}
}

main();
