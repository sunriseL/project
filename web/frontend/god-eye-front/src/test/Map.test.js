import React from 'react'
import { shallow ,render, mount} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HistoryVideoForm from "../Components/HistoryVideoForm"
import TargetDialog from "../Components/TargetDialog";
import DrawUserMap from "../Components/DrawUserMap";
import Settings from "../Components/Settings";
import renderer from 'react-test-renderer';
import MainNav from "../Components/MainNav";
import HistoryVideo from "../Components/HistoryVideo";
import VideoPlayer from "../Components/VideoPlayer";
import AddCamera from "../Components/AddCamera";
import ConfirmDialog from "../Components/ConfirmDialog";
import CurrentVideo from "../Components/CurrentVideo";
import TraceTarget from "../Components/TraceTarget";
import UserMap from "../Components/UserMap";
import CameraDialog from "../Components/CameraDialog";
import EventEmitter from "../Utils/EventEmitter";
import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';
import SelectObject from "../Components/SelectObject";

if (typeof document === 'undefined') {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.navigator = global.window.navigator;
}

configure({ adapter: new Adapter() });

describe('<HistoryVideoForm />', () => {
    it('Component should be render', () => {
        expect(shallow(<HistoryVideoForm />).find('Grid').exists());
    });
    it('render', () => {
        const wrapper = render(<HistoryVideoForm />);
        expect(wrapper.find('div')).toHaveLength(9);
    });
    it('allows us to set props', () => {
        const wrapper = mount(<HistoryVideoForm bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
});

describe('<TargetDialog />', () => {
    it('Component should be render', () => {
        expect(shallow(<TargetDialog />).find('Dialog').exists());
    });
    it('allows us to set props', () => {
        const wrapper = mount(<TargetDialog bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
    it('render 0 div', () => {
        const wrapper = render(<TargetDialog />);
        expect(wrapper.find('div')).toHaveLength(0);
    });
});

describe('<DrawUserMap />', () => {
    it('Component should be render', () => {
        expect(shallow(<DrawUserMap />).find('Grid').exists());
    });
    it('allows us to set props', () => {
        const wrapper = mount(<TargetDialog bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
});

describe('<Settings />', () => {
    it('DrawUserMap Component should be render', () => {
        expect(shallow(<Settings />).find('BreadCrumb').exists());
    });
});

// describe('<VideoPlayer />', () => {
// });

describe('<MainNav />', () => {
    it('Component should be render', () => {
        expect(shallow(<MainNav />).find('Grid').exists());
    });
    it('allows us to set props', () => {
        const wrapper = mount(<MainNav bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
});

describe('<HistoryVideo />', () => {
    it('Component should be render', () => {
        expect(shallow(<HistoryVideo />).find('Grid').exists());
    });
   //mount
});

describe('<AddCamera />', () => {
    it('Component should be render', () => {
        expect(shallow(<AddCamera />).find('Grid').exists());
    });
    it('allows us to set props', () => {
        const wrapper = mount(<AddCamera bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
    it('renders 1 title', () => {
        const wrapper = render(<AddCamera />);
        expect(wrapper.find('ListItem')).toHaveLength(0);
    });
});

describe('<ConfirmDialog />', () => {
    it('Component should be render', () => {
        expect(shallow(<ConfirmDialog />).find('Grid').exists());
    });
    it('allows us to set props', () => {
        const wrapper = mount(<ConfirmDialog bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
});

// describe('<CurrentVideo />', () => {
//    //mount
//    //render
// });

describe('<TraceTarget />', () => {
    it('Component should be render', () => {
        expect(shallow(<TraceTarget />).find('Grid').exists());
    });
   //mount
});

describe('<UserMap />', () => {
    it('Component should be render', () => {
        expect(shallow(<UserMap />).find('Grid').exists());
    });
    //mount render
});

describe('<CameraDialog />', () => {
    it('Component should be render', () => {
        expect(shallow(<CameraDialog />).find('Grid').exists());
    });
    it('allows us to set props', () => {
        const wrapper = mount(<CameraDialog bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
    it('renders 1 title', () => {
        const wrapper = render(<CameraDialog />);
        expect(wrapper.find('ListItem')).toHaveLength(0);
    });
});

// describe('<SelectObject />', () => {
//     it('renders ', () => {
//         const wrapper = render(<SelectObject />);
//         expect(wrapper.find('div')).toHaveLength(0);
//     });
// });

describe('<SelectObject />', () => {
    it('render', () => {
        const wrapper = render(<SelectObject/>);
        expect(wrapper.find('div')).toHaveLength(3);
    });
});

describe('<EventEmitter />', () => {
    it('renders ', () => {
        const wrapper = render('EventEmitter');
        expect(wrapper.find('div')).toHaveLength(0);
    });
});
