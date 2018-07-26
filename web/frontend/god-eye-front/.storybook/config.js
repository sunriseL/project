if (typeof window === 'object' && window.navigator && (/node\.js/i).test(window.navigator.userAgent)) {
  let addons = require('@storybook/addons').default;
  let Channel = require('@storybook/channels').default;
  addons.setChannel(new Channel({
    transport: {
      setHandler: function() {},
      send: function() {}
    }
  }));
}

import { configure } from '@storybook/react';


function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);



if (typeof window === 'object') {
  window.__storybook_stories__ = require('@storybook/react').getStorybook();
}
