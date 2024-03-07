import { commonAPI } from "./commonAPI";
import { baseUrl } from "./baseUrl";

//Actual Api Call

//1)Register APi Call
export const registerAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}


//2)Login API call -post body
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

//2)Add project API call post body+header (its bcz image is send with request,with any other uploaded content)
export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/project/add`,reqBody,reqHeader)
}

//3)get home projects API Call -get
export const getHomeProjectAPI=async()=>{
    return await commonAPI("get",`${baseUrl}/project/home-projects`,'','')
}
//4)get allprojects api

export const getAllProjectAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/project/all-projects?search=${searchKey}`,"",reqHeader)
}

//5)get All user projects to display in my projects component dashboard
export const getUserProjectsAPI=async(reqHeader)=>{
return await commonAPI("get",`${baseUrl}/project/all-user-projects`,"",reqHeader)
}

//6)Edit project
export const editUserProject=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/project/update-project/${projectId}`,reqBody,reqHeader)
}

//7)Delete Project
export const deleteProjectAPI=async(projectId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/project/delete-project/${projectId}`,{},reqHeader)
}