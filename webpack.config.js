const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const parts = require('./webpack.parts')
const merge = require('webpack-merge')
const plugin = require('./webpack.plugins')

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

// webpack configuration shared by production and dev
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
    }
])

/* function from parts that passes host and port
 as parameters to devServer config object */
const devServerConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    })
])

// uses merge to construct config files based on environment
const productionConfig = merge([
    commonConfig
])
const developmentConfig = merge([
    commonConfig,
    devServerConfig
])


module.exports = (env) => {
    console.log('env ', env)

    if (env === "production") {
        return productionConfig
    }
    
    return developmentConfig
}
