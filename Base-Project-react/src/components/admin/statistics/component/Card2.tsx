import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = ({ dataComment }) => {
    console.log(dataComment);


    const data = [
        {
            type: '5 sao',
            value: 0,
        },
        {
            type: '4 sao',
            value: 0,
        },
        {
            type: '3 sao',
            value: 0,
        },
        {
            type: '2 sao',
            value: 0,
        },
        {
            type: '1 sao',
            value: 0,
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


export default DemoPie