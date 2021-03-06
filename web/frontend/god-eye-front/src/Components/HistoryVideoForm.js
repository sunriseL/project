import React from 'react';
import { Form, DatePicker } from 'antd';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class HistoryVideoForm extends React.Component {
    handleClick = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
            return;
        }

        // Should format date value before submit.
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
            'start': rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            'end': rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
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
        <Form>
            <Grid container>
                <Grid item xs={8}>
                    <FormItem>
                        {getFieldDecorator('range-time-picker', rangeConfig)(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width:'80%'}}/>
                        )}
                    </FormItem>
                </Grid>
                <Grid xs={3}>
                    <FormItem>
                    <Button  variant="contained" size="small" onClick={this.handleClick} style={{width:"78%", left:"4%"}}>
                        <SaveIcon />
                        选定时间
                    </Button>
                    </FormItem>
                </Grid>
            </Grid>
        </Form>
        );
    }
}

const WrappedHistoryVideoForm = Form.create()(HistoryVideoForm);
export default WrappedHistoryVideoForm;