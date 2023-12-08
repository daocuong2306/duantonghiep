import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { useAddOptionMutation } from '@/api/option';
import { useNavigate } from 'react-router-dom';

const AddOptions: React.FC = () => {
    const [form] = Form.useForm();
    console.log(form.getFieldsValue());
    const [AddOptions] = useAddOptionMutation();
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
                                title={`Giá trị ${field.name + 1}`}
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                            >
                                <Form.Item label="Tên" name={[field.name, 'name']}>
                                    <Input />
                                </Form.Item>

                            </Card>
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                            + Thêm mục phụ
                        </Button>
                        <Button  htmlType="submit">
                            Gửi
                        </Button>
                    </div>
                )}
            </Form.List>
        </Form>

    );
};

export default AddOptions;