import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Voting } from "../components/Voting";

export default {
  title: "Game/Voting",
  component: Voting,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Voting>;

const Template: ComponentStory<typeof Voting> = (args) => <Voting {...args} />;

export const Default = Template.bind({});
Default.args = { point: [3, 2, 1] };
