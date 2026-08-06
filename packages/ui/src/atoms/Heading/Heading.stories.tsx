import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Heading } from "./Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: 1,
    children: "Dashboard",
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: "Products",
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: "Orders",
  },
};
