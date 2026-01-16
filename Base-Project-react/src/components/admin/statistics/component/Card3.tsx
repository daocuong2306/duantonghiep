import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

export const DemoColumn = () => {
    const data = [
        {
            "city": "Áo",
            "type": "水果",
            "value": 14500
        },
        {
            "city": "Áo",
            "type": "米面",
            "value": 8500
        },
        {
            "city": "Áo",
            "type": "特产零食",
            "value": 10000
        },
        {
            "city": "Áo",
            "type": "茶叶",
            "value": 7000
        },
        {
            "city": "深圳",
            "type": "水果",
            "value": 9000
        },
        {
            "city": "深圳",
            "type": "米面",
            "value": 8500
        },
        {
            "city": "深圳",
            "type": "特产零食",
            "value": 11000
        },
        {
            "city": "深圳",
            "type": "茶叶",
            "value": 6000
        },
        {
            "city": "温州",
            "type": "水果",
            "value": 16000
        },
        {
            "city": "温州",
            "type": "米面",
            "value": 5000
        },
        {
            "city": "温州",
            "type": "特产零食",
            "value": 6000
        },
        {
            "city": "温州",
            "type": "茶叶",
            "value": 10000
        },
        {
            "city": "宁波",
            "type": "水果",
            "value": 14000
        },
        {
            "city": "宁波",
            "type": "米面",
            "value": 9000
        },
        {
            "city": "宁波",
            "type": "特产零食",
            "value": 10000
        },
        {
            "city": "宁波",
            "type": "茶叶",
            "value": 9000
        },
        {
            "city": "无锡",
            "type": "水果",
            "value": 14000
        },
        {
            "city": "无锡",
            "type": "米面",
            "value": 9000
        },
        {
            "city": "无锡",
            "type": "特产零食",
            "value": 10000
        },
        {
            "city": "无锡",
            "type": "茶叶",
            "value": 6000
        },
        {
            "city": "杭州",
            "type": "水果",
            "value": 9000
        },
        {
            "city": "杭州",
            "type": "米面",
            "value": 8500
        },
        {
            "city": "杭州",
            "type": "特产零食",
            "value": 10000
        },
        {
            "city": "杭州",
            "type": "茶叶",
            "value": 6000
        },
        {
            "city": "北京",
            "type": "水果",
            "value": 17000
        },
        {
            "city": "北京",
            "type": "米面",
            "value": 6000
        },
        {
            "city": "北京",
            "type": "特产零食",
            "value": 7000
        },
        {
            "city": "北京",
            "type": "茶叶",
            "value": 10000
        },
        {
            "city": "上海",
            "type": "水果",
            "value": 18000
        },
        {
            "city": "上海",
            "type": "米面",
            "value": 11000
        },
        {
            "city": "上海",
            "type": "特产零食",
            "value": 15000
        },
        {
            "city": "上海",
            "type": "茶叶",
            "value": 14000
        }
    ]
    const config = {
        data,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };

    return <Column {...config} />;
};
