import React, { useState } from 'react';
import {
    Button,
    Form,
    Select,
    Space,
    Col,
    Row
} from 'antd';
import { useGetOptionsQuery } from '@/api/option';
import SelectVarint from './selectVarint';
import { useGetValueMutation } from '@/api/variant';
const { Option } = Select;



const Variant: React.FC = (id: string) => {
    const { data: options } = useGetOptionsQuery();
    const [open, setOpen] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [selectVariants, { data: variants, isLoading, error }] = useGetValueMutation();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        setOpen(true)
        setShowSelect(true);
        const result = Object.values(values);

        selectVariants({
            "arrayValue": result
        })

        console.log(open);
    };
    return (
        <>
            {showSelect && <SelectVarint check={open} data={variants} id={id} />}
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
                                    {option?.value.map((value) => <Option value={value.id}>{value.name}</Option>)}
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