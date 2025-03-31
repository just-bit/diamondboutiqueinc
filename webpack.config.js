const theme = require("./package.json").theme;
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

let templates = glob.sync(path.resolve(__dirname, 'app/assets/templates/layouts/*.html'));
let plugins = [];

for (let temp in templates) {
    let template = templates[temp].replace(
        path.resolve(__dirname, 'app/assets/templates/layouts/')
            .replace(/\\/g, '/'),
        ''
    );

    let destination = template;
    if (template !== '/index.html') {
        destination = (template.replace('.html', '')) + '/index.html';
    }

    plugins.push(new HtmlWebpackPlugin({
        filename: (devMode ? '.' : '../../../temp') + destination,
        template: 'app/assets/templates/layouts' + template
    }));
}

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 88,
        open: true,
        hot: true,
        compress: true,
        watchFiles: {
            paths: ['./app/assets/templates/**/*.html'],
            options: {
                usePolling: false,
            },
        },
        client: {
            progress: true,
            reconnect: true,
            webSocketTransport: 'ws',
        },
        webSocketServer: 'ws',
    },
    entry: {
        './assets/js/app.js': path.resolve(__dirname, 'app', 'app.js'),
    },
    output: {
        path: devMode ? path.resolve(__dirname, 'dist') : path.join(__dirname, 'wp-content', 'themes', theme),
        clean: false,
        filename: "[name]",
        assetModuleFilename: 'assets/static/[name][ext][query]'
    },
    plugins: plugins.concat([
        new MiniCssExtractPlugin({
            filename: './assets/css/application.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]),
    module: {
        rules: [
            // html
            {
                test: /.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: {
                                list: [
                                    {
                                        tag: 'link',
                                        attribute: 'href',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-zoom-image',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-original',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'scrset',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'xlink:href',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-lazy',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'href',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'picture',
                                        attribute: 'data-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'div',
                                        attribute: 'data-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'a',
                                        attribute: 'data-mfp-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'li',
                                        attribute: 'data-zoom-image',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'li',
                                        attribute: 'data-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'data-original',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'srcset',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'div',
                                        attribute: 'data-mfp-src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'option',
                                        attribute: 'data-icon',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'video',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'src',
                                        type: 'src',
                                    }
                                ]
                            }
                        }
                    },
                    {
                        loader: 'posthtml-loader',
                        options: {
                            ident: 'posthtml',
                            plugins: [
                                require('posthtml-include')()
                            ]
                        }
                    },
                    {loader: 'purifycss-loader'}
                ]
            },
            // css
            {
                test: /\.(c|sa|sc)ss$/i,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')]
                            }
                        }
                    },
                    // 'group-css-media-queries-loader',
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/css/[name][ext][query]'
                }
            },
            // images
            {
                test: /\.(jpe?g|png|webp|gif|ico|svg)$/i,
                use: devMode
                    ? []
                    : [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]'
                }
            },
            // videos
            {
                test: /\.(mp4|webm|ogg|avi)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/static/videos/[name][ext][query]'
                }
            },
            {
                test: /\.svg$/i,
                use: [
                    'svgo-loader'
                ],
                type: 'asset',
                generator: {
                    filename: 'images/svg/[name][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                }
            },
            {
                test: /\.svg$/i,
                include: [
                    path.resolve(__dirname, 'app/assets/images/icons')
                ],
                type: 'asset',
                generator: {
                    filename: 'images/icons/[name][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                }
            },
            // fonts
            {
                test: /\.svg$/i,
                include: [
                    path.resolve(__dirname, 'app/assets/fonts')
                ],
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                },
            },
            {
                test: /\.(ttf|woff2?|eot$)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                }
            },
            // js
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            }
        ],
    },

    cache: {
        type: 'filesystem',
    },
};
