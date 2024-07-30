import { ISteps, ITours } from '../types';
import { createStep } from '../utils';

export default async function createEndPoint(): Promise<ITours> {
	const tourName = "How to Create an Endpoint";
	const stepsArray: ISteps[] = [
		{
			title: "How to Create an Endpoint",
			file: 'apps/meteor/app/api/server/index.ts',
			description:
				"## How to Create an Endpoint.\n\n Rocket.Chat offers two methods for creating endpoints: REST API and Meteor Methods(Realtime API). These methods allow developers to extend Rocket.Chat's functionality by defining custom endpoints that can be accessed externally or internally.\n\n In this guide, we will explore creating endpoints using the REST API and Meteor Methods in Rocket.Chat. We'll discuss their differences, use cases, and provide step-by-step instructions for implementation. By learning how to create endpoints, you'll be able to integrate external services, expose specific functionalities, and perform custom operations.\n\nNote: all REST API's are located in [apps/meteor/app/api/server](./apps/meteor/app/api/server/index.ts) folder while meteor methods can be found all around project, which can be identified by the folder structure **/server/methods**",
			searchString: "export { API, APIClass, defaultRateLimiterOptions } from './api';",
		},
		{
			title: "REST API",
			file: 'apps/meteor/app/api/server/api.ts',
			description:
				"## REST API\n\n When using the Rocket.Chat REST API in a production environment, it is important to address security concerns by implementing HTTPS with a valid SSL certificate, regularly expiring and refreshing authorization tokens, and carefully configuring user permissions. Rate limiting is another important aspect to manage API requests, ensure server stability, and prevent abuse. You can enable rate limiting in the Rocket.Chat administration settings and customize it according to your needs. The response headers of API requests with rate limiting enabled provide information about the rate limit constraints, including the number of allowed calls, remaining requests, and reset time. These measures enhance security, protect sensitive data, and promote fair usage of the API.\n\n Let us start by looking at example endpoint ie. **api/v1/chat.sendMessage** Here we will understand how endpoint is Created and how can you create a new endpoint\n\n- [Learn more about REST API](https://developer.rocket.chat/apidocs)",
			searchString: 'export const API: {',
		},
		{
			title: "Example",
			file: 'apps/meteor/app/api/server/v1/chat.ts',
			description:
				"## Example Endpoint for sending Message\n\n#### Visit [here](https://developer.rocket.chat/docs/messages-send-message) for Official documentations for sendMessage REST endpoint.\n\n### Here we have \n```\nAPI.v1.addRoute(\n  'route.routeName', // This is the endpoint where request would be sent for example - 'chat.sendMessage'\n  { authRequired: true }, // Here is authRequired is true then user requires to enter their Auth Tokens\n    {async post(){ // This is the method call, Here we are sending message hence it requires post method\n        <!-- Other Operations -->\n    return API.v1.success(); // At the end if everything is successfull a success message is recieved\n    },\n  },\n);\n```\n\n#### Let us Understand What is *API.v1* .",
			searchString: 'chat.starMessage',
		},
		{
			title: "API.v1",
			file: 'apps/meteor/app/api/server/api.ts',
			description:
				"## The API.v1\n\n### The API object provides access to the Rocket.Chat API through properties v1 and default, allowing interaction with specific API versions and default configurations respectively.\n\n- The v1 property represents an instance of the **APIClass** specifically configured for version 'v1' of the API. It allows you to interact with the endpoints and resources available in the v1 version of the API. \n- You can understand APIClass by going through it it has multiple methods and checks\n\n```\nexport const API: {\n\tv1: APIClass<'/v1'>; ...\n} = {\n\tgetUserAuth,\n\tApiClass: APIClass,\n\tv1: createApi({\n\t\tversion: 'v1',  // The createApi function helps in creating route and createApi function uses instance of APIClass\n\t}),\n\tdefault: createApi(),\n};\n```",
			searchString: 'export const API: {',
		},
		{
			title: "CreateApi",
			file: 'apps/meteor/app/api/server/api.ts',
			description:
				"## CreateApi\n\n### This function helps in creating Api route for example api/v1/abc\n\n```\nAPI.v1.addRoute()\n```\n### - v1 uses instance of APIClass and The APIClass has property addRoute which helps in adding route to Server",
			searchString: 'const createApi = function _createApi(options: { version?: string } = {}): APIClass {',
		},
		{
			title: "Calling REST endpoint",
			file: 'apps/meteor/app/api/server/v1/chat.ts',
			description:
				"## Calling REST endpoint\n### Let us try to call an REST Endpoint for sending message\n### For this you need \n- Personal Access Token\n- UserId\n- Channel/Room Id\n### - Create a Personal Access Tokens for user authentication. -> **[Get Token here](http://localhost:3000/account/tokens)** (*Note* - You must save it because you wont be able to see it again).\n\n### - To get User-Id go to admin settings, search for users(or http://localhost:3000/admin/users) select your account and copy unique user id from URL (http://localhost:3000/admin/users/info/u3y2jXw5ayckPciE9) here we have *u3y2jXw5ayckPciE9* as user id, Try finding yours\n\n### - Open another terminal and use the following command\n\n```sh\ncurl -H \"X-Auth-Token: 'ENTER_YOUR_TOKEN' \" \\\n      -H \"X-User-Id: 'ENTER_YOUR_USERID' \" \\\n      -H \"Content-type:application/json\" \\\n      http://localhost:3000/api/v1/chat.sendMessage \\\n      -d '{\"message\":{\"rid\":\"GENERAL\", \"msg\":\"Hello From Rocket Chat\"}}'\n```\n- You will get a success response once your request is successful and vice versa\n\n### You can also use postman or any other API TESTER instead of the terminal\n\n![](https://res.cloudinary.com/dty2rgx6f/image/upload/v1721465791/Codetours/Onboarding/401a1627-10bb-441f-831d-375817c375e8.png)\n\n### Similarly you can also create your own REST Endpoint with unique route name and define what it needs to do by adding different funtionalities in it. ",
			searchString: 'one channel whereas the other one allows for sending to more than one channel at a time',
			offset: 2
		},
		{
			title: "Meteor Methods(RealTime API)",
			file: 'apps/meteor/app/lib/server/methods/sendMessage.ts',
			description:
				"## RealTime API \n\n### - Using Meteor methods(RealTime API) for endpoints provides real-time data synchronization, server-side data validation, and enhanced security through method-specific permissions, ensuring efficient and secure communication between the client and server.\n\n### - Our real-time API is composed of two elements: Method Calls and Subscriptions. Both of them are supported directly in the websocket connection. \n\n- **To know more about RealTime API visit [here](https://developer.rocket.chat/docs/realtime-api)**",
			searchString: "Meteor.methods<ServerMethods>",
		},
		{
			title: "Adding Endpoint",
			file: 'apps/meteor/app/lib/server/methods/sendMessage.ts',
			description:
				"## Adding Endpoint with ServerMethods interface\n\n### Above Here You can see we are using ServerMethods interface and adding a server method(or Route) which comes out to be api/v1/method.call/{Method name}\n\n```\n    interface ServerMethods {\n\t\tsendMessage(message: AtLeast<IMessage, '_id' | 'rid' | 'msg'>): any; //here we created sendMessage endpoint\n\t}\n```",
			searchString: 'interface ServerMethods {',
		},
		{
			title: "Using endpoints",
			file: 'apps/meteor/app/lib/server/methods/sendMessage.ts',
			description:
				"## Using ServerMethod\n\n#### We created sendMessage endpoint with help of interface ServerMethods and here we have a Meteor method and we are defining what this Endpoint will do, for example in this case it is sending message\n\n- **[Documentation](https://developer.rocket.chat/docs/method-calls) for Method Calls**\n\n```\nMeteor.methods<ServerMethods>({\n\tsendMessage(message) { \n // Code for what endpoint should do\n },\n});\n\n```\n\nThis api endpoint can be called by this format\n```\nawait sdk.call('sendMessage',.....);\n```\n\nwhich we will see it in the next step",
			searchString: 'async sendMessage(message, previewUrls) {',
		},
		{
			title: "Calling Realtime API endpoints",
			file: 'apps/meteor/client/lib/chats/flows/sendMessage.ts',
			description:
				"## Calling Realtime API endpoints\n\n### The sdk.call method is used to call meteor method and it takes route name and message as argument, Rocket chat has created and SDK for managing meteor calls",
			searchString: "await sdk.call('sendMessage', message, previewUrls);",
		},

		{
			title: "call()",
			file: 'apps/meteor/app/utils/client/lib/SDKClient.ts',
			description:
				"## call method\n\n### With help of call method this method gets triggered and it takes method name and other paramerters for example here we passed **'sendMessage'** as method and **message** as parameters.\n\n### Then method is matched with existing endpoints, if method is found, for example sendMessage is found then further function will be executed. else we will get error as sendMessage does not exists",
			searchString: "const call = <T extends keyof ServerMethods>"
		},
		{
			title: "REST-API vs METEOR methods - Same internal code",
			description: "### Its important to note that both REST API and METEOR end-points are just different entry points to the process of sending a message while they execute the same core functions internally.(MOST OF THE CASES)\n\nThis is evident as you can see yourself they call the same function **executeSendMessage**.\n\n### REST API\n\n``` javascript\nAPI.v1.addRoute(\n\t'chat.sendMessage',\n\t\t\t.......................................................\n\t\t\tconst sent = await executeSendMessage(this.userId, this.bodyParams.message as Pick<IMessage, 'rid'>, this.bodyParams.previewUrls);\n\t\t\t.......................................................\n```\n\n### METEOR METHOD\n\n``` javascript\nMeteor.methods<ServerMethods>({\n\tasync sendMessage(message, previewUrls) {\n            .......................................................\n\t\t\treturn await executeSendMessage(uid, message, previewUrls);\n            .......................................................\n});\n```"
		}
	]
	const steps = await Promise.all(stepsArray.map(step => createStep(step, tourName))) as ISteps[];
	return {
		$schema: 'https://aka.ms/codetour-schema',
		title: tourName,
		steps,
	};
}
