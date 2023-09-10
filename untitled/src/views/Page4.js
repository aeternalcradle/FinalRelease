import React, {useEffect, useState} from 'react';
import {Space, Table, Tag, Card} from 'antd';
import {UserProblem} from "../service/api/userAuthApi";
const App = () => {
    const [data, setData] = useState([]);
    const username = localStorage.getItem('username');
    if(username==undefined)username=localStorage.getItem('user2name');
    console.log(localStorage);
    useEffect(() => {
        UserProblem(username).then(res => {
            console.log(username);
            setData(res.data);
            console.log(data);
        });
    }, []);

    return (

        <Card className='card' title={<h4 style={{fontFamily: 'Arial', color: '#28f5dd'}}>已解答的题目列表</h4>}>
            <table className="table table-striped">
                <thead className="bg-dark text-white">
                <tr>
                    <th>ID</th>
                    <th>问题</th>
                    <td>难度</td>
                    <th>通过次数</th>
                    <th>提交次数</th>
                    <td>通过率</td>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr>
                        <td>{item.problem_id}</td>
                        <td>{item.title}</td>
                        <td>{item.level}</td>
                        <td>{item.pass_count}</td>
                        <td>{item.total_count}</td>
                        <td>{item.pass_rate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>
    )
};

export default App;
