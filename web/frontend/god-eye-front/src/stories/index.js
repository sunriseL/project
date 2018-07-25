import React from 'react';

import { storiesOf } from '@storybook/react';


import MainNav from '../Components/MainNav';
import CurrentVideo from '../Components/CurrentVideo';
import HistoryVideo from '../Components/HistoryVideo';
import TraceTarget from '../Components/TraceTarget';
import Settings from '../Components/Settings';

storiesOf('IT-snapshot-test', module)
  .add('MainNav', ()=><MainNav />)
  .add('CurrentVideo', ()=><CurrentVideo />)
  .add('HistoryVideo', ()=><HistoryVideo />)
  .add('TraceTarget', ()=><TraceTarget />)
  .add('Settings', ()=><Settings />);