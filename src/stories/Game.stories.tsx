import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Game from "../components/Game";

export default {
  title: "Game/Game",
  component: Game,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Game>;

const Template: ComponentStory<typeof Game> = (args) => <Game {...args} />;

export const Default = Template.bind({});
Default.args = {
  prompt: ["playing games", "skiing", "cooking"],
  revealed: {
    pointsOther: [1, 2, 3],
    pointsHost: [2, 1, 3],
    scoresOther: 7,
    scoresHost: 8,
  },
  playing: false,
};
