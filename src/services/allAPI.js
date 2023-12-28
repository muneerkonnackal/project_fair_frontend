import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"


//:Register API
export const registerAPI = async(user)=>{
 return   await commonAPI("POST",`${BASE_URL}/user/register`,user,"")

}


//:login api

export const loginAPI = async(user)=>{
   return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

//: addprojects API

export const addProjectsAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/projects/add`,reqBody,reqHeader)
}

//:home project api

export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/projects/home-project`)
}

//:all project api

export const allProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/projects/all-project?search=${searchKey}`,"",reqHeader)
}

//:user project api

export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/user-project`,"",reqHeader)
}


//: edit userproject
export const editUserProjectAPI = async(projectId,reqBody,reqHeader)=>{
    //:path parameter - :id - router
    return await commonAPI("PUT",`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

//: delete project api

export const deleteProjectAPI = async(projectId,reqHeader)=>{
    //:path parameter - :id - router
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}



//:1.path parameter
//:2.body parameter
//:3. query parameter : path?key=value ayit aanu query parameter ne pass cheyyka