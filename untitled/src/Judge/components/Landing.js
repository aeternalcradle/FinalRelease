import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import {Button, Card, Input, Layout} from 'antd';
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;
const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 85,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#FFFFFF',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
};

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [expectedOutput, setexpectedOutput] = useState("");
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: (code),
      stdin: (customInput),
      expected_output: (expectedOutput),
    };
    const options = {
      method: "POST",
      url: "http://121.36.214.230:2358/submissions/?base64_encoded=false&wait=false",

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
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

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
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
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

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const { TextArea } = Input;

  // @ts-ignore
  return (
    <>
      <Layout>
        <Header style={headerStyle}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ padding: '4px' }}>
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
            <div style={{ padding: '4px' }}>
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>
          </div>
        </Header>
        <Layout hasSider>
          <Content style={contentStyle}>
            <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
            />
          </Content>

          <Sider style={siderStyle} width={450}>
            <div className="right-container flex flex-shrink-0 w-1/3 flex-col">
              <div>

                <Button
                    type={"primary"}
                    onClick={handleCompile}
                    disabled={!code}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </Button>
              </div>

              <OutputWindow outputDetails={outputDetails} />
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
              {/*{ <OutputDetails outputDetails={outputDetails} />}*/}
            </div>

          </Sider>
        </Layout>
      </Layout>

    </>
  );
};
export default Landing;
