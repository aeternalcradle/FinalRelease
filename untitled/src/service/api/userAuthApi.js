import {deleteAction, getAction, postAction, putAction} from "./manage";

export const addUserAuth = (param) =>postAction("/userauth/add",param)

export const loginUserAuth = (param) =>postAction("/login",param)

export const managerLoginUserAuth = (param)=>postAction("/userauth/managerlogin",param)

export const registerUserAuth = (param)=>postAction("/register",param)

export const UserProblem = (param)=>postAction(`/oj/my/?user_name=${param}`)

export const EditProblem = (param)=>postAction(`/toUpdate/?id=${param}`)
