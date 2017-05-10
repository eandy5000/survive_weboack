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