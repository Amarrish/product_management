import axios from 'axios'

export const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
  }

  try {
    const result = await axios(reqConfig)
    return result
  } catch (err) {
    // return the actual response object if available
    if (err.response) {
      return err.response
    } else {
      // handle other errors (network, timeout, etc.)
      return { status: 500, data: "Unexpected error. Please try again later." }
    }
  }
}

// import axios from 'axios'

// export const commonAPI = async (httpMethod,url,reqBody,reqHeader)=>{
//     let reqConfig={
//         method:httpMethod,
//         url,
//         data:reqBody,
//         headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
//     }
//     // console.log(reqConfig);
//     return await axios(reqConfig).then(
//         result=>{return result}
//     ).catch(err=>{return err}).catch
// }