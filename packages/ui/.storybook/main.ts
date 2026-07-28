import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // 1. Filter out Storybook's default CSS rules to avoid conflicts
    config.module!.rules = config.module!.rules!.filter(
      (rule) => !(rule && typeof rule === "object" && "test" in rule && rule.test instanceof RegExp) || !(rule.test as RegExp).test(".css")
    );

    // 2. Add your CSS Module & Global CSS rules
    config.module!.rules!.push(
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: false,
                exportLocalsConvention: "asIs",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      }
    );

    return config;
  },
};
export default config;