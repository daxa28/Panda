const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const STATIC_DIR = path.resolve(__dirname, "..", "static");

const plugins = [
  new webpack.DefinePlugin({
    "process.env.GOOGLE_API_KEY": process.env.GOOGLE_API_KEY,
    "process.env.BACKEND_PORT": process.env.BACKEND_PORT,
  }),

  new FileManagerPlugin({
    events: {
      // Remove build dir
      onStart: {
        delete: [BUILD_DIR],
      },
      onEnd: {
        // Copy static files
        copy: [
          {
            source: STATIC_DIR,
            destination: BUILD_DIR,
          },
        ],
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_DIR, "index.html"),
    filename: "index.html",
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve(PUBLIC_DIR, "favicon.svg"),
    prefix: "/favicons/",
    outputPath: path.resolve(BUILD_DIR, "favicons"),
    mode: "webapp",
    // Внедрение во все файлы HTML или отдельно (для каждого экземпляра HtmlWebpackPlugin)
    // inject: true,
    inject: (htmlPlugin) =>
      path.basename(htmlPlugin.options.filename) === "index.html",
    favicons: {
      icons: {
        appleIcon: false, // Apple touch icons.
        appleStartup: false, // Apple startup images.
        android: false, // Android homescreen icon.
        favicons: true, // Regular favicons.
        coast: false, // Opera Coast icon.
        firefox: false, // Firefox OS icons.
        windows: false, // Windows 8 tile icons.
        yandex: false, // Yandex browser icon.
      },
    },
    cache: false, // Запретить кэширование ресурсов в сборках веб-пакета.
  }),
  new webpack.HotModuleReplacementPlugin(), // Для перезагрузки страницы
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const devServer = {
  historyApiFallback: true, // Применить HTML5 History API, если используются маршруты
  open: true,
  compress: true,
  allowedHosts: "all",
  hot: true, // Перезагружаем страницу после сохранения изменений (HotModuleReplacementPlugin)
  client: {
    // Показывает полноэкранное наложение в браузере при наличии ошибок или предупреждений компилятора
    overlay: {
      errors: true,
      warnings: true,
    },
    progress: true, // Печатает ход компиляции в браузере в процентах
  },

  port: 3008,
  /**
   * Записывает файлы в выходной путь(default: false)
   * Build dir не очищается с помощью <output: {clean:true}>
   * Для решения следует использовать FileManager
   */
  devMiddleware: {
    writeToDisk: true,
  },
  static: [
    // Требуется использовать в качестве ресурсов значки, расположенные в отдельном каталоге
    // Следует использовать с HistoryApiFallback, чтобы избежать ошибки 404 для маршрутов.
    {
      directory: path.join(BUILD_DIR, "favicons"),
    },
  ],
};

module.exports = {
  devServer,
  plugins,
  entry: path.join(__dirname, "..", "src", "index.tsx"),
  output: {
    path: BUILD_DIR,
    /**
     * Помогает избежать того, что MIME type ('text/html') не является поддерживаемой таблицей стилей
     * И устанавливает адрес при импорте html
     */
    publicPath: "/",
  },
  // Проверка максимального веса бандла отключена
  performance: {
    hints: false,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    strictExportPresence: true, // Strict mod позволяет избежать импорта несуществующих объектов
    rules: [
      // --- JS | TS USING BABEL
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кеша во избежание перекомпиляции
          },
        },
      },
      // --- HTML
      { test: /\.(html)$/, use: ["html-loader"] },
      // --- S/A/C/SS
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // переводит CSS в CommonJS
            options: {
              esModule: true,
              // css modules
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]", // формат вывода
                namedExport: true, // именованный экспорт вместо стандартного
              },
            },
          },
          {
            // autoprefixer
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      // --- S/A/SS
      {
        test: /\.(s[ac])ss$/i,
        use: ["sass-loader"],
      },
      // --- IMG
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext]",
        },
      },
      // --- FONTS
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
};
