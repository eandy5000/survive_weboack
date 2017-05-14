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

add app/component.js and include it as module into index.js

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

Added nodemon to start script to watch webpack.config.js and reload the dev server on change

` "start": "nodemon --watch webpack.config.js --exec 'webpack-dev-server --env development' " `
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
___
To Create a seperate Style sheet in the build. in webpack.config

```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const etPlugin = new ExtractTextPlugin({filename: '[name].css'})
```
its also handy to have include and exclude variables to include in the rules

```javascript
const exclude = (path) => {
    return path.match(/node_modules/)
}

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

const include = PATHS.app
```

now we can make a rule with our plugin and include our plugin in plugins

```javascript
plugins : [
        new HtmlWebpackPlugin({
            title: 'Webpack demo'
        }),
        etPlugin
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: etPlugin.extract({
                   use:  ['css-loader'],
                   fallback: 'style-loader'
                })
            }
        ]
    }

```

    the bundle will now include a seperate css file linked in index.html

    ___
    Adding images to build

    url-loader adds images from our app directory to our build as base 64 inline images
         
```javascript   
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader'
            } 
```

This will add any image you import to your build but sometimes its better to limit the size of the image file to keep the build from getting too large.

```javascript
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000
                }
            }
```
now that we have a limit we can use file-loader to add image files to our bundle that are over the limit, 
NOTE: I can't quite get the url-loader to run on files under limit and then run file loader on images over limit, so in this version i'm just running file-loader

```javascript
            // {
            //     test: /\.(jpg|png|svg)$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 25000
            //     }
            // },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]'
                }
            }
```
___

Added multi-file webpack configuration and webpack-merge package

added webpack.parts.js

webpack-merge takes an array of objects and merges them into a single object. This allow you to use seperate configurations based on variables like env and also pull configuration into seperate files to keep the webpack config from getting too verbose

```javascript

const merge = require('webpack-merge')
const parts = require('./webpack.parts')

const config = merge([commonConfig, devServerConfig])

/* devServerConfig is a function that takes an object with port and host as a parameter returns the devServer configuration object */ 
const devServerConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    })
])

```

____

added include and exclude to webpack.config to pass as parameters to functions making config objects from parts

```javascript
const include = PATHS.app
const exclude = path.join(__dirname, 'node_modules')
```

added cssLoader function to parts

``` javascript
exports.cssLoader = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
})
```
then merged the loader into commonConfig

```javascript
const commonConfig = merge([
    {
        entry: {
            app: PATHS.app
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
           plugin.HTML
        ]
    },
    parts.cssLoader({include, exclude})
])
```
___
Adding Babel

install dependencies

npm i -D babel-loader babel-core babel-preset-env

created .babelrc note: use json notation e.g. double quotes

```javascript
{
    "presets": ["babel-preset-env"]
}
```

then in parts
```javascript
    exports.babelLoader = {
        module: {
            rules: [
                {
                    use: 'babel-loader',
                    test: /\.js$/,
                }
            ]
        }
    }
```

now to merge our module object in config
```javascript
const commonConfig = merge([
    {
        entry: {
            app: PATHS.app
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
           parts.HTML,
        ]
    },
    //module with loaders
    merge([
        parts.cssLoader({include, exclude}),
        parts.babelLoader
        ])
])

```

Now its running babel on all js files, so we need to refactor parts as a function that can take include and exclude
```javascript
exports.babelLoader = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include,
                exclude
            }
        ]
    }
})
```
then we can include our refactor in config
```javascript
    merge([
        parts.cssLoader({include, exclude}),
        parts.babelLoader({include, exclude})
        ])
```

added Image loader

```javascript
exports.imageLoader = () => ({
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 40000
                            }
                        },
                        'image-webpack-loader'
                    ]
            }
        ]
    }
})
```

```javascript

```









