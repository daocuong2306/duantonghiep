// src/features/cloudinary/cloudinarySlice.js
import { createSlice } from '@reduxjs/toolkit';

const cloudinarySlice = createSlice({
    name: 'cloudinary',
    initialState: {
        imageUrl: '', // Trạng thái khởi tạo cho URL của hình ảnh
    },
    reducers: {
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
    },
});

export const { setImageUrl } = cloudinarySlice.actions;
export const cloudinaryReducer = cloudinarySlice.reducer;
export default cloudinarySlice.reducer;
