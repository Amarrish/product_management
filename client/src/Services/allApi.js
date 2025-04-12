import { BASEURL } from "./baseUrl";
import { commonAPI } from "./commonApi";

// register
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASEURL}/user/register`,user,"")
}

// loginapi
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${BASEURL}/user/login`,user,"")
}

// AddprojectAPI
export const addprojectAPI = async (project,header)=>{
    return await commonAPI("POST",`${BASEURL}/user/addproduct`,project,header)
}

// userProducts
export const userProductAPI = async (header)=>{
    return await commonAPI("GET",`${BASEURL}/user/getall`,"",header)
}

// delete product
export const deleteproductAPI = async (productId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASEURL}/product/delete/${productId}`,{},reqHeader)
}


// Update Product API
export const updateproductAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASEURL}/product/edit/${id}`, reqBody, reqHeader);
  }