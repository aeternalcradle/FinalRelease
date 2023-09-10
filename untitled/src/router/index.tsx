import React,{lazy} from "react";
import Login from "../views/Login";
import Initial from "../views/initial";
import Index from "../views/Signup";
import About from "../views/About";
import Manage from "../views/manager/manage"
import Users from "../views/manager/users";
import Problems from "../views/manager/problems";
import Judge from "../views/judge";
import Error from "../views/error/error";
import ManagerLogin from "../views/ManagerLogin";
import ProblemList from "../views/problems/problemList";
import AddProblem from "../views/problems/addProblem";
import DoProblem from "../views/problems/doProblem";
import EditProblem from "../views/problems/editProblem";
const Home = lazy(()=>import("../views/Home"))
const Page1 = lazy(()=>import("../views/Page1"))
const Page2 = lazy(()=>import("../views/Page2"))
const Page3 = lazy(()=>import("../views/Page3"))
const Page4 = lazy(()=>import("../views/Page4"))

//懒加载的模式需要我們給他添加一個loading組件

const withLoadingComponent = (comp:JSX.Element) =>(
    <React.Suspense fallback={<div>loading...</div>}>
        {comp}
    </React.Suspense>
)

const routes =[


    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path: "/Page1",
                element: withLoadingComponent(<Page1/>)
            },
            {
                path: "/Page2",
                element: withLoadingComponent(<Page2/>)
            },
            {
                path: "/page3",
                element: withLoadingComponent(<Page3/>)
            },
            {
                path: "/page4",
                element: withLoadingComponent(<Page4/>)
            },
            {
                path:"/doproblem",
                element: <DoProblem/>
            },
            {
                path:"/about",
                element: <About/>
            },
        ]
    },
    {
        path: "*",
        element: withLoadingComponent(<Error/>)
    },
    {
        path: "/initial",
        element: <Initial />
    },

    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/managerlogin",
        element: <ManagerLogin />
    },
    {
        path: "/signup",
        element: <Index />
    },

    {
        path:"/judge",
        element: <Judge/>
    },
    {
        path:"/adminmanage",
        element: <ProblemList/>
    },
    {
        path:"/addproblem",
        element: <AddProblem/>
    },
    {
        path:"/manage",
        element: <Manage/>,
        children:[
            {
                path:"users",
                element: <Users/>
            },
            {
                path:"problems",
                element: <Problems/>
            },
            {
                path:"add-problem",
                element: <AddProblem/>
            },
            {
                path:"edit-problem",
                element: <EditProblem/>
            },
        ]
    }

]
export default routes
