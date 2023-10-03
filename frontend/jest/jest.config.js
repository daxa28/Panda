module.exports = {
  roots: ["../tests", "../src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Модули предназначены для кода, который повторяется в каждом тестовом файле
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["../node_modules", "../src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/filesMock.js",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        // Скомпилировать каждый файл отдельно. Он теряет возможность проверки типов и некоторые функции, такие как const enum
        // При текущем конфиге помогает избежать ошибок при импорте css модулей
        isolatedModules: true,
        diagnostics: { ignoreCodes: [151001] },
      },
    ],
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform", // Для работы с CSS-подобными модулями
  },
  testMatch: ["**/?(*.)(spec|test).[jt]s?(x)"], // Находит тестовые файлы с именами вроде abc.test|spec.ts?tsx|js|jsx в root:[] prop.
  testEnvironment: "jsdom", // Для избегания ошибок js DOM
};
