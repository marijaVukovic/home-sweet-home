module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "plugins": ["jest"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "brace-style": ["error", "stroustrup"],
    "import/prefer-default-export": 0,
    "indent": ["error", 2],
    "no-underscore-dangle": 0,
    "quotes": ["error", "single"],
  }
}