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
  ___

  Step 5

  Making sure our build can detect the --env

  in our webpack config we can console log what environment we are in. with ` env `

  This variable also allows us to have seperate configuration of webpack based on env

  ```javascript
    module.exports = (env) => {
    console.log('env', env)
    const productionConfig = () => commonConfig
    const developmentConfig = () => {
        const config = {}
        return Object.assign(
            {}, 
            commonConfig,
             config)
    }

    if (env === 'production') {
        return productionConfig()
    }
    return developmentConfig()
} 
```
___

Some basic configuration of our dev config's options

```javascript
        const config = {
            devServer: { 
                // Enable history API fallback so HTML5 History API based 
                // routing works. Good for complex setups. 
                historyApiFallback: true, 
                // Display only errors to reduce the amount of output. 
                stats: 'errors-only', 
                // Parse host and port from env to allow customization. // 
                // If you use Docker, Vagrant or Cloud9, set // 
                host: options.host || '0.0.0.0',
                // // 0.0.0.0 is available to all network devices 
                // unlike default ` localhost `. 
                host: process.env.HOST, 
                //Defaults to ` localhost ` 
                port: process.env.PORT, 
                // Defaults to 8080 },
            }
        }
```

        with this configuration we can get status and errors at
        ` http://localhost:8080/webpack-dev-server/ `
        ___
        Step 6

NOTE: for now I have disabled eslint but I've kept the rc and ignore file
        install eslint
        ` npm i --save-dev eslint `

        then add lint to package.json scripts
        ` "lint:js": "eslint app/webpack.*.js --cache" `

        This script will lint every js file so you don't have to include the package in every js file. As your project grows you may want to add a .eslintignore file

        also add .eslintrc.js with this configuration

        ```
module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        'comma-dangle': [' error', 'always-multiline'],
        indent: [' error', 2],
        'linebreak-style': [' error', 'unix'],
        quotes: [' error', 'single'],
        semi: [' error', 'always'],
        'no-unused-vars': [' warn'],
        'no-console': 0,
    },
};

        ```
css loading

added css-loader and style loader to the common config 

```
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
```
 then added main.css file and imported it in index.js
 css-loader- looks for css imports
 style loader- takes these styles and loads them into a style tag in the html

 Loaders are transformations that are applied to source files, and return the new source and can be chained together like a pipe in Unix. They are piped above in an array from right to left

 








