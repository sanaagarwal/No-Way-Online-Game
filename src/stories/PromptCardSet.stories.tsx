import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PromptCardSet from "../components/PromptCardSet";

export default {
  title: "Game/PromptCardSet",
  component: PromptCardSet,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PromptCardSet>;

const Template: ComponentStory<typeof PromptCardSet> = (args) => (
  <PromptCardSet {...args} />
);

export const Default = Template.bind({});
Default.args = {
  prompt: [
    "Writing React apps",
    "Going on a walk",
    "Arguing about VSCode vs IntelliJ",
  ],
};
