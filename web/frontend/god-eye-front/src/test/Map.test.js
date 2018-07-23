import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HistoryVideoForm from "../Components/HistoryVideoForm"
import TargetDialog from "../Components/TargetDialog";
configure({ adapter: new Adapter() });

const wrapper = shallow(<HistoryVideoForm />);
const wrapper1 = shallow(<TargetDialog />);

describe('HistoryVideoForm', () => {
    it('HistoryVideoForm Component should be render', () => {
        expect(wrapper.find('FormItem').exists());
    });
})

describe('TargetDialog', () => {
    it('TargetDialog Component should be render', () => {
        expect(wrapper1.find('Dialog').exists());
    });
})