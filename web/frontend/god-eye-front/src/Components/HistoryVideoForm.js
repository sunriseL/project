import React from 'react';
import { Form, DatePicker,  Button, Row, Col } from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class HistoryVideoForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
            return;
        }

        // Should format date value before submit.
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
            ...fieldsValue,
            'range-time-picker': [
            rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
            ],
        };

        console.log('Received values of form: ', values);
        // Commit time data to server here
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
        <Form onSubmit={this.handleSubmit}>
            <Row>
                <Col span={6} offset={6}>
                    <FormItem>
                        {getFieldDecorator('range-time-picker', rangeConfig)(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        );
    }
}

const WrappedHistoryVideoForm = Form.create()(HistoryVideoForm);
export default WrappedHistoryVideoForm;