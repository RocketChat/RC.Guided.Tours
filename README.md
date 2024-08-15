# RC.Guided.Tours for Rocket.Chat

 RC.Guided.Tours aims to provide a smooth on-boarding process of new contributors to Rocket.Chat codebase. We use VsCode extension `CodeTour` to explain the most crucial parts of the codebase so that new contributors can start contributing as quickly as possible. methods.


# Quick Start 🚀
1. You need a Rocket.Chat Server [Setup](https://developer.rocket.chat/v1/docs/server-environment-setup)

2. Install the [CodeTour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) extension in VsCode

3. `cd Rocket.Chat` and paste the below script in the terminal (Use nodejs 14)

```bash
node_version=$(node -v)
if [[ $node_version != v14* ]]; then
  echo "Use node.js version 14.x.x"
  read -n1 -r -p "Press any key to exit..."
  echo
  exit 1
fi

if [ ! -f ./turbo.json ]; then
  echo "Create this file at the same level as turbo.json"
  read -n1 -r -p "Press any key to exit..."
  echo
  exit 1
fi

rm -rf RC.Guided.Tours .tours
echo -e "\n.tours\nRC.Guided.Tours" >> .git/info/exclude

echo "Enter repository link"
read repolink

if [ -z "$repolink" ]; then
  repolink=https://github.com/RocketChat/RC.Guided.Tours.git
  echo "Using default repository link: ${repolink}\n"
fi

git clone ${repolink}
cd RC.Guided.Tours
npm install
npm run dev
```

4. If you don't want to contribute, just press `Enter` (For contributing see below)

### You are Good to go!! 🔥

## Want to Contribute? 👀
- Fork this repo https://github.com/RocketChat/RC.Guided.Tours
- Enter the link of your forked repository in terminal, Instead of doing step 4. (Example- https://github.com/Sayan4444/RC.Guided.Tours.git)

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

## Development Guidelines 👨🏽‍💻

- Make changes in the `src` folder and then execute 
```bash
npm run dev
```
to see your changes in effect. This internally calls the `build` `tours` scripts inside RC.Guided.Tours

- When choosing a `searchString` make sure its `short` and `unique`. Avoid using `function arguments` as searchString.

#### Running the project
Starting Tours:- Use `ctrl+shift+p` / `cmd+shift+p` to open all commands and then select the `start tour` option

[](https://github.com/user-attachments/assets/44e2be20-43ea-4eb7-941d-e05aeaa8f95a)



## Working Architecture 👀

![image](https://github.com/user-attachments/assets/2628ecef-fb33-43bb-9ff4-9e9d1d99e206)


- We are using a nested git architecture, where the child repository is git ignored by the parent repository and both have a seperate git history
- To git ignore, we are not changing the .gitignore file but adding the file `.git/info/exclude` which can be called as a local git extension of the .gitignore file.
- `RC.Guided.Tours` is a standalone package which runs seperately in the main repository. 
- The `shell` script runs a `tours` script internally. This dynamically generates the `.tours` folder at the root directory of the folder which is responsible for visualizing the tours. 
- The CodeTour Extension searches for a folder `.tours` and all the tours created are stored inside that folder in JSON format. To know more about the CodeTour extension visit [here](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)
