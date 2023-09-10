import React, { useEffect, useState } from 'react';
import { Carousel, Input, message, Space, Tag } from 'antd';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import ca1 from "../resources/ca1.jpg";
import ca2 from "../resources/ca2.jpg";
import ca3 from "../resources/ca3.jpg";
import ca4 from "../resources/ca4.jpg";
import Title from 'antd/es/skeleton/Title';
import {NumberOutlined, QuestionCircleOutlined, RiseOutlined} from "@ant-design/icons";
import Table, { ColumnsType } from 'antd/es/table';

const { Meta } = Card;
const { Search } = Input;
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

interface RankData {
    user_name: string;
    pass_count_records: number;
    username:string;
    totalnum:number;
}



const BookDisplayPage: React.FC = () => {


    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    const [rankData, setRankData] = useState<RankData[]>([]);

    useEffect(() => {
        fetch('http://121.36.214.230:9000/rank')
            .then(response => response.json())
            .then((data: RankData[]) => setRankData(data))
            .catch(error => console.error('Error fetching rank data:', error));
    }, []);

    // 对排行榜数据进行排序
    const sortedRankData = rankData.sort((a, b) => b.pass_count_records - a.pass_count_records);

    return (
        <div>
            <Space direction="vertical" size={16} >
                <Card title={<h3 style={{ fontFamily: 'Arial', color: '#00d8f6' }}>欢迎使用FOJ</h3>} style={{ width: 800 }}>
                    <Carousel afterChange={onChange} autoplay>
                        <div>
                            <img src={ca1} alt="Image" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div>
                            <img src={ca2} alt="Image" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div>
                            <img src={ca3} alt="Image" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div>
                            <img src={ca4} alt="Image" style={{ width: '100%', height: 'auto' }} />
                        </div>
                    </Carousel>
                </Card>
                <Card className='card' title={<h4 style={{ fontFamily: 'Arial', color: '#81ec3a' }}><NumberOutlined /> 公告</h4>} style={{ width: 800 }}>
                   111
                </Card>
                <Card className='card'>
                    <h3>排行榜</h3>
                    <table className="table table-striped" >
                        <thead className="bg-dark text-white">
                        <tr>
                            <th>排名</th>
                            <th>用户名</th>
                            <th>通过题目数</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedRankData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* 显示排名 */}
                                <td>{item.user_name||item.username}</td>
                                <td>{item.pass_count_records||item.totalnum}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Card>
            </Space>
        </div>
    );
};

export default BookDisplayPage;
