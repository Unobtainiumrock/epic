## TO DO
1. Resolve the issue of using nvm to install a newer version of Node.js.
    * The current problem is that whenever I want to start the express portion of the app for development, some of the libraries such as Axios are using newer JS features for managing modules, such as "import" over "require". I had successfully installed newer version, but I'm using WSL and it doesn't have the version of GLIBC_2.28 required by Node, so I have to go and update all of the WSL related dependencies.

2. Verify that the tunnel to localhost used for develoment and the demo is working properly.

3. Install create-react-app and generate a react front-end to hit the express routes for the demo.
    * There may be some potential issues with a single page web app when it comes to handling re-routes when hitting the express back-end. Look into this, because the last time I checked, there is something called React routes or something to that effect.

4. Determine the desired file tree structure for the front and back end. 

# Lower Priority Tasks

1. Investigate if the code base can be cleaned up and switched over to Typsecript.
    * Normally I would just develop using Typescripte during development, but It's been quite awhile since I've used it and it would slow things down for me in the long run.

2. Create a build-process and handle everything s.t. any person on GitHub that clones the demo can run it locally.
    * Normally when I have a polished end product, I aim to help a straightforward README.md with very little requirements on the person cloning the code base. Its assumed that the person running the application has little to none of the required dependencies etc.