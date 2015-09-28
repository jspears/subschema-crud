var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'public/index.jsx')
    ],
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'app.js',
        publicPath: '/'

    },
    devServer: {
        contentBase: "./public",
        devtool: "eval",
        debug: true,
        proxy: {
            "/rest/*": "http://localhost:3000"
        }
    },
    stats: {
        colors: true,
        reasons: true
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'react': path.join(__dirname, 'node_modules/react'),
            'subschema': path.join(__dirname, 'node_modules/subschema/src'),
            'react-router': path.join(__dirname, 'node_modules/react-router/lib/'),
            'react-google-maps':path.join(__dirname, 'node_modules/react-google-maps/src'),
        }
    },
    module: {
        loaders: [{
            test: /\.js(x)?$/,
            loaders: ['react-hot', 'babel?stage=0'],
            include: [path.join(__dirname, 'client'), path.join(__dirname, 'public')]
        }, {
            test: /\.js(x)?$/,
            loaders: ['babel?stage=0'],
            exclude: [/node_modules\/.*\/node_modules\/.*/]
            //   include: [path.join(__dirname, 'client'), path.join(__dirname, 'public'), path]
        }, {
            test: /\.less$/,
            //css-loader!postcss-loader!less-loader
            loaders: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
        }, {
            test: /.json$/,
            loaders: ['json']
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loaders: ["url-loader?limit=10000"]

        }]

    }
};