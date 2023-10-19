import React from 'react';
import {
    Button,
    Form,
    Select,
    Space,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};

const App: React.FC = () => (
    <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
    >
        <Form.Item label="Plain Text">
            <span className="ant-form-text">Áo PoLo</span>
        </Form.Item>
        <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: 'Please select your country!' }]}
        >
            <Select placeholder="Please select a country">
                <Option value="china">Màu</Option>
                <Option value="usa">Size</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="select-multiple-1"
            label="Select[multiple]"
            rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
        >
            <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="10">Red</Option>
                <Option value="13">Green</Option>
                <Option value="14">Blue</Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="select-1"
            label="Select-1"
            hasFeedback
            rules={[{ required: true, message: 'Please select your country!' }]}
        >
            <Select placeholder="Please select a country">
                <Option value="china">Màu</Option>
                <Option value="usa">Size</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="select-multiple"
            label="Select[multiple]"
            rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
        >
            <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="1">XL</Option>
                <Option value="2">M</Option>
                <Option value="3">L</Option>
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