import React, { useState } from 'react';

import { Button, Input, Rate } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddCommentMutation } from '@/api/comment';


const Comment = () => {
    const [addComment] = useAddCommentMutation()
    const { id } = useParams()
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const url = useNavigate()
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
    };

    return (
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
    );
};

export default Comment;
