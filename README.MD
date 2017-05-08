# Webpack

Step 1

no webpack config file. We can run webpack from the command line

with ` node node_modules/.bin/webpack  ` 

add app/index.js

You can run webpack from the command line with
` node node_modules/.bin/webpack app/index.js build/index.js `
the first argument is the entry and the second is the destination

___

Step 2

add app/config.js and include it as module into index.js

also added webpack.config.js

___

Step 3

adding the our first plugin
` npm install html-webpack-plugin --save-dev `
  
in webpack config added entry and output, also added our plugin.

running webpack from .bin creates an app.js that includes our component in the bundle and our plugin makes creates an index.html that has our app.js in it.
Added build script to package.json 
` npm run build `
___
Step 4

### Adding automatic browser refresh

One solution is to add --watch flag to webpack

` webpack --watch `

on top of watch we can also add Webpack Dev server and Hot Module Replacement

Webpack Dev Server (WDS) - automaticlly refreshes trivial code changes in the browser

Hot Module Replacement (HMR) - alows you to maintain state while refreshing

to install WDS 
` npm i --save-dev webpack-dev-server `

you can run it 

` node node_modules/.bin/webpack-dev-server `

now you can make code changes that are automatically refreshed

we can now add scripts to run webpack in dev or production mode

  "scripts": {
    "start": "webpack-dev-server --env development",
    "build": "webpack --env production"
  }




