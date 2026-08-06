import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },

    disabled: {
      control: "boolean",
    },

    onClick: {
      action: "onClick!",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    children: "Submit",
    type: "submit",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Custom",
    className: "demo-class",
  },
};
