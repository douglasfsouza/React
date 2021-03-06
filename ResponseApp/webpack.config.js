const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    resolve:{extensions:[
        '.js','.jsx'
    ]},
    entry:'./main.js',
    output:{
        path: path.join(__dirname, '/bundle'),
        filename: 'index_bundle.js'
    },
    devServer:{
       
        port:8001
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ]
}