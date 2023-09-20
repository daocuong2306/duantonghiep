// src/components/ImageUpload.js
import { useDispatch, useSelector } from 'react-redux';
import { AdvancedImage } from '@cloudinary/react';
import { setImageUrl } from '../../../cloudinary/cloudinarySlice'; // Thay đổi đường dẫn đến slice của bạn

function ImageUpload() {
    const dispatch = useDispatch();
    const imageUrl = useSelector((state) => state.cloudinary.imageUrl);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", "wyfeqahj");
        // Gửi yêu cầu tải lên đến Cloudinary
        const response = await fetch(
            'https://api.cloudinary.com/v1_1/dfkkezs8a/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        dispatch(setImageUrl(data.secure_url)); // Sử dụng action để cập nhật trạng thái Cloudinary
    };

    return (
        <div>
            <h1>Cloudinary React Example with Redux Toolkit</h1>
            <input type="file" onChange={handleUpload} />
            {imageUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <AdvancedImage
                        cloudName="your_cloud_name" // Thay thế bằng tên Cloud của bạn
                        cldImg={imageUrl}
                        width="300"
                        height="200"
                    />
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
