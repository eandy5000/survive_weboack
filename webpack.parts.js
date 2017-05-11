//plugins
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.HTML = new HTMLPlugin({
    title: 'Super fun Project'
})

const cssExtractor = new ExtractTextPlugin({
    filename: '[name].css'
})

//config
// host and port, keys and values will be an empty object if an object isn't passed
exports.devServer = ({host, port} = {}) => {
    return {
        devServer: {
            historyApiFallback: true,
            stats: 'errors-only',
            host, //defaults to localhost
            port, //defaults to 8080
            overlay: {
                errors: true,
                warnings: true
            } 
        }
    }
}

//loaders
exports.cssLoader = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: cssExtractor.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [cssExtractor]
})

// exports.babelLoader = {
//     module: {
//         rules: [
//             {
//                 use: 'babel-loader',
//                 test: /\.js$/,
//             }
//         ]
//     }
// }

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