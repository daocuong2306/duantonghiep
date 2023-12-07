const newData = jsonArray.map(item => {
    return {
        ...item,
        value: item.value.map(option => ({
            ...option,
            inStock: true,
            type: item.key, // Thêm thuộc tính "type" để chỉ định loại
        })),
    };
});
