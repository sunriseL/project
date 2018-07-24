import React from 'react'
import { shallow ,render} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HistoryVideoForm from "../Components/HistoryVideoForm"
import TargetDialog from "../Components/TargetDialog";
import DrawUserMap from "../Components/DrawUserMap";
import SelectObject from "../Components/SelectObject";
import Settings from "../Components/Settings";
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

const wrapper = shallow(<HistoryVideoForm />);
const wrapper1 = shallow(<TargetDialog />);

describe('HistoryVideoForm', () => {
    it('HistoryVideoForm Component should be render', () => {
        expect(wrapper.find('FormItem').exists());
    });
});

describe('TargetDialog', () => {
    it('TargetDialog Component should be render', () => {
        expect(wrapper1.find('Dialog').exists());
    });
});

describe('DrawUserMap', () => {
    it('DrawUserMap Component should be render', () => {
        expect(shallow(<DrawUserMap />).find('Grid').exists());
    });
});

describe('<SelectObject/>', () => {
    it('SelectObject Component should be render', () => {
        const tree = renderer
            .create("SelectObject").toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Settings', () => {
    it('DrawUserMap Component should be render', () => {
        expect(shallow(<Settings />).find('BreadCrumb').exists());
    });
});

