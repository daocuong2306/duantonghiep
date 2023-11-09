import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Select } from 'antd';
import { useAddOptionMutation, useAddOptionValueMutation, useGetOptionsQuery } from '@/api/option';

const AddValueOptions: React.FC = () => {
    const { data: options, isLoading, error } = useGetOptionsQuery();
    const [form] = Form.useForm();
    console.log(form.getFieldsValue());
    const [addValueOptions] = useAddOptionValueMutation()
    const onFinish = (values: any) => {
        console.log('Form values:', values);
        console.log(options);
        for (let item of values.items) {
            const selectedValue = item.name; // Access the selected value
            console.log('Selected value:', selectedValue);
            const list = item.list.map(subItem => subItem.first);
            console.log(item.name, list);
            addValueOptions({
                option_id: item.name,
                values: list
            });
        }
    };
    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="dynamic_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ items: [{}] }}
            onFinish={onFinish}
        >
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Item ${field.name + 1}`}
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                            >
                                {/* <Form.Item label="Select" name={[field.name, 'name']}>
                                    <Select>
                                        {options?.options.map(option => <Select.Option value={option.id}>{option.name}</Select.Option>)}
                                    </Select>
                                </Form.Item> */}
                                <Form.Item label="Select" name={[field.name, 'name']}>
                                    <Select>
                                        {options?.options.map(option => <Option value={option.optionId}>{option.name}</Option>)}
                                    </Select>
                                </Form.Item>
                                {/* value option */}
                                < Form.Item label="List" >
                                    <Form.List name={[field.name, 'list']}>
                                        {(subFields, subOpt) => (
                                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                {subFields.map((subField) => (
                                                    <Space key={subField.key}>
                                                        <Form.Item noStyle name={[subField.name, 'first']}>
                                                            <Input placeholder="first" />
                                                        </Form.Item>
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                subOpt.remove(subField.name);
                                                            }}
                                                        />
                                                    </Space>
                                                ))}
                                                <Button type="dashed" onClick={() => subOpt.add()} block>
                                                    + Thêm mục phụ
                                                </Button>

                                            </div>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Card>
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                            + Thêm mục phụ
                        </Button>
                        <Button primary htmlType="submit">
                            Gửi
                        </Button>
                    </div>
                )
                }
            </Form.List >
        </Form >
    );
};

export default AddValueOptions;