# RC.Guided.Tours

##  Setup Instructions
- Create a file named `tours.sh` at the root directory of Rocket.Chat (at the same level as turbo.json)

```bash
touch tours.sh
``` 

- Open the file and copy the following

```bash
code tours.sh
```

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

printf "Enter repository link:\n"
read repolink

if [ -z "$repolink" ]; then
  repolink=https://github.com/RocketChat/RC.Guided.Tours.git
  echo "Using default repository link: ${repolink}\n"
fi

if [ ! -d ./RC.Guided.Tours ]; then
  git clone ${repolink}
fi

cd RC.Guided.Tours

if [ ! -d ./node_modules ]; then
    npm install
fi

npm run build
npm run tours
```

- Give permissions to run the shell script
```bash
chmod +x tours.sh
```

- Run the shell script
```bash
./tours.sh
```

- You will be asked for repository linked, if you want to just see the tours and not contribute to it, keep it blank. 
- If you want to contribute to code tours, enter the link of your forked repository. Then go into folder before making any further commits.
```bash
cd RC.Guided.Tours
```

## Demo

Video

### Working Architecture

![image](https://github.com/user-attachments/assets/f2a69f0b-9c40-4bc9-8b32-9eade1717ae6)


- We are using a nested git architecture, where the child repository is git ignored by the parent repository and both have a seperate git history
- `RC.Guided.Tours` is a standalone package which runs as a workspace in the main repository. 
- The `shell` script runs a `tours` script internally. This dynamically generates the `.tours` folder at the root directory of the folder which is responsible for visualizing the tours. 
