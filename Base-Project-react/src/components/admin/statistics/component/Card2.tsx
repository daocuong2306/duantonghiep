import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

export const DemoPie = () => {
    const data2 = {
        day: 'tháng 11',
        valuedata: [
            {
                type: 'Quần',
                value: 27,
            },
            {
                type: 'Áo',
                value: 25,
            },
            {
                type: 'Túi',
                value: 18,
            },
            {
                type: 'Đồng hồ',
                value: 15,
            }
        ]
    };


    
    const data = [
        {
            type: 'Quần',
            value: 27,
        },
        {
            type: 'Áo',
            value: 25,
        },
        {
            type: 'Túi',
            value: 18,
        },
        {
            type: 'Đồng hồ',
            value: 15,
        }
    ];
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
};
