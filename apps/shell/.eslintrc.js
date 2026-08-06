module.exports = {
  plugins: ["boundaries"],

  settings: {
    "boundaries/elements": [
      {
        type: "app",
        pattern: "src/app/*",
      },
      {
        type: "pages",
        pattern: "src/pages/*",
      },
      {
        type: "features",
        pattern: "src/features/*",
      },
      {
        type: "shared",
        pattern: "src/shared/*",
      },
    ],
  },

  rules: {
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",

        rules: [
          {
            from: "app",
            allow: ["pages", "features", "shared"],
          },
          {
            from: "pages",
            allow: ["features", "shared"],
          },
          {
            from: "features",
            allow: ["shared"],
          },
          {
            from: "shared",
            allow: ["shared"],
          },
        ],
      },
    ],
  },
};
