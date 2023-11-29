import React, { useState, useRef, useEffect } from 'react';
import { Button, Drawer, Form, Input, Table, Col, Row } from 'antd';
import { useGetValueIdQuery, useUpdateVariantMutation } from '@/api/variant';
import { useGetProductByIdQuery } from '@/api/product';

const Update: React.FC<{ id: string }> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    //call product 
    const { data: product } = useGetProductByIdQuery(id);
    // Call variant
    const { data: variants } = useGetValueIdQuery(id);
    const [updateVariant, { data: dataUpdate }] = useUpdateVariantMutation();
    console.log(variants);

    // Column variant
    const columns = [
        {
            title: 'Name',
            dataIndex: 'option_value',
            key: 'option_value',
            render: (dataIndex) => (
                <span>
                    {dataIndex.map((value, index) => (
                        <React.Fragment key={index}>
                            {value}
                            {index < dataIndex.length - 1 && ' - '}
                        </React.Fragment>
                    ))}
                </span>
            ),
        },
        {
            title: 'Giá của từng mẫu',
            dataIndex: 'skus_price',
            key: 'sku_id',
            render: (dataIndex, record) => (
                <Form.Item
                    name={`price${record.sku_id}`} // Thay đổi tên trường Form
                    initialValue={dataIndex}
                >
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock',
            key: 'sku_id',
            render: (dataIndex, record) => (
                <Form.Item
                    name={`Stock${record.sku_id}`} // Thay đổi tên trường Form
                    initialValue={dataIndex}
                >
                    <Input defaultValue={dataIndex} />
                </Form.Item>
            ),
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'sku_id',
            key: 'sku_id',
            render: (dataIndex, record) => (
                <Form.Item
                    name={`sku${record.sku_id}`} // Thay đổi tên trường Form
                    initialValue={dataIndex}
                >
                    <Input disabled />
                </Form.Item>
            ),
        }
    ];

    const outputArray = variants?.handleVariant ? Object.values(variants.handleVariant) : [];
    const variantData: DataType[] = outputArray;
    // end variant
    //update Variant
    const onUpdateVariant = (key, record) => {
        console.log(record);

        const data = {
            id,
            formData: {
                "price": key.skus_price,
                "stock": key.stock,
                "sku": key.sku_id
            }
        }
        updateVariant(data)
    }

    // onfinish
    const onFinishForm = (values) => {
        const resultArray = Object.values(values)
            .reduce((acc, value, index) => {
                const arrayIndex = Math.floor(index / 3);
                if (!acc[arrayIndex]) {
                    acc[arrayIndex] = {};
                }
                const property = index % 3 === 0 ? 'price' : (index % 3 === 1 ? 'stock' : 'sku');
                acc[arrayIndex][property] = value;
                return acc;
            }, []);

        console.log(dataUpdate);
        for (let item of resultArray) {
            const data = {
                id: item.sku,
                formData: item
            }

            updateVariant(data)
        }

    };
    console.log(dataUpdate);

    return (
        <>
            <Button onClick={showDrawer}>Sửa</Button>
            <Drawer
                title="Update Product"
                width={720}
                onClose={onClose}
                visible={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishForm}
                    autoComplete="off"
                >
                    {/* <Row gutter={16}>
                        <Col span={12}>
                            <div className="w-full">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={twoFunctions}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" className="w-full h-full" /> : uploadButton}
                                </Upload>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                initialValue={product?.product.name}
                            >
                                <Input placeholder="Please enter a name" />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price"
                                initialValue={product?.product.price}
                            >
                                <Input placeholder="Please enter a price" />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                label="Category"
                                initialValue={categoryMapping[product?.product.category_name]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a category"
                                    optionFilterProp="children"
                                    options={optionId?.map((option) => ({
                                        ...option,
                                        value: categoryMapping[option.label], // Set the value to the category ID
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="code"
                        label="Code"
                        initialValue={product?.product.code}
                    >
                        <Input placeholder="Please enter a code" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        initialValue={product?.product.description}
                    >
                        <SunEditor getSunEditorInstance={getSunEditorInstance} />
                    </Form.Item> */}

                    {/* variant */}
                    <Table columns={columns} dataSource={variantData} />
                    <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                        <Button htmlType="submit">Gửi</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default Update;
