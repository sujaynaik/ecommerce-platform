import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],

  argTypes: {
    error: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    type: {
      control: "select",
      options: ["text", "email", "password", "search"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Email",
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
};
