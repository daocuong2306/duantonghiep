import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import React from 'react';
import {
    Button,
    Checkbox,
    Col,
    ColorPicker,
    Form,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Space,
    Switch,
    Upload,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};

const App: React.FC = () => (
    <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
            'color-picker': null,
        }}
        style={{ maxWidth: 600 }}
    >
        <Form.Item label="Plain Text">
            <span className="ant-form-text">China</span>
        </Form.Item>
        <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: 'Please select your country!' }]}
        >
            <Select placeholder="Please select a country">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="select-multiple"
            label="Select[multiple]"
            rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
        >
            <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
            </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="reset">reset</Button>
            </Space>
        </Form.Item>
    </Form>
);

export default App;