import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PointCardSet from "../components/PointCardSet";

export default {
    title: 'Example/PointCardSet',
    component: PointCardSet,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof PointCardSet>;

const Template: ComponentStory<typeof PointCardSet> = (args) => <PointCardSet {...args} />;

export const Default = Template.bind({});
Default.args = {point: []}
