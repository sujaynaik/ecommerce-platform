import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Spinner } from "./Spinner";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "radio",
      options: ["primary", "secondary", "nuetral"],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
    args: {
        size: "sm",
        variant: "primary"
    },
};

export const Medium: Story = {
  args: {
    size: "md",
    variant: "primary"
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "primary"
  },
};

export const Secondary: Story = {
  args: {
    size: "md",
    variant: "secondary"
  },
};

export const Neutral: Story = {
  args: {
    size: "md",
    variant: "neutral"
  },
};