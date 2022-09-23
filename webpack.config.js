
module.exports = {
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    },

    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
  //   {
  //     test: /\.scss$/,
  //     exclude: /node_modules/,
  //     use: [
  //         {
  //             loader: 'style-loader',
  //         },
  //         {
  //             loader: 'css-loader',
  //             options: {
  //                 sourceMap: true,
  //             },
  //         },
  //         {
  //             loader: 'sass-loader',
  //             options: {
  //                 sourceMap: true,
  //             },
  //         },
  //     ],
  // }
  ]
}
}
