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
   
    if (err.response) {
      return err.response
    } else {
      /
      return { status: 500, data: "Unexpected error. Please try again later." }
    }
  }
}

