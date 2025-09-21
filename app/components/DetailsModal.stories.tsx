import type { Meta, StoryObj } from "@storybook/nextjs";

import { DetailsModal } from "./DetailsModal";
import {description} from "./description" 
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/DetailsModal",
  component: DetailsModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof DetailsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    open: true,
    setOpen: () => {},
    title: "Senior Frontend Developer",
    company: "Generic Company Name",
    location: "Cairo, Egypt",
    jobId: 1,
    description: description,
    tags: ["frontend", "python", "react"],
    link: "www.example.com"
  },
};
