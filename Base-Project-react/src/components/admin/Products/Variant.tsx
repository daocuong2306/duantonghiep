import React from 'react';
import {
    Button,
    Form,
    Select,
    Space,
    Col,
    Row
} from 'antd';
import { useGetOptionsQuery } from '@/api/option';
const { Option } = Select;


const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};

const Variant: React.FC = () => {
    const { data: options } = useGetOptionsQuery();
    console.log(options?.options)
    return (
        <>

            <Form
                name="validate_other"
                onFinish={onFinish}
                max-width={1200}
                layout="vertical"
            >
                <Row gutter={16}>
                    {options?.options.map((option) => {
                        return <Col span={12}>
                            <Form.Item
                                name={option.name}
                                label={option.name}
                                rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
                            >
                                <Select mode="multiple" placeholder="Please select favourite colors">
                                    {option?.value.map((value, index) => <Option value={index + 1}>{value.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    })}
                </Row>
                <Row gutter={16}>
                    <Col span={12}>

                    </Col>
                    <Col span={12}>
                        <Form.Item wrapperCol={{ span: 15, offset: 14 }}>
                            <Space>
                                <Button htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="reset">reset</Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>

            </Form></>
    )
};

export default Variant;