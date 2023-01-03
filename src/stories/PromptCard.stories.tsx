import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PromptCard from "../components/PromptCard";

export default {
    title: 'Example/PromptCard',
    component: PromptCard,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof PromptCard>;

const Template: ComponentStory<typeof PromptCard> = (args) => <PromptCard {...args} />;

export const Default = Template.bind({});
