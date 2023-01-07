import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PointCard from "../components/PointCard";

export default {
    title: 'Game/PointCard',
    component: PointCard,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof PointCard>;

const Template: ComponentStory<typeof PointCard> = (args) => <PointCard {...args} />;

export const Default = Template.bind({});

Default.args = {
    point: 3,
}