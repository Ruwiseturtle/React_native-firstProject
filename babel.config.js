// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       "module:react-native-dotenv",
//       // "@babel/core",
//       // "@babel/plugin-transform-logical-assignment-operators",
//       // "@types/uuid",
//       // "gh-pages",
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};