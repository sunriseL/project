import { configure, getStorybook } from '@storybook/react';


function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);

