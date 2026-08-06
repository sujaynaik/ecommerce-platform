import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { FormField } from "./FormField";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "email",
    label: "Email",
    helperText: "We'll never share your email.",
    inputProps: {
      placeholder: "john@example.com",
    },
  },
};

export const Error: Story = {
  args: {
    id: "email",
    label: "Email",
    error: "Email is required.",
    inputProps: {
      placeholder: "john@example.com",
    },
  },
};
