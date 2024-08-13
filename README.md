# RC.Guided.Tours Quick Start 🚀

##  Setup Instructions

1. Install Code tour extension [url](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)

2. Open `.git/info/exclude` in any text editor or ⬇️
```bash
code .git/info/exclude
```
3. Add the following to the end of that file 
```bash
.tours
RC.Guided.Tours
tours.sh
```
4. Create a new file `tours.sh` at the root directory of Rocket.Chat (at the same level as turbo.json)

```bash
touch tours.sh
``` 

5. Open the file in any text editor or ⬇️

```bash
code tours.sh
```
6. Paste the following contents in it

```bash

#!/bin/bash

node_version=$(node -v)
if [[ $node_version != v14* ]]; then
  echo "Use node.js version 14.x.x"
  exit 1
fi

if [ ! -f ./turbo.json ]; then
  echo "Create this file at the same level as turbo.json"
  exit 1
fi

if [ ! -d ./RC.Guided.Tours ]; then

printf "Enter repository link:\n"
read repolink

if [ -z "$repolink" ]; then
  repolink=https://github.com/RocketChat/RC.Guided.Tours.git
  echo "Using default repository link: ${repolink}\n"
fi

  git clone ${repolink}
fi
cd RC.Guided.Tours

if [ ! -d ./node_modules ]; then
    npm install
fi

npm run build
npm run tours

```

7. Give permissions to run the shell script
```bash
chmod +x tours.sh
```

8. Run the shell script
```bash
./tours.sh
```

9. If you don't want to contribute, just press `Enter` (For contributing see below)

### You are Good to go!! 🔥

## Want to Contribute? 👀
- If you want to contribute to [RC.Guided.Tours](https://github.com/Sayan4444/RC.Guided.Tours), enter the link of your forked repository. (Example- https://github.com/Sayan4444/RC.Guided.Tours.git)

- To perform any git actions related to [RC.Guided.Tours](https://github.com/Sayan4444/RC.Guided.Tours), always 
```bash
cd RC.Guided.Tours
```
Since we use nested .git folders, never perform a git action related to [RC.Guided.Tours](https://github.com/Sayan4444/RC.Guided.Tours) from outside the folder. 


##  Tours Available

<div align="center">
    
| **S no.** | Tour |
|:--------------------|:-------------------|
| 01 | Rocket.Chat Onboarding |
| 02 | Understanding Monorepo Structure of Rocket.Chat |
| 03 | Repository Overview |
| 04 | How to send a message (Client Side) |
| 05 | How to send a message (Server Side) |
| 06 | How to create an endpoint |
| 07 | How to create a DB model |
| 08 | How to use DB model |
| 09 | Services in Rocket.Chat |
| 10 | How to Add a new Services |
| 11 | How to create a new Package |
</div>

### Working Architecture

![image](https://github.com/user-attachments/assets/2628ecef-fb33-43bb-9ff4-9e9d1d99e206)


- We are using a nested git architecture, where the child repository is git ignored by the parent repository and both have a seperate git history
- To git ignore, we are not changing the .gitignore file but adding the file `.git/info/exclude` which can be called as a local git extension of the .gitignore file.
- `RC.Guided.Tours` is a standalone package which runs seperately in the main repository. 
- The `shell` script runs a `tours` script internally. This dynamically generates the `.tours` folder at the root directory of the folder which is responsible for visualizing the tours. 
- The CodeTour Extension searches for a folder `.tours` and all the tours created are stored inside that folder in JSON format. To know more about the CodeTour extension visit [here](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)

## Development Guidelines

- Make changes in the `src` folder and then execute the `tours.sh` in the root to see your changes in effect. This internally calls the `build` `tours` scripts inside RC.Guided.Tours
```bash
./tours.sh
```

- When choosing a `searchString` make sure its `short` and `unique`. Avoid using `function arguments` as searchString.


#### Setting up the project

[](https://github.com/user-attachments/assets/e2ecf046-e333-4c6c-a9ba-287ea2331fa1)


#### Running the project
Starting Tours:- Use `ctrl+shift+p` / `cmd+shift+p` to open all commands and then select the `start tour` option

[](https://github.com/user-attachments/assets/44e2be20-43ea-4eb7-941d-e05aeaa8f95a)
