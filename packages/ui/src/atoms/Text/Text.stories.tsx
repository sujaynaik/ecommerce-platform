import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "radio",
      options: ["body-md", "body-sm", "caption"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    children: "This is body text.",
  },
};

export const Small: Story = {
  args: {
    children: "This is small body text.",
    variant: "body-sm",
  },
};

export const Caption: Story = {
  args: {
    children: "Updated 2 hours ago",
    variant: "caption",
  },
};