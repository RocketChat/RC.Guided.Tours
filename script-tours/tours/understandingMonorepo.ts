import { ISteps, ITours } from '../types';
import { createStep } from '../utils';

export default async function understandingMonorepo(): Promise<ITours> {
    const tourName = 'Understanding Monorepo Structure of Rocket.Chat';
    const stepsArray: ISteps[] = [
        {
            title: "What is Monorepo?",
            directory: ".",
            description: "## What is Monorepo?\n\nSuppose we are creating an application with a React.js frontend and a Node.js backend. Traditionally, we needed to create two different repositories: one for the frontend and one for the backend. If they share multiple code snippets, we need to make changes in both the repositories or can publish the common modules as a private npm package. To avoid this complexity, we can create a single repository with multiple projects running in it and have a common section where all projects can share the common code.These projects are known as **workspaces** in a monorepo setup. This is the main use case of monorepo. \n\n![](https://res.cloudinary.com/dty2rgx6f/image/upload/v1719945379/Codetours/Understanding%20Monorepo%20Structure%20of%20Rocket.Chat/Polyrepo_vs_Monorepo_isj4qz.png)\n\n#### The other use cases are:-\n- Consistent dependency version of packages used across the project\n- Improved collaboration as all members can view the complete project\n- Streamlines [CI/CD](https://about.gitlab.com/topics/ci-cd/) as a single pipeline can handle all projects deployment\n\n**To learn more click in the given [link](https://semaphoreci.com/blog/what-is-monorepo#:~:text=A%20monorepo%20is%20a%20version,Monorepos%20can%20reach%20colossal%20sizes)**"
        },
        {
            title: "What is Turborepo?",
            directory: ".",
            description: "## What is Turborepo?\nTurborepo is a tool designed to optimize the development and build process for monorepos. In simple words its monorepo on steroids.\n\nBy default turborepo extends the features presented by monorepo, the extra benefits are\n- **Incremental Builds**- Say we have a 3 workspaces- frontend,backend and common modules running in our turborepo. We made a change in the frontend folder and want to deploy it for production. In a vanilla monorepo setup, it will build each workspaces from the scratch but in turborepo, it builds only the frontend workspace and caches the rest. Turborepo also creates a dependency graph between workspaces. For example, lets say workspace A depends on workspace B (A->B) and we changed the code in A, since B depends on A it will rebuild both A and B. But if we changed the code in B and tried to build the repo, it will cache A and rebuild B only. **This vastly reduces build times and simplifies the CI/CD process**    \n- **Individual Scaling** - Each workspace can be individually scaled and even be deployed separately.\n\nFor more understanding please follow the docs [link](https://turbo.build/repo/docs)\n        \n        "
        },
        {
            title: "Understanding our Repository",
            file: "package.json",
            description: "## Understanding our Repository\n\nNow that we have covered the foundational knowledge, let's dive into understanding how our project operates. This is the root folder, where Turborepo manages all workspaces using the [turbo.json](./turbo.json) file. Here in this package.json, we have the dependencies and scripts that Turborepo requires to run the project.\"",
            line: 1
        },
        {
            title: "Workspaces",
            file: "package.json",
            description: "## Workspaces\n\nThese are all the workspaces, or in simple terms, projects, running inside the monorepo. Each runs independently but may also depend on each other.  \n\n**apps/*** -> this means inside the apps folder, all nested folders with a package.json files are individual workspaces. Same goes for these\n```\n\"packages/*\",\n\"ee/apps/*\",\n\"ee/packages/*\",\n\"apps/meteor/ee/server/services\"\n```\n\nTo check the number of workspaces, the list of workspaces and where they are located, click on the below command\n>> yarn workspaces list | wc -l && yarn workspaces list \n\n#### Turborepo standard terms\n**apps** folder contains the main projects which will server the end user\n\n**packages** are the common modules which can be accessed by the workspaces.",
            searchString: '"workspaces": [',
        },
        {
            title: "Turbo.json",
            file: "turbo.json",
            description: "## Turbo.json\n\nturbo.json is a configuration file used in Turborepo setups to define and manage the workspaces and their configurations within a monorepo. It manages build process dependencies and other turbo-repo related scripts which we will understand soon.",
            line: 1,
        },
        {
            title: "Pipeline - build",
            file: "turbo.json",
            description: "## Pipeline - build\n\nThe name of task is build and its invoked by the command \n\n>> yarn run build\n\n It inspects each package.json file and try to locate a **build** script, executing it wherever its found in a specific order. The results of these builds are cached in their respective **dist** folders, optimizing subsequent builds for efficiency.",
            searchString: '"build": {',
        },
        {
            title: "Pipeline - dsv",
            file: "turbo.json",
            description: "## Pipeline - dsv\n\nThis is the most important command and you will use most of the time. The name of task is dsv and its invoked by the command \n\n>> yarn run dsv\n\nwhich eventually call the script \n\n```\n\"dsv\": \"turbo run dsv --filter=@rocket.chat/meteor...\"\n```\n\nThis has dependency on the \"build\" task and completes it first. Since the cache is false it will create and execute the commands from scratch.\n\n--filter specifies that turborepo will only look into package.json folder with a name [\"@rocket.chat/meteor\"](./apps/meteor/package.json)\n\nYou might wonder when we run it, it runs 43 packages but it should run only one. Its because the '...' attached at the end, if you remove it you can see it runs only 1 package. The ... in the filter --filter=@rocket.chat/meteor... means it includes packages that depend on @rocket.chat/meteor",
            searchString: '"dsv": {',
        },
        {
            title: "Scripts",
            file: "package.json",
            description: "## Scripts\n\n\n**turbo run X** => For basic understanding, we can assume all package.json having a script `X` will be ran. **--filter=(package.json name)** means we want to run it in that particular package.json only\n\n- **build** Creates the final production build for this entire monorepo.\n- **build:services** builds only the [services workspace](./apps/meteor/ee/server/services/package.json).\n- **build:ci** Runs the `build` command as well as `build:ci` command in the repository. We will understand it better once we understand turbo.json.\n- **testunit** Performs the unit test over the entire repo.\n- **dev** Runs all the packages i.e. all the workspaces as defined in the packages folder in the root directory. Note this wont start the meteor server so its not useful for us currently.\n- **dsv** Runs all the packages as well as the meteor server.\n- **lint** run linting checks in the enitre codebase. Use this [link](https://www.perforce.com/blog/qac/what-is-linting#:~:text=Linting%20is%20the%20automated%20checking,a%20basic%20static%20code%20analyzer.) to learn more about linting\n\n\n",
            searchString: '"scripts": {'
        },
        {
            title: "Meteor.js",
            directory: "apps/meteor",
            description: "## Meteor.js\n\nSince our main project is meteor.js, its important to have a basic understanding how meteor.js works. Its advisable to read the [docs](https://docs.meteor.com/) and to experiment by creating a basic meteor project from scratch.\n\n- Any folder with the name **client** will have client side code and the code is accessable from the browser.\n- Any folder with the name **server** will have server side code and the code will only run on the server."
        }
    ]
    const steps = await Promise.all(stepsArray.map(step => createStep(step, tourName))) as ISteps[];
    return {
        $schema: 'https://aka.ms/codetour-schema',
        title: tourName,
        steps,
    };
}
