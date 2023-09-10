import React, { useState, useEffect } from "react";
import {Button, Card, Col, Row} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const AddProblem = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [level, setLevel] = useState("");
    const [description, setDescription] = useState("");
    const [templateCode, setTemplateCode] = useState("");
    const [testCode, setTestCode] = useState("");
    const [input_desc,setInput_desc]=useState("");
    const [output_desc,setOutput_desc]=useState("");
    const [tag,setTag]=useState("");
    const [textAreas, setTextAreas] = useState([{ id: 1, value: '' }]);
    const [resultAreas, setResultAreas] = useState([{ id: 1, value: '' }]);
    const [test_in, setTest_in] = useState([]);
    const [test_out, setTest_out] = useState([]);

    useEffect(() => {
    }, []);
    const handleSubmit = (event) => {
        const inputData = textAreas.map((textarea) => textarea.value);
        setTest_in(inputData);
        const inputData0 = resultAreas.map((resultarea) => resultarea.value);
        setTest_out(inputData0);

        event.preventDefault();
        let problem = {
            id,
            title,
            level,
            description,
            templateCode,
            testCode,
            input_desc,
            output_desc,
            test_in,
            test_out,
            tag
        };
        console.log(problem);
        // Make your AJAX request here using a library like axios or fetch
        // Example using fetch:
        fetch("http://121.36.214.230:9000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(problem),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok !== 0) {
                    alert("新增成功");
                    setName(data.name);
                    window.location.href = "./problems";
                } else {
                    alert(data.reason);
                    return;
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    const addNewTextArea = () => {
        const newId = textAreas.length + 1;
        const newId0 = resultAreas.length + 1;
        const newTextArea = { id: newId, value: '' };
        const newResultArea = { id: newId0, value: '' };
        setTextAreas([...textAreas, newTextArea]);
        setResultAreas([...resultAreas,newResultArea]);
    };

    const removeLastTextArea = () => {
        if (textAreas.length > 1) {
            const updatedTextAreas = textAreas.slice(0, -1);
            const updatedResultAreas = resultAreas.slice(0, -1);
            setTextAreas(updatedTextAreas);
            setResultAreas(updatedResultAreas);

            const inputData = updatedTextAreas.map((textarea) => textarea.value);
            setTest_in(inputData);
            const inputData0 = updatedResultAreas.map((resultarea) => resultarea.value);
            setTest_out(inputData0);
        }
    };

    const handleTextAreaChange = (e, id) => {
        const { value } = e.target;
        const updatedTextAreas = textAreas.map((textarea) =>
            textarea.id === id ? { ...textarea, value } : textarea
        );
        setTextAreas(updatedTextAreas);

        const inputData = updatedTextAreas.map((textarea) => textarea.value);
        setTest_in(inputData);
    };
    const handleResultAreaChange = (e, id) => {
        const { value } = e.target;
        const updatedResultAreas = resultAreas.map((resultarea) =>
            resultarea.id === id ? { ...resultarea, value } : resultarea
        );
        setResultAreas(updatedResultAreas);
        const inputData0 = updatedResultAreas.map((resultarea) => resultarea.value);
        setTest_out(inputData0);
    };



    useEffect(() => {
    }, [test_in]);
    useEffect(() => {
    }, [test_out]);

    return (
        <div id="app">
            <div style={{marginLeft:"0px"}}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="题目id" bordered={false}>
                            <textarea
                                id="id"
                                type="text"
                                className="form-control"
                                rows="1"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            ></textarea>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="题目标题" bordered={false}>
                            <textarea
                                id="title"
                                className="form-control"
                                type="text"
                                rows="1"

                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            ></textarea>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="题目难易程度" bordered={false}>
                            <textarea
                                id="level"
                                className="form-control"
                                type="text"
                                rows="1"

                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                required
                            ></textarea>
                        </Card>
                    </Col>
                </Row>
            </div>
            <br />
            <div>
                <Card title="题目描述信息" bordered={false}>
                            <textarea
                                id="description"
                                className="form-control"
                                type="text"
                                rows="8"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                </Card>
            </div>
            <br />
            <div>
                <Card title="题目标签" bordered={false}>
                            <textarea
                                id="tag"
                                className="form-control"
                                type="text"
                                rows="8"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                required
                            ></textarea>
                </Card>
            </div>
            <br />
            <div>
                <Card title="题目模板代码" bordered={false}>
                            <textarea
                                id="templateCode"
                                className="form-control"
                                type="text"
                                rows="8"
                                value={templateCode}
                                onChange={(e) => setTemplateCode(e.target.value)}
                                required
                            ></textarea>
                </Card>
            </div>
            <br />
            <div>
                <Card title="测试代码" bordered={false}>
                            <textarea
                                id="testCode"
                                type="text"
                                rows="8"
                                value={testCode}
                                className="form-control"
                                onChange={(e) => setTestCode(e.target.value)}
                                required
                            ></textarea>
                </Card>
            </div>
            <div>

                <Card title="输入格式" bordered={false}>
                            <textarea
                                id="inputFormat"
                                type="text"
                                rows="8"
                                value={input_desc}
                                className="form-control"
                                onChange={(e) => setInput_desc(e.target.value)}
                                required
                            ></textarea>
                </Card>
            </div>
            <div>

                <Card title="输出格式" bordered={false}>
                            <textarea
                                id="outputFormat"
                                type="text"
                                rows="8"
                                value={output_desc}
                                className="form-control"
                                onChange={(e) => setOutput_desc(e.target.value)}
                                required
                            ></textarea>
                </Card>
            </div>
            <br />
            <Row gutter={24}>
            <Col span={12}>
            <div>
                <Card title="测试用例" bordered={false}>
                    {textAreas.map((textarea) => (
                        <textarea
                            key={textarea.id}
                            className="form-control"
                            type="text"
                            rows="2"
                            value={textarea.value}
                            onChange={(e) => handleTextAreaChange(e, textarea.id)}
                            required
                        />
                    ))}
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={addNewTextArea}
                            style={{ marginRight: '10px' }}
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<MinusOutlined />}
                            onClick={removeLastTextArea}
                            disabled={textAreas.length === 1}
                        />
                    </div>
                </Card>
            </div>
            </Col>
            <Col span={12}>
            <div>
                <Card title="预期结果" bordered={false}>
                    {resultAreas.map((resultarea) => (
                        <textarea
                            key={resultarea.id}
                            className="form-control"
                            type="text"
                            rows="2"
                            value={resultarea.value}
                            onChange={(e) => handleResultAreaChange(e, resultarea.id)}
                            required
                        />
                    ))}
                </Card>
            </div>
            </Col>
            </Row>
            <br />
            <br />
            <div>
                <Button
                    type={"primary"}
                    style={{ background: "#2ff3cf" }}
                    onClick={handleSubmit}
                >
                    添加
                </Button>
            </div>
        </div>
    );
};

export default AddProblem;
