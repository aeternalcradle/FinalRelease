import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Space, Tag, Table, Pagination} from 'antd';
const AdminManage = () => {
    const [problems, setProblems] = useState([]);

    const getProblems = () => {
        const name = localStorage.getItem("username");
        console.log("name"+name);
        if(name !=null){
            axios
                // .post(`http://121.36.214.230:9000/all?page=${currentPage}&limit=${itemsPerPage}`)
                .post(`http://121.36.214.230:9000/all`)
                .then(response => {
                    setProblems(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('获取题目列表请求出错:', error);
                });
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render:(_,{id})=>(
                <a
                    style={{ color: '#1ce47d' }}
                    onClick={() => handleChange1(id)}
                >
                    {id}
                </a>
            )
        },
        {
            title: '题目',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: '难度',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: 'tags',
            render: (_, { tag }) => (
                <>
                    <Space size={[0, 8]} wrap>
                        {tag && tag.split(" ").map((tag, index) => (
                            <Tag color="#f50000" key={index}>
                                {tag}
                            </Tag>
                        ))}
                    </Space>
                </>
            ),
        },

    ];
    const handleChange1 = id => {
        console.log('题目ID:', id);
        const params = {
            id: id
        };
        window.filter = params;
        window.open(`/doproblem?id=${id}`);
    };

    useEffect(() => {
        getProblems();
    }, []);

    return (
        <div>
            <div id="app">
                <div>
                    <Card>
                        <h3 style={{ color: '#00d8f6' }}>题目列表</h3>
                        <Table columns={columns} dataSource={problems} />
                    </Card>
                </div>


            </div>
        </div>
    );
};

export default AdminManage;
