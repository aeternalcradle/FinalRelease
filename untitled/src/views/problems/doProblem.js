import {Divider, Layout, notification, Space} from 'antd';
import React, {useState, useEffect, useMemo} from 'react';
import { Typography, Select, Button, Input, Row, Col  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'antd';
import CodeEditorWindow from "../../Judge/components/CodeEditorWindow";
import LanguagesDropdown from "../../Judge/components/LanguagesDropdown";
import ThemeDropdown from "../../Judge/components/ThemeDropdown";
import {languageOptions} from "../../Judge/constants/languageOptions";
import {defineTheme} from "../../Judge/lib/defineTheme";
import axios from "axios";
import OutputWindow from "../../Judge/components/OutputWindow";
import OutputDetails from "../../Judge/components/OutputDetails";
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Context = React.createContext({
    name: 'Default',
});

const { Header, Sider, Content } = Layout;


const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '50px',
    backgroundColor: '#ffffff',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '25px',
    color: '#fff',
    backgroundColor: '#ffffff',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#ffffff',

};
const App  = () => {
    const [language, setLanguage] = useState(languageOptions[0]);
    const onSelectChange = (sl) => {
        console.log("selected Option...", sl);
        setLanguage(sl);
    };
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [languageId, setLanguageId] = useState('');
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);
    const username = localStorage.getItem('username');
    const [theme, setTheme] = useState("cobalt");
    const [outputDetails, setOutputDetails] = useState(null);
    const isAccepted = result && (result.status.description === "Accepted"||result.status===3);
    const isFailed = result && (result.status.description !== "Accepted"||result.status===3) && result.status.description !== null;
    const [inputFormat,setInputFormat]=useState('');
    const [outputFormat,setOutputFormat]=useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const problemId = urlParams.get('id');
        console.log(problemId);
        fetch(`http://121.36.214.230:9000/oj/one?id=${problemId}`)
            .then(response => response.json())
            .then(data => {
                setId(data.id);
                setTitle(data.title);
                setDescription(data.description);
                setLevel(data.level||data.difficulty);
                setCode(data.templateCode);
                setInputFormat(data.inputFormat);
                setOutputFormat(data.outputFormat);
                setInputFormat(data.input_desc);
                setOutputFormat(data.output_desc);
            })
            .catch(error => console.error('Error fetching problem data:', error));
    }, []);
    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                console.log(code);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };
    function handleThemeChange(th) {
        const theme = th;
        console.log("theme...", theme);
        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }
    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);

    const handleSubmit = () => {

        const requestBody = {
            id:id,
            languageId: language.id,
            language_id: language.id,
            code: code,
            username:username,
            user_name: username,

        };
        console.log("requestbody is here",requestBody)
        fetch('http://121.36.214.230:9000/oj/compile', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setResult(data))
            .catch(error => console.error('Error compiling code:', error));


    };
    console.log(result);
    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: "http://121.36.214.230:2358/submissions/" + token + "?base64_encoded=false&fields=stdout,stderr,status_id,language_id,compile_output,message,status,time,memory",

        };
        try {
            let response = await axios.request(options);
            console.log("response.data", response.data);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);

            } else {
                setOutputDetails(response.data);
                console.log("response.data", response.data);
            }
        } catch (err) {
            console.log("err", err);
        }
        api.info({
            message: `结果`,
            description: <Context.Consumer>{({ name }) => `看看你的`}</Context.Consumer>,
        })
    };
    console.log(outputDetails);
    const handleCompile = () => {
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(code),
        };
        const options = {
            method: "POST",
            url: "http://121.36.214.230:2358/submissions/?base64_encoded=true&wait=false",

            headers: {

                "Content-Type": "application/json",
            },
            data: formData,
        };
        console.log("options", options);
        axios
            .request(options)

            .then(function (response) {
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                console.log(options);
            });
    };

    const [api, contextHolder] = notification.useNotification();
    const contextValue = useMemo(
        () => ({
            name: 'Ant Design',
        }),
        [],
    );
    console.log(result);
    return (
        <Card>
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Layout style={{ minHeight: '100vh' ,background: 'rgba(0, 0, 0, 0.5)'}}>
                    <Header style={headerStyle} >
                        <Title  level={3}>题目名称:{title}</Title>
                    </Header>
                    <Content style={contentStyle} >
                        <div>
                            <Card
                                title={<p style={{ color: '#00d8f6' }}> 问题描述:</p>}
                                className='card'
                                bordered={false}
                                style={{
                                    width: 370,
                                }}
                            >
                                <p>{description}</p>
                            </Card>
                            <Divider/>
                            <Card
                                // title="难度:"
                                title={<p style={{ color: '#00d8f6' }}> 难度:</p>}
                                className='card'
                                bordered={false}
                                style={{
                                    width: 370,
                                }}
                            >
                                <p>{level}</p>
                            </Card>
                            <Divider/>
                            <Card
                                title={<p style={{ color: '#00d8f6' }}> 输入描述:</p>}
                                className='card'
                                bordered={false}
                                style={{
                                    width: 370,
                                }}
                            >
                                <p>{inputFormat}</p>
                            </Card>
                            <Divider/>
                            <Card
                                title={<p style={{ color: '#00d8f6' }}> 输出描述:</p>}
                                className='card'
                                bordered={false}
                                style={{
                                    width: 370,
                                }}
                            >
                                <p>{outputFormat}</p>
                            </Card>
                        </div>
                    </Content>
                </Layout>
                <Sider style={siderStyle} width={670}>
                    <Col span={8}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div >
                                <Header style={headerStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ padding: '4px' }}>
                                            <LanguagesDropdown onSelectChange={onSelectChange} />
                                        </div>
                                        <div style={{ padding: '4px' }}>
                                            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                                        </div>
                                        <Divider type="vertical" />
                                            <Context.Provider value={contextValue}>
                                                {contextHolder}
                                            <Button style={{width:'80px',height:'50px'}} type="primary" onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                                <Divider type="vertical" />
                                                <Button  style={{width:'80px',height:'50px'}} type="primary" onClick={handleCompile}>
                                                    Compile
                                                </Button>
                                            </Context.Provider>

                                    </div>
                                </Header>
                            </div>

                        </div>

                    </Col>
                    <Row gutter={24} style={{ marginTop: '16px' }}>
                        <Col span={24}>
                            <Card
                                title={<p style={{ color: '#00d8f6' }}> 请输入代码:</p>}
                                className='card'
                                bordered={false}
                            >

                                <CodeEditorWindow
                                    code={code}
                                    onChange={onChange}
                                    language={language?.value}
                                    theme={theme.value}
                                />
                            </Card>
                        </Col>
                        <Divider/>
                        <Col span={12}>
                            {result && (
                                <div>
                                    <Card
                                        title={<p style={{ color: '#00d8f6' }}> Result:</p>}
                                        className='card'
                                        bordered={false}
                                    >
                                        <p>共通过 {result.nums} / {result.size} 组测试</p>
                                        <p>错误: {result.error}</p>
                                        <p>输出: {result.stdout}</p>
                                    </Card>
                                </div>
                            )}
                        </Col>
                        <Col span={12}>
                            {result && (
                                <div>
                                    <Card
                                        title={<p style={{ color: '#00d8f6' }}> Detail:</p>}
                                        className='card'
                                        bordered={false}
                                    >
                                        <p>Time: {result.time}</p>
                                        <p>Memory: {result.memory}</p>
                                        <p>编译结果: {result.status.description}</p>
                                    </Card>
                                </div>
                            )}
                        </Col>
                        <Col span={12}>{/* Add any additional components or information you want to display */}</Col>
                    </Row>
                    {isAccepted && <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />}
                    {isFailed && <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />}
                    {outputDetails && <Card className='card'>
                        <OutputWindow outputDetails={outputDetails} />
                        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                    </Card>}

                </Sider>
            </Layout>
        </Space>
        </Card>

    );
}

export default App;
