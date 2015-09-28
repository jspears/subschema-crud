var webpack = require('webpack'), path = require('path');

module.exports = function (config) {
    config.set({
        browserNoActivityTimeout: 20000,
        browsers: ['Chrome'], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: ['mocha', 'chai'], //use the mocha test framework
        files: [
            './karma.tests.js' //just load this file
        ],
        preprocessors: {
            './karma.tests.js':['webpack', 'sourcemap'],
            'client/**/*': ['webpack','sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots'], //report results in this format

        webpack: { //kind of a copy of your webpack config
            cache: true,
            debug: true,
            devtool: 'inline-source-map',

            stats: {
                colors: true,
                reasons: true
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

            },

            resolve: {
                extensions: ['', '.js', '.jsx'],
                alias: {
                    'react': path.join(__dirname, 'node_modules/react'),
                    'subschema': path.join(__dirname, 'node_modules/subschema/src'),
                    'react-router': path.join(__dirname, 'node_modules/react-router/lib/')
                }
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('development')
                })]

        },
        webpackMiddleware: {
            stats: {
                colors: true
            }
        }
    });

};
