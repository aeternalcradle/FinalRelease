import React, { useState, useEffect } from 'react';

const ProblemDetails = () => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const [testIns, setTestIns] = useState([]);
    const [testOuts, setTestOuts] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const problemId = urlParams.get('id');
        console.log(problemId);
        fetch(`http://localhost:9000/oj/one?id=${problemId}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setLevel(data.level || data.difficulty);
                setDescription(data.description);
                setTestIns(data.test_ins);
                setTestOuts(data.test_outs);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log("sadasdasda",testIns);
    }, []);

    return (
        <div>
            <h2>{title}</h2>
            <p>Level: {level}</p>
            <p>Description: {description}</p>
            <h3>Test Cases</h3>
            <table>
                <thead>
                <tr>
                    <th>Input</th>
                    <th>Output</th>
                </tr>
                </thead>
                <tbody>
                {testIns.map((testInsItem, index) => (
                    <tr key={index}>
                        <td>{testInsItem}</td>
                        <td>{testOuts[index]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProblemDetails;
