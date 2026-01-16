import React, { useState } from 'react';
import {
    Button,
    Form,
    Select,
    Space,
    Col,
} from 'antd';
import { useGetOptionsQuery } from '@/api/option';
import SelectVarint from './selectVarint';
import { useGetValueMutation } from '@/api/variant';
const { Option } = Select;


const Variant: React.FC<any> = (product: any) => {
    const { data: options }: { data: any } = useGetOptionsQuery() as { data: any };
    console.log(options);

    const [open, setOpen] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [selectVariants, { data: variants }] = useGetValueMutation();
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
            {showSelect && <SelectVarint check={open} data={variants} id={product?.product.id} />}


            <Form
                name="validate_other"
                onFinish={onFinish}
                max-width={1200}
                layout="vertical"
            >
                {options?.options.map((option: any) => {
                    return <Col span={12}>
                        <Form.Item
                            name={option.name}
                            label={option.name}
                            rules={[{ required: true, message: `Hãy nhập ${option.name}`, type: 'array' }]}
                        >
                            <Select mode="multiple" placeholder="Hãy chọn giá trị mong muốn">
                                {option?.value.map((value: any) => (
                                    <Option key={value.id} value={value.id}>
                                        {value.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                })}
                <Form.Item wrapperCol={{ span: 15, offset: 14 }}>
                    <Space>
                        <Button htmlType="submit">
                            Gửi
                        </Button>
                        <Button htmlType="reset">Cài lại</Button>
                    </Space>
                </Form.Item>

            </Form>

        </>
    )
};

export default Variant;