import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = ({ dataComment }) => {
    console.log(dataComment);

    if (dataComment && typeof dataComment === 'object') {
        // Khởi tạo mảng data với giá trị mặc định
        const data = [
            { type: '5 sao', value: 0 },
            { type: '4 sao', value: 0 },
            { type: '3 sao', value: 0 },
            { type: '2 sao', value: 0 },
            { type: '1 sao', value: 0 },
        ];

        // Cập nhật giá trị trong data dựa trên dataComment
        Object.keys(dataComment).forEach(key => {
            const stars = dataComment[key].stars;
            const count = dataComment[key].count;

            // Cập nhật giá trị trong data tương ứng với số sao
            if (stars >= 1 && stars <= 5) {
                data[5 - stars].value = count;
            }
        });

        // Kiểm tra xem có phải tất cả các giá trị đều là 0 hay không
        const allValuesAreZero = data.every(item => item.value === 0);

        // Nếu tất cả các giá trị đều là 0, trả về null để ẩn biểu đồ
        if (allValuesAreZero) {
            return null;
        }

        const config = {
            appendPadding: 10,
            data,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.6,
            label: {
                type: 'inner',
                offset: '-50%',
                content: '{value}',
                style: {
                    textAlign: 'center',
                    fontSize: 14,
                },
            },
            interactions: [
                {
                    type: 'element-selected',
                },
                {
                    type: 'element-active',
                },
            ],
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    },
                    content: 'Thống kê',
                },
            },
        };

        return <Pie {...config} />;
    }

    // Nếu dataComment không tồn tại hoặc không phải là object, trả về null để ẩn biểu đồ
    return null;
};

export default DemoPie;
