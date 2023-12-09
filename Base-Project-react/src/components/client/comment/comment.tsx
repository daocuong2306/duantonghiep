import { useEffect, useState } from 'react';

import { Button, Input, Rate, Spin, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { useAddCommentMutation } from '@/api/comment';
import { useGetDetailQuery } from '@/api/detail';


const Comment = () => {
    const [addComment, { data: commentData }] = useAddCommentMutation()
    const { id } = useParams()
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const handleCommentChange = (e: any) => {
        setComment(e.target.value);
    };
    const handleRatingChange = (value: any) => {
        setRating(value);
    };
    //cmt
    const prodcuts = {
        id, selectP: [null, null]
    }
    const { data: detaiProduct } = useGetDetailQuery(prodcuts);
    const data = {
        cmt: detaiProduct?.data.comment,
        total: detaiProduct?.data.total_comment
    }
    console.log("props", data);
    const handleSubmit = () => {
        const token = localStorage.getItem("header")
        const data = {
            token: token,
            value: {
                comments: comment,
                evaluate: rating,
                id_product: String(id)
            }
        }
        console.log(data.token);
        addComment(data);
        setLoading(true);
    };
    //thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (m: any, d: any) => {
        api.open({
            message: m,
            description: d
        });
    };
    console.log(commentData);

    useEffect(() => {
        if (commentData) {
            if (commentData?.message == "Bạn Phải Đăng nhập") {
                openNotification('Bạn chưa đăng nhập', 'bạn phải đăng nhập để sử dụng chức năng này');
                setLoading(false); // This will not trigger a re-render immediately
            } else if (commentData?.errors) {
                openNotification('Bạn đã hết số lần bình luận', "Vui lòng mua thêm sản phẩm để có thể bình luận");
                setLoading(false); // This will not trigger a re-render immediately
            } else {
                openNotification('Bình luận thành công', "");
                setLoading(false); // This will not trigger a re-render immediately
            }
        }
    }, [commentData]);
    return (
        <Spin spinning={loading}>
            {contextHolder}
            <div className="app container mx-auto p-4">
                <div id="comment-box" className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Bình luận của bạn:</h2>
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập bình luận của bạn..."
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </div>

                <div id="rating-stars" className="flex items-center mb-4">
                    <h2 className="text-xl font-bold mr-2">Đánh giá:</h2>
                    <Rate value={rating} onChange={handleRatingChange} />
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
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Số lượng bình luận ({data?.total})</h2>
                        </div>
                        {data?.cmt?.slice().reverse()?.map((value: any) => (
                            <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                alt="Jese Leos"
                                            />
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
        </Spin >
    );
};

export default Comment;
