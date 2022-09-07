const path = require('path');
const webpack = require('webpack');
const FilemanagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const targetBrowser = process.env.TARGET_BROWSER;

const extensionReloaderPlugin =
  nodeEnv === 'development'
    ? new ExtensionReloader({
        port: 9090,
        reloadPage: true,
        entries: {
          // TODO: reload manifest on update
          background: 'background',
          extensionPage: ['popup'],
        },
      })
    : () => {
        this.apply = () => {};
      };

const getExtensionFileType = (browser) => {
  if (browser === 'opera') {
    return 'crx';
  }
  if (browser === 'firefox') {
    return 'xpi';
  }

  return 'zip';
};

module.exports = {
  devtool: false, // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342

  mode: nodeEnv,

  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },

  entry: {
    manifest: './source/manifest.json',
    background: './source/scripts/background.js',
    popup: './source/scripts/popup.js',
    newtab: './source/scripts/newtab.js',
  },

  output: {
    path: path.resolve(__dirname, 'extension', targetBrowser),
    filename: 'scripts/[name].bundle.js',
  },

  module: {
    rules: [
      {
        type: 'javascript/auto', // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
          loader: 'wext-manifest-loader',
          options: {
            usePackageJSONVersion: true, // set to false to not use package.json version for manifest
          },
        },
      },
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'source/scripts')],
        loader: 'babel-loader',

        options: {
          plugins: ['syntax-dynamic-import'],

          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // It creates a CSS file per JS file which contains CSS
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: nodeEnv === 'development',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'resolve-url-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    // Generate manifest.json
    new WextManifestWebpackPlugin(),
    // Generate sourcemaps
    new webpack.SourceMapDevToolPlugin({filename: false}),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'TARGET_BROWSER']),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(process.cwd(), `extension/${targetBrowser}`),
        path.join(
          process.cwd(),
          `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`
        ),
      ],
      cleanStaleWebpackAssets: false,
      verbose: true,
    }),
    // write css file(s) to build folder
    new MiniCssExtractPlugin({filename: 'styles/[name].css'}),
    new HtmlWebpackPlugin({
      template: 'source/popup.html',
      inject: 'body',
      hash: true,
      chunks: ['popup'],
      filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
      template: 'source/newtab.html',
      inject: 'body',
      hash: true,
      chunks: ['popup'],
      filename: 'newtab.html',
    }),
    // copy static assets
    new CopyWebpackPlugin({
      patterns: [{from: 'source/assets', to: 'assets'}],
    }),

    new CopyWebpackPlugin({
      patterns: [{from: 'source/styles', to: 'styles'}],
    }),

    // copy anime-list data
    new CopyWebpackPlugin({
      patterns: [{from: 'source/anime_data', to: 'anime_data'}],
    }),
    // plugin to enable browser reloading in development mode
    extensionReloaderPlugin,
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
      }),
      new FilemanagerPlugin({
        events: {
          onEnd: {
            archive: [
              {
                format: 'zip',
                source: path.join(__dirname, 'extension', targetBrowser),
                destination: `${path.join(
                  __dirname,
                  'extension',
                  targetBrowser
                )}.${getExtensionFileType(targetBrowser)}`,
                options: {zlib: {level: 6}},
              },
            ],
          },
        },
      }),
    ],
  },
};
