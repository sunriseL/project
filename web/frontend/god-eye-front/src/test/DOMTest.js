import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AddCamera from '../Components/AddCamera';


describe(<AddCamera />, () => {
    const addCamera = TestUtils.renderIntoDocument(<AddCamera />);
    const addCameraNode = ReactDOM.getDOMNode(addCamera);

    it('Mount', () => {
        addCameraNode.getDOMNode
    })
})