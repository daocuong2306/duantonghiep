import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { useAddOptionMutation, useAddOptionValueMutation } from '@/api/option';
import { useNavigate } from 'react-router-dom';

const AddOptions: React.FC = () => {
    const [form] = Form.useForm();
    console.log(form.getFieldsValue());
    const [AddOptions] = useAddOptionMutation();
    const [addValueOptions] = useAddOptionValueMutation()
    const url = useNavigate()
    const onFinish = (values: any) => {
        console.log(values);
        for (let item of values.items) {
            console.log(item.name);
            AddOptions({
                name: item.name
            })
        }
        url("/admin/Options")
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
                                <Form.Item label="Name" name={[field.name, 'name']}>
                                    <Input />
                                </Form.Item>

                                {/* value option */}
                                {/* <Form.Item label="List">
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
                                                    + Add Sub Item
                                                </Button>

                                            </div>
                                        )}
                                    </Form.List>
                                </Form.Item> */}
                            </Card>
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                            + Thêm mục phụ
                        </Button>
                        <Button primary htmlType="submit">
                            Gửi
                        </Button>
                    </div>
                )}
            </Form.List>
        </Form>
    );
};

export default AddOptions;