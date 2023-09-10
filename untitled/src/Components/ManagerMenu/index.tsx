import {Menu, MenuProps, theme} from "antd";
import React, {useState} from "react";
import {AppstoreOutlined, DesktopOutlined, PieChartOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate,useLocation} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];
//登錄請求到數據之後就可以跟items進行匹配
const items:MenuItem[]=[
    {
        label:'Problems',
        key:'/manage/problems',
        icon:<AppstoreOutlined />
    },
    {
        label:'Add Problem',
        key:'/manage/add-problem',
        icon:<PieChartOutlined/>
    },


]
const Comp: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const currentRoute = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigateTo = useNavigate()
    const menuClick = (e:{key:string}) => {
        console.log("點擊了菜單");
        //點擊需要跳轉  編程式導航
        navigateTo(e.key);
    }
    let firstOpenKey:string="";
    function findKey(obj:{key:string}){
        return obj.key===currentRoute.pathname
    }
    for(let i=0;i<items.length;i++){
        //判斷找到找不到
        // @ts-ignore
        if(items[i]!['children']  && items[i]!['children'].length>0&& items[i]!['children'].find(findKey)){
            firstOpenKey = items[i]!.key as string;
            break;
        }
    }

    //設置展開項的初始值
    const[openKeys,setOpenKeys] = useState([firstOpenKey]);
    const handleOpenchange = (keys:string[])=>{
        setOpenKeys([keys[keys.length-1]])
    }
    return ( <Menu theme="dark"
                   //表示當前樣式所在的選中項
                   defaultSelectedKeys={[currentRoute.pathname]}
                   mode="inline" items={items}
                   onClick={menuClick}
                   onOpenChange={handleOpenchange}
                   openKeys={openKeys}
    />)
}
export default Comp
