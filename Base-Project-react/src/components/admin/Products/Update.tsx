import React, { useState, useRef, useEffect } from 'react';
import { Button, Drawer, Form, Input, Table, Select, Upload, Spin, InputNumber, notification } from 'antd';
import { useGetValueIdQuery, useRemoveVariantMutation, useUpdateVariantMutation } from '@/api/variant';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';
import SunEditor from 'suneditor-react';
import { useGetCategoriesQuery } from '@/api/category';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Variant from './Variant';
import { message } from 'antd';

const Update: React.FC<{ id: string }> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    //call product 
    const { data: product, isLoading } = useGetProductByIdQuery(id);
    const [updateProduct, { data: dataUpdateProduct }] = useUpdateProductMutation()
    //call category
    const { data: categories }: { data: any } = useGetCategoriesQuery() as { data: any };
    const categoryMapping: any = {};
    categories?.categories.forEach((category: any) => {
        categoryMapping[category.name] = category.id;
    });
    const optionId = categories?.categories.map((item: any) => ({ key: item.id, value: item.id, label: item.name }));

    // Call variant
    const { data: variants } = useGetValueIdQuery(id);
    const [updateVariant] = useUpdateVariantMutation();
    const [deleteVariant, { data: dataRemove }] = useRemoveVariantMutation();
    const [loading, setLoading] = useState(false);
    const deleteO = (id: number) => {
        const confim = window.confirm("Bạn có muốn xóa biến thể ?");
        if (confim) {
            deleteVariant(id)
            setLoading(true);
        }
    }
    useEffect(() => {
        if (dataRemove) {
            setLoading(false);
        }
    }, [dataRemove]);
    // Column variant
    const columns = [
        {
            title: 'Name',
            dataIndex: 'option_value',
            key: 'option_value',
            render: (dataIndex: any) => (
                <span>
                    {dataIndex.map((value: any, index: any) => (
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
            render: (dataIndex: any, record: any) => (
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
            render: (dataIndex: any, record: any) => (
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
            render: (dataIndex: any, record: any) => (
                <Form.Item
                    name={`sku${record.sku_id}`} // Thay đổi tên trường Form
                    initialValue={dataIndex}
                >
                    <Input disabled />
                </Form.Item>
            ),
        },
        {
            title: 'Chức năng',
            dataIndex: 'sku_id',
            key: 'sku_id',
            render: (dataIndex: any) => (
                <Button type="primary" danger onClick={() => deleteO(dataIndex)}>
                    Xóa
                </Button>
            ),
        }
    ];

    const outputArray = variants?.handleVariant ? Object.values(variants.handleVariant) : [];
    const variantData: any[] = outputArray;
    // end variant
    //update Variant
    //img upload
    const [check, setCheck] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const readerRef = useRef<any>(null);
    const [imageUrl, setImageUrl] = useState<string>();
    const getBase64 = (img: any, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };
    const handleFileChange = (event: any) => {
        const file = event.fileList[0].originFileObj;
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const fileData = e.target.result;
                console.log(fileData);

            };
            readerRef.current = reader;
            reader.readAsDataURL(file);
        }
    };
    const handleChange: any['onChange'] = (info: any) => {
        if (info.file.status === 'uploading') {
            getBase64(info.file.originFileObj as any, (url) => {
                setLoadingAvatar(true);
                setImageUrl(url);
            });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as any, (url) => {
                setLoadingAvatar(false);
                setImageUrl(url);
            });
        }
    };
    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const twoFunctions = (event: any) => {
        handleFileChange(event)
        handleChange(event)
    }
    const uploadButton = (
        <div>
            {loadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Cập nhật</div>
        </div>
    );
    //end upload image
    // onfinish
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e: any) => {
        api.open({
            message: e,
        });
    };
    const onFinishForm = async (values: any) => {
        console.log(1);
        const firstSkuId = variantData[0].sku_id;
        const lastSkuId = variantData[variantData.length - 1].sku_id;
        //update variant
        const variants = []
        for (let i = firstSkuId; i <= lastSkuId; i++) {
            const sku = values[`sku${i}`];
            const price = values[`price${i}`];
            const stock = values[`Stock${i}`];
            if (sku !== undefined && price !== undefined && stock !== undefined) {
                variants.push({ sku, price, stock });
            }
        }
        console.log(values[`sku${1}`]);

        for (let item of variants) {
            const data = {
                id: item.sku,
                formData: {
                    price: item.price,
                    stock: item.stock,
                    sku: item.sku
                }
            }
            updateVariant(data)
        }
        // update product
        const formData = new FormData();
        if (editor.current) {
            const content = editor.current.getContents();
            console.log("Editor Content:", content);
            formData.append('description', content);
        }
        // // Append form fields to formData
        formData.append('name', values.name);
        formData.append('code', values.code);
        formData.append('id_category', values.category);
        formData.append('price', String(values.price));
        if (selectedFile) {
            // If a new image is selected, append it to the formData
            formData.append('image', selectedFile);
        }
        formData.append('status', String(0));
        try {
            const productData = {
                id,
                formData
            }
            const response: any = await updateProduct(productData);
            if (response?.error.data.errors.image) {
                openNotification("Bạn cần thêm ảnh cho sản phẩm")
            } else if (response?.error.data.errors.code) {
                openNotification("Vui lòng nhập hoặc nhập lại mã sản phẩm")
            } else if (response?.error.data.errors.name) {
                openNotification("Vui lòng nhập hoặc nhập lại tên sản phẩm")
            }
        }
        catch (err) {
        }
    };

    useEffect(() => {
        if (dataUpdateProduct?.message == "Successfull") {
            setOpen(false);
        }
    }, [dataUpdateProduct]);
    //text
    const editor: any = useRef();
    const getSunEditorInstance = (sunEditor: any) => {
        editor.current = sunEditor;
    };
    useEffect(() => {
        if (editor.current && product?.product.description) {
            editor.current.setContents(product.product.description);
        }
    }, [product]);

    return (
        <>
            <Button onClick={showDrawer}>Sửa</Button>

            <Drawer
                title="Sửa sản phẩm"
                width={900}
                onClose={onClose}
                visible={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Spin spinning={isLoading}>
                    <Spin spinning={loading}>
                        {contextHolder}
                        <Form
                            layout="vertical"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 20 }}
                            style={{ maxWidth: 900 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinishForm}
                            autoComplete="off"
                        >
                            <div className='d-flex justify-content-between gap-10 mb-20'>
                                <div>
                                    {!check ? (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setImageUrl(undefined);
                                                    setSelectedFile(null);
                                                    setCheck(true);
                                                }}
                                                className="delete-button"
                                            >
                                                Xóa
                                            </Button>
                                            <img src={`https://briteshop.store${product?.product?.image}`} className="w-150 h-full" />
                                        </>
                                    ) : (
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
                                    )}
                                </div>
                                <div className='w-full'>
                                    <Form.Item
                                        name="name"
                                        label="Tên sản phẩm"
                                        initialValue={product?.product?.name}
                                    >
                                        <Input placeholder="Please enter a name" />
                                    </Form.Item>
                                    <Form.Item
                                        name="price"
                                        label="Giá"
                                        initialValue={product?.product?.price}
                                        rules={[
                                            {
                                                type: 'number',
                                                message: 'Vui lòng nhập số!',
                                            },
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập giá!',
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder="Please enter a price" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        name="category"
                                        label="Danh mục"
                                        initialValue={categoryMapping[product?.product?.category_name]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Chọn danh mục"
                                            optionFilterProp="children"
                                            options={optionId?.map((option: any) => ({
                                                ...option,
                                                key: option.id, // Giả sử `id` là một trường duy nhất
                                                value: categoryMapping[option.label],
                                            }))}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="code"
                                        label="Mã sản phẩm"
                                        initialValue={product?.product?.code}
                                    >
                                        <Input placeholder="Please enter a code" />
                                    </Form.Item>
                                    <Form.Item
                                        name="description"
                                        label="Mô tả"
                                        initialValue={product?.product?.description}
                                    >
                                        <SunEditor getSunEditorInstance={getSunEditorInstance} defaultValue={product?.product?.description} />
                                    </Form.Item>
                                </div>

                            </div>
                            {/* variant */}
                            {variantData.length > 0 ? <div>
                                <Table columns={columns} dataSource={variantData} />
                                <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                                    <Button htmlType="submit">
                                        Gửi
                                    </Button>
                                </Form.Item>
                            </div> : null}
                        </Form>
                        {variantData.length > 0 ? null : <Variant product={product?.product} id={1} />}
                    </Spin>
                </Spin>
            </Drawer>
        </>
    );
};

export default Update;
