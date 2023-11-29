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
import { useGetProductByIdQuery } from '@/api/product';
const { Option } = Select;



const Variant: React.FC = (product: any) => {
    const { data: options } = useGetOptionsQuery();
    console.log(options);
    
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
            {showSelect && <SelectVarint check={open} data={variants} id={product?.product.id} />}

            <div className="p-4  flex items-center justify-between">
                <div className="product-image-container flex items-center">
                    <div className="product-image-thumbnail rounded-full overflow-hidden">
                        <img
                            className="w-20 h-20"
                            src={`http://127.0.0.1:8000${product?.product.image}`}
                            alt=""
                        />
                    </div>
                    <div className="product-details ml-4">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            {product?.product.name}
                        </h1>
                        <p className="text-lg text-gray-600 mb-2">
                            Giá: {product?.product.code}
                        </p>
                    </div>
                </div>
            </div>
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
                                rules={[{ required: true, message: `Hãy nhập ${option.name}`, type: 'array' }]}
                            >
                                <Select mode="multiple" placeholder="Hãy chọn giá trị mong muốn">
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
                                  Gửi
                                </Button>
                                <Button htmlType="reset">Cài lại</Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>

        </>
    )
};

export default Variant;