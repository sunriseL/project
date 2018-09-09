import React from 'react'
import { shallow ,render, mount} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HistoryVideoForm from "../Components/HistoryVideoForm"
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
import jsdom from 'jsdom';
import SelectObject from "../Components/SelectObject";
import App from "../App";
import VideoPlayer from "../Components/VideoPlayer";

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
    const wrapper = shallow(<App {...props} />);
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

describe('<DrawUserMap />', () => {
    const props = {
        onAddClick: jest.fn()
    };
    const wrapper = shallow(<DrawUserMap {...props} />);
    it('Component should be render', () => {
        expect(wrapper.find('Grid').exists());
    });
   //mount
    it('renders', () => {
        const wrapper = render(<DrawUserMap />);
        expect(wrapper.find('ListItem')).toHaveLength(0);
    });
});

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

describe('<AddCamera />', () => {
    it('Component should be render', () => {
        expect(shallow(<AddCamera />).find('Grid').exists());
    });
});

describe('<ConfirmDialog />', () => {
    it('Component should be render', () => {
        expect(shallow(<ConfirmDialog />).find('Grid').exists());
    });
});

describe('<CurrentVideo />', () => {
    //shallow media
    it('render', () => {
        const wrapper = render(<CurrentVideo/>);
        expect(wrapper.find('div')).toHaveLength(12);
    });
});

describe('<TraceTarget />', () => {
    it('Component should be render', () => {
        expect(shallow(<TraceTarget />).find('Grid').exists());
    });
});

describe('<HistoryVideo />', () => {
    it('Component should be render', () => {
        expect(shallow(<HistoryVideo />).find('Grid').exists());
    });
});

describe('<Settings />', () => {
    it('DrawUserMap Component should be render', () => {
        expect(shallow(<Settings />).find('BreadCrumb').exists());
    });
});

describe('<UserMap />', () => {
    it('Component should be render', () => {
        expect(shallow(<UserMap />).find('Grid').exists());
    });
   //mount
});

describe('<CameraDialog />', () => {
    it('Component should be render', () => {
        expect(shallow(<CameraDialog />).find('Grid').exists());
    });
    it('allows us to set props', () => {
        mount(<CameraDialog />);
    });
});

describe('<SelectObject />', () => {
    it('render', () => {
        const wrapper = render(<SelectObject/>);
        expect(wrapper.find('canvas').length).not.toBe(0);
    });
   //mount getContext/render video.src
});

describe('<VideoPlayer />', () => {
    it('allows us to set props', () => {
        mount(<VideoPlayer/>);
    });
    it('Component should be render', () => {
        expect(shallow(<VideoPlayer />).find('Grid').exists());
    });
});
