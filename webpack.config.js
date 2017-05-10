const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

const productionConfig = () => {
    console.log(commonConfig)
    return commonConfig
}
const developmentConfig = () => {
    const config = Object.assign({}, commonConfig, devServerConfig)
    console.log(config)
    return config
}

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

const commonConfig = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HTMLPlugin({
            title: "My Build"
        })
    ]
}

const devServerConfig = {
            devServer: { 
                // Enable history API fallback so HTML5 History API based 
                // routing works. Good for complex setups. 
                historyApiFallback: true, 
                // Display only errors to reduce the amount of output. 
                stats: 'errors-only', 
                // Parse host and port from env to allow customization. // 
                // If you use Docker, Vagrant or Cloud9, set // 
                // host: options.host || '0.0.0.0';
                // // 0.0.0.0 is available to all network devices 
                // unlike default ` localhost `. 
                host: process.env.HOST, 
                //Defaults to ` localhost ` 
                port: process.env.PORT, 
                // Defaults to 8080 },
            }
}

module.exports = (env) => {
    console.log('env ', env)

    if (env === "production") {
        return productionConfig()
    }
    
    return developmentConfig()
}
