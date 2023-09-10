import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Divider, Modal, Space, Tag} from 'antd';
const AdminManage = () => {
    const [name, setName] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // 新增 deleteId 状态
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const logout = () => {
        localStorage.removeItem('username'); // 清除 session
        window.location.href = 'http://121.36.214.230:3000/initial'; // 重定向到指定页面
    };

    const getProblems = () => {
        const name = localStorage.getItem("username");
        console.log("username"+name);
        if(name !=null){
        axios
            .post('http://121.36.214.230:9000/all')
            .then(response => {

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentPageProblems = response.data.slice(startIndex, endIndex);

                setProblems(currentPageProblems);
                console.log(response.data);
            })
            .catch(error => {
                console.error('获取题目列表请求出错:', error);
            });
        }
    };

    const handleDelete = id => {
        showModal();
        setDeleteId(id); // 设置 deleteId 的值为要删除的题目的 ID
    };

    const deleteProblem = () => {
        console.log(deleteId);
        axios
            .post(`http://121.36.214.230:9000/delete?id=${deleteId}`) // 使用 deleteId 发送删除请求
            .then(response => {
                if (response.data.ok === 1||response.data===true) {
                    setShowDelete(false);
                    setDeleteId(null); // 清空 deleteId
                    getProblems();
                }
                console.log("返回");
                console.log(response.data.reason);
            })
            .catch(error => {
                console.error('删除题目请求出错:', error);
            });
    };

    const cancelDelete = () => {
        setShowDelete(false);
        setDeleteId(null); // 清空 deleteId
    };

    const handleChange1 = id => {
        console.log('题目ID:', id);
        const params = {
            id: id
        };
        window.filter = params;
        window.open(`/doproblem?id=${id}`);
    };

    const handleChange2 = id => {
        console.log('题目ID:', id);
        const params = {
            id: id
        };
        window.filter = params;
        window.open(`/manage/edit-problem?id=${id}`);
    };

    useEffect(() => {
        getProblems();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        deleteProblem();
    };
    useEffect(() => {
        getProblems();
    }, [currentPage]);

    const handleCancel = () => {
        setIsModalOpen(false);
        cancelDelete();
    };
    return (
        <div>
            <div id="app">
                <div>
                    <Card>
                        <h3 style={{ color: '#00d8f6' }}>题目列表</h3>
                    <table className="table table-striped" >
                        <thead className="bg-dark text-white">
                        <tr>
                            <th>ID</th>
                            <th>题目</th>
                            <th>难度</th>
                            <th>修改</th>
                            <th>标签</th>
                            <th>删除</th>
                        </tr>
                        </thead>
                        <tbody>
                        {problems.map(problem => (
                            <tr key={problem.id}>
                                <td>{problem.id}</td>
                                <td>
                                    <a
                                        style={{ color: '#1ce47d' }}
                                        onClick={() => handleChange1(problem.id)}
                                    >
                                        {problem.title}
                                    </a>
                                </td>
                                <td>{problem.level||problem.difficulty}</td>
                                <td>
                                    <a
                                        style={{ color: 'blue' }}
                                        onClick={() => handleChange2(problem.id)}
                                    >
                                        修改  {problem.title}
                                    </a>
                                </td>
                                <td>
                                    <Space size={[0, 8]} wrap>
                                        {problem.tag && problem.tag.split(" ").map((tag, index) => (
                                            <Tag color="#f50000" key={index}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </Space>
                                </td>
                                <td>
                                    <a
                                        style={{ color: 'darkred' }}
                                        onClick={() => handleDelete(problem.id)}
                                    >
                                        删除  {problem.title}
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <div className="pagination-container">
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                上一页
                            </button>
                            <button onClick={() => setCurrentPage(currentPage + 1)} >
                                下一页
                            </button>
                        </div>

                    </table>
                    </Card>
                </div>
                    <div>
                        <Modal title="亻 尔 女 子，我是一个提示框" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <p>确认删除题目: {problems.find(problem => problem.id === deleteId)?.title}?</p>
                        </Modal>
                    </div>

            </div>
        </div>
    );
};

export default AdminManage;
