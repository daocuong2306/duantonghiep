import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Select, Spin, notification } from 'antd';
import { useAddOptionValueMutation, useGetOptionsQuery } from '@/api/option';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;


const AddValueOptions: React.FC = () => {
    const { data: options, isLoading }: { data: any, isLoading: any } = useGetOptionsQuery() as { data: any, isLoading: any };
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    console.log(form.getFieldsValue());
    const [addValueOptions, { data: dataAdd, error, isLoading: addLoading }] = useAddOptionValueMutation()
    const url = useNavigate()
    const onFinish = (values: any) => {
        console.log('Form values:', values);
        console.log(options);
        for (let item of values.items) {
            const selectedValue = item.name; // Access the selected value
            console.log('Selected value:', selectedValue);
            const list = item.list.map((subItem: any) => subItem.first);
            console.log(item.name, list);
            addValueOptions({
                option_id: item.name,
                values: list
            });
        }
    };
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e: any) => {
        api.open({
            message: e,
        });
    };
    console.log(dataAdd);
    if (dataAdd?.message == "Successful") {
        url("/admin/Options")
    }
    const errors: any = error
    useEffect(() => {
        if (errors?.data?.errors?.values) {
            openNotification("Có giá trị trùng lặp hoặc đã tồn tại trong cơ sở dữ liệu.")
        } else if (errors) {
            openNotification("bạn cần điền đẩy đủ thông tin.")
            setLoading(false);
        }
    }, [error]);
    return (
        <>
            <Spin spinning={isLoading} className="pl-[50%]">
                <Spin spinning={addLoading} className="pl-[50%]">
                    <Spin spinning={loading} className="pl-[50%]">
                        {contextHolder}
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
                                                <Form.Item label="Chọn" name={[field.name, 'name']}>
                                                    <Select>
                                                        {options?.options.map((option: any) => (
                                                            <Option key={option.optionId} value={option.optionId}>
                                                                {option.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                {/* value option */}
                                                < Form.Item label="Tên giá trị" >
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
                                                                    +
                                                                </Button>

                                                            </div>
                                                        )}
                                                    </Form.List>
                                                </Form.Item>
                                            </Card>
                                        ))}

                                        <Button type="dashed" onClick={() => add()} block>
                                            + thêm mục phụ
                                        </Button>
                                        <Button htmlType="submit">
                                            Gửi
                                        </Button>
                                    </div>
                                )
                                }
                            </Form.List >
                        </Form >
                    </Spin>
                </Spin>
            </Spin></>
    );
};

export default AddValueOptions;