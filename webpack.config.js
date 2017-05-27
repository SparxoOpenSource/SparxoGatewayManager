var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin') //自动打开浏览器插件

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

process.env.NODE_ENV = 'development' // 这个要写 .babel env 坑！

module.exports = {
    //devtool: 'source-map',
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/Router.js')],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: './app',
        port: 3011,
        color: true,
        inline: true,
        hot: true,
        historyApiFallback: true
    },// progress 不起作用

    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.jsx', '.js', '.json'],
    },


    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: [
                        ["transform-runtime", { polyfill: false }],
                        ["import", [
                            { "style": "css", "libraryName": "antd" },
                            { "style": "css", "libraryName": "antd-mobile" }
                        ]]
                    ]
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
            },
            {
                test: /\.css$/,
                loader: 'style!css?importLoaders=1!postcss',
                postcss: [
                    pxtorem({
                        rootValue: 100,
                        propWhiteList: [],
                    })
                ]
            },
			// {
            //     test: /\.css$/,
            //     loader: 'style!css!postcss'
            // },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(svg)$/i, loader: 'svg-sprite', include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
                    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
                ]
            },
        ]
    },

    //高清设置：
    // postcss: [
    //     autoprefixer({
    //         browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    //     }),
    //     pxtorem({ rootValue: 100, propWhiteList: [] })
    // ],

    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ]
            }),
        ];
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件

        new OpenBrowserPlugin({ url: 'admin.sparxotest.com:3011' })
    ]
}
		// new webpack.optimize.CommonsChunkPlugin('vendors','js/vendors.js'),
		// vendors:['react','react-dom','react-router','redux','react-redux']  //第三方库和框架
		// new webpack.optimize.OccurenceOrderPlugin(),
    	// new webpack.optimize.UglifyJsPlugin({
        //   	compressor: {
        //     	warnings: false,
        //   	},
        // }),