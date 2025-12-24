import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const Cardd: React.FC = () => {
    const data = [
        { "name": "Tổng doanh thu", "value": 11, "type": true },
        { "name": "Số lượng bán Onl", "value": 9.3, "type": true },
        { "name": "Số lượng bán off", "value": 9.3, "type": false }
    ]
    return <>
        <h1 className='text-center'>Thông kê tháng</h1>
        < Row gutter={16} >
            {data.map((statistic) => {
                return <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title={statistic.name}
                            value={statistic.value}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            })}

        </Row >
    </>
};

export default Cardd;