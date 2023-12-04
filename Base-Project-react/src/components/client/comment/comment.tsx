import React, { useEffect, useState } from 'react';

import { Button, Input, Rate, Spin, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddCommentMutation } from '@/api/comment';


const Comment = () => {
    const [addComment, { data: commentData }] = useAddCommentMutation()
    const { id } = useParams()
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const url = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const handleRatingChange = (value) => {
        setRating(value);
    };

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
    const openNotification = (m, d) => {
        api.open({
            message: m,
            description: d
        });
    };
    useEffect(() => {
        if (commentData) {
            if (commentData?.message == "Bạn Phải Đăng nhập") {
                openNotification('Bạn chưa đăng nhập', 'bạn phải đăng nhập để sử dụng chức năng này');
                setLoading(false); // This will not trigger a re-render immediately
            } else {
                openNotification('Bạn đã bình luận thành công', "");
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
        </Spin >
    );
};

export default Comment;
