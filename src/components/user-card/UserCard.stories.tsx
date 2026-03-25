import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Components/UserCard",
  component: UserCard,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    email: { control: "text" },
    avatarUrl: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
};

export const WithAvatar: Story = {
  args: {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
};

export const Loading: Story = {
  args: {
    name: "Loading User",
    loading: true,
  },
};

export const WithoutEmail: Story = {
  args: {
    name: "Just Name",
  },
};
