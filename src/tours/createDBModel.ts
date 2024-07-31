import { ISteps, ITours } from '../types';
import { createStep } from '../utils';

export default async function createDBModel(): Promise<ITours> {
	const tourName = 'How to create a DB model';
	const stepsArray: ISteps[] = [
		{
			title: "Visualising the Database",
			description: "The mongodb database is running locally in port **3001**. So to connect to it, run the rocket.chat server locally and use the connection string\n\n```bash\nmongodb://localhost:3001\n```\n\nOne of the best way to visualise a mongodb database is using [mongodb compass](https://www.mongodb.com/products/tools/compass). You can install it locally or use any other mongdb GUI tools according to your preference."
		},
		{
			title: "How to create a DB Model?",
			directory: 'apps/meteor/server/models',
			description:
				"## How to create a DB Model \n\n### Rocket.Chat server relies on MongoDB as its primary database to store crucial information such as chat messages, user data, system configurations, and other related data. MongoDB plays a vital role in maintaining and organizing the essential information that powers Rocket.Chat.\n\n### Files like assets, user files, images, and other media files are stored locally on the system running the server or over network services like Amazon S3, and WebDAV.\n\n### Let us explore and see how can anyone create a new Database model, Here I will be giving example of Messages model and how things inside it works."
		},
		{
			title: "Messages Model",
			file: 'apps/meteor/server/models/raw/Messages.ts',
			description:
				"## Messages Model\n\n- **Firstly we start by importing some important components and modules such as BaseRaw which contains Operations related to Database model.**\n\n- **We have *Rooms* model imported from *@rocket.chat/models* which is again a model like we are looking at right now, Checkout [Rooms](./apps/meteor/server/models/raw/Rooms.ts) Model**\n\n- **We also have imports from model-typings such as FindPaginated and IMessageModel which have type definitions for the model**\n\n- **We have multiple imports from mongodb as *AggregationCursor, Collection, FindCursor, UpdateResult, etc.* which help in mongodb operations**",
			searchString: 'type DeepWritable<T> = T extends (...args: any) => any',
			offset: -1,
		},
		{
			title: "MessagesRaw Class",
			file: 'apps/meteor/server/models/raw/Messages.ts',
			description:
				"## MessagesRaw class\n\n- **To register a DB model in Rocket.Chat, it is necessary to create a corresponding class for that model. In our case, as we are creating the Messages Model, we need to define a class specifically for it. This class will serve as the blueprint for the Messages Model and will be used for registering and interacting with the corresponding data in the database.**\n\n- **In order to facilitate the management of the Messages Model in Rocket.Chat's database, we have a class called MessageRaw. This class extends the BaseRaw class and implements the IMessageModel interface, which we discussed earlier. By extending BaseRaw and implementing the IMessageModel interface, MessageRaw inherits necessary functionalities and ensures it adheres to the required structure and behavior of the Messages Model in Rocket.Chat.**",
			searchString: 'export class MessagesRaw extends BaseRaw<IMessage> implements IMessagesModel {',
		},
		{
			title: "Collection name",
			file: "apps/meteor/server/models/raw/Messages.ts",
			description: "```javascript\nsuper(db, 'message', trash);\n```\n\nThe name of our mongodb collection will be **rocketchat_message**. You can open mongodb compass and check all the collections with its respective contents.",
			searchString: "super(db, 'message', trash);",
		},
		{
			title: "Methods and Operations",
			file: 'apps/meteor/server/models/raw/Messages.ts',
			description:
				"## Methods and Operations\n\n### From here onwards there are multiple methods and operations related with Message Model you can go through each of them and try to undestand what are they doing, It is easy to understand them.\n\n- **There are multiple methods such as**\n    - ***findStarredByUserAtRoom***\n    - ***findLivechatMessages***\n    - ***findStarred***\n    - ***setMessageAttachments***\n    - ***getMessageByFileIdAndUsername***\n    - and many more",
			searchString:
				"findVisibleByMentionAndRoomId(username: IUser['username'], rid: IRoom['_id'], options?: FindOptions<IMessage>): FindCursor<IMessage> {",
			offset: -1,
		},
		{
			title: "Registering a DB model 1",
			file: 'apps/meteor/server/models/Messages.ts',
			description:
				"## Registering a DB model\n\n### Now let us see how can we register any DB model\n\n### 1 - First of all we need to import *registerModel* from *@rocket.chat/models*\n\n### 2 - Import MessagesRaw- The DB model Class we created which includes operations, and we are also importing db, trashCollection- It contains deleted messages",
			searchString: "import { registerModel } from '@rocket.chat/models';",
		},
		{
			title: "Registering a DB model 2",
			file: 'apps/meteor/server/models/Messages.ts',
			description:
				"## Registering\n\n### Here we are using the registerModel import and passing 'IMessageModel' and then we pass in db and trashCollection into MessageRaw Class\n\n### The register model function looks something like this -\n```\nfunction registerModel<TModel extends IBaseModel<any, any, any>>(name: string, instance: TModel | (() => TModel)): void;\n```\n\n### And we pass data into it like - \n```\n registerModel('IMessagesModel', new MessagesRaw(db, trashCollection));\n //It becomes something like this, Here IMessageModel is basically implemented in MessagesRaw as we saw in previous steps\n registerModel<MessagesRaw>(name: string, instance: MessagesRaw | (() => MessagesRaw)): void\n```",
			searchString: "registerModel('IMessagesModel', new MessagesRaw(db, trashCollection));",
		},

	]
	const steps = await Promise.all(stepsArray.map(step => createStep(step, tourName))) as ISteps[];
	return {
		$schema: 'https://aka.ms/codetour-schema',
		title: tourName,
		steps,
	};
}
