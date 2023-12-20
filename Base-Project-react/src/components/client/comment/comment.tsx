import { Form, Input, Button, Rate, Spin, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddCommentMutation } from '@/api/comment';
import { useGetDetailQuery } from '@/api/detail';

const Comment = () => {
    const [form] = Form.useForm();
    const [addComment, { data: commentData }] = useAddCommentMutation();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState();
    const [reloadData, setReloadData] = useState(false);
    const prodcuts = {
        id, selectP: [null, null]
    }
    const handleCommentChange = (e: any) => {
        form.setFieldsValue({ comment: e.target.value });
    };

    const handleRatingChange = (value: any) => {
        setRating(value);
    };
    const { data: detaiProduct, refetch } = useGetDetailQuery(prodcuts);
    console.log("123", detaiProduct);

    useEffect(() => {
        refetch();
    }, [reloadData]);

    // This will log the updated data
    const handleSubmit = () => {
        form
            .validateFields()
            .then(() => {
                const token = localStorage.getItem("header");
                const formData = form.getFieldsValue();
                const data = {
                    token: token,
                    value: {
                        comments: formData.comment,
                        evaluate: rating,
                        id_product: String(id),
                    },
                };
                addComment(data);
                setLoading(true);

                // Set the state to trigger refetch
                setReloadData(prevState => !prevState);
            })
            .catch((error) => {
                console.error("Validation failed", error);
            });
    };
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (m: any, d: any) => {
        api.open({
            message: m,
            description: d,
        });
    };

    useEffect(() => {
        if (commentData) {
            if (commentData?.message === "Bạn Phải Đăng nhập") {
                openNotification("Bạn chưa đăng nhập", "bạn phải đăng nhập để sử dụng chức năng này");
                setLoading(false);
            } else if (commentData?.message === "The comments field is required.'") {
                openNotification("Bạn cần điền nội dung của bình luận", "");
                setLoading(false);
            } else if (commentData?.errors || commentData?.error) {
                openNotification("Bạn đã hết số lần bình luận", "Vui lòng mua thêm sản phẩm để có thể bình luận");
                setLoading(false);
            } else {
                openNotification("Bình luận thành công", "");
                setLoading(false);
            }
        }
    }, [commentData]);


    return (
        <Spin spinning={loading}>
            {contextHolder}
            <div className="app container mx-auto p-4">
                <div id="comment-box" className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Bình luận của bạn:</h2>
                    <Form form={form}>
                        <Form.Item
                            name="comment"
                            rules={[{ required: true, message: 'Vui lòng nhập bình luận của bạn.' }]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Nhập bình luận của bạn..."
                                onChange={handleCommentChange}
                            />
                        </Form.Item>
                    </Form>
                </div>

                <div id="rating-stars" className="flex items-center mb-4">
                    <h2 className="text-xl font-bold mr-2">Đánh giá:</h2>
                    <Rate
                        value={form.getFieldValue('rating')}
                        onChange={handleRatingChange}
                    />
                </div>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "red" }}
                >
                    Gửi
                </Button>
            </div>

            <div>
                <section className="bg-white">
                    <div className="app container mx-auto p-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Số lượng bình luận ({detaiProduct?.data?.total_comment})</h2>
                        </div>
                        {detaiProduct?.data?.comment?.slice().reverse()?.map((value: any, key: any) => (
                            <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg" key={key}>
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                            {value.avatar_user != null ? <img src={`https://briteshop.store${value.avatar_user}`} className="mr-2 w-6 h-6 rounded-full" /> : <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                alt="Jese Leos"
                                            />}
                                            {value.name_user}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <time title="February 12th, 2022">{value.created_at}</time>
                                        </p>
                                    </div>
                                    <Rate disabled defaultValue={value.evaluate} />
                                </footer>
                                <p className="text-gray-500">{value.comments}</p>
                            </article>
                        ))}

                    </div>
                </section >
            </div >
        </Spin>
    );
};

export default Comment;


