## TODO

need to include scripts to run Netlify and other tools so you don't have to set them up globally

1. script to degit into your own repo
2. script to branch off of master
3. script to setup Netlify from within this project with some explicit instructions
4. script to setup Netlify
   1. Setup site
   2. Setup branch deploys
   3. Setup environment variables
   4. Setup git hooks to automate deployment
5. script to setup feature flags in LaunchDarkly
   1. This seems like a great opportunity to use the launchdarkly-api tool to setup the scaffold for the project
   2. can probably use YAML or JSON to scaffold the project, flags, and available values without a crazy effort
   3. maybe I could make a CLI and publish for use in this case? Just don't want to drag things out here
6. The more I see, the more it seems like we need some CLI interaction that will guide the user through answering a few questions and getting a working site.
   1. Script should branch off of master after things are setup
   2. Could have the GitHub CLI installed as well in case folks are interested in the ultra-accelerated path
   3. Once the repo is setup, setup Netlify with this site
   4. Then setup LaunchDarkly with the secret info and include that in Netlify as needed.
   5. 