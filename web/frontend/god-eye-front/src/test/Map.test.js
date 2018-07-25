import React from 'react'
import { shallow ,render, mount} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HistoryVideoForm from "../Components/HistoryVideoForm"
import TargetDialog from "../Components/TargetDialog";
import DrawUserMap from "../Components/DrawUserMap";
import Settings from "../Components/Settings";
import MainNav from "../Components/MainNav";
import HistoryVideo from "../Components/HistoryVideo";
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
import App from "../App";
import {Canvas} from "jsdom/lib/jsdom/utils";

if (typeof document === 'undefined') {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.navigator = global.window.navigator;
    global.localStorage = global.window.localStorage;
}

configure({ adapter: new Adapter() });

let mock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key];
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: mock,
});

const setupApp = () => {
    const props = {
        onAddClick: jest.fn()
    };
    const wrapper = shallow(<App {...props} />)
    return {
        props,
        wrapper
    }
};

describe('<App />', () => {
    const { wrapper, props } = setupApp();
    it('Component should be render', () => {
        expect(wrapper.find('MainNav').exists());
    });
    it('render', () => {
        const wrapper = render(<App />);
        expect(wrapper.find('div')).toHaveLength(5);
    });
});


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
    it('allows us to set props', () => {
        const wrapper = mount(<HistoryVideo />);
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
//     it('allows us to set props', () => {
//         const wrapper = mount(<CurrentVideo />);
//     });
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
    it('allows us to set props', () => {
        //const wrapperRender = render(<Canvas id="lightCameraCanvas" />);
        const wrapperMount = mount(<Canvas id="lightCameraCanvas" />);
        const wrapper = mount(<UserMap bar="baz"/>);
        expect(wrapper.props().bar).toBe('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).toBe('foo');
    });
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
    it('render', () => {
        const wrapper = render(<CameraDialog />);
        expect(wrapper.find('ListItem')).toHaveLength(0);
    });
});

describe('<SelectObject />', () => {
    it('render', () => {
        const wrapper = render(<SelectObject/>);
        expect(wrapper.find('div')).toHaveLength(10);
    });
   //mount getContext
});
