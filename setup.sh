node_version=$(node -v)
if [[ $node_version != v14* ]]; then
  echo "Use node.js version 14.x.x"
  exit 1
fi

if [ ! -f ./turbo.json ]; then
  echo "Create this file at the root directory of Rocket.Chat (same level as turbo.json)"
  exit 1
fi

rm -rf RC.Guided.Tours .tours
echo -e "\n.tours\nRC.Guided.Tours" >> .git/info/exclude

echo "Enter repository link"
read repolink < /dev/tty

if [ -z "$repolink" ]; then
  repolink=https://github.com/RocketChat/RC.Guided.Tours.git
  echo "Using default repository link: ${repolink}"
fi

git clone ${repolink}
cd RC.Guided.Tours
npm install
npm run dev