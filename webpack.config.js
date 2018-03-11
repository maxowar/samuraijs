module.exports = {
    //entry: './src/Samurai/Samurai.js',
    entry: './public/js/app.js',
    output: {
        filename: './dist/samurai.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public/'
    },
};