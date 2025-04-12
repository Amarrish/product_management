import React, { createContext, useState } from 'react'

export const addproductResponseContext = createContext();
export const editproductResponseContext = createContext();

const Contextshare = ({ children }) => {
  const [addproductResponse, setAddproductResponce] = useState({})
  const [editproductResponse, setEditProductResponse] = useState({})

  return (
    <addproductResponseContext.Provider value={{ addproductResponse, setAddproductResponce }}>
      <editproductResponseContext.Provider value={{ editproductResponse, setEditProductResponse }}>
        {children}
      </editproductResponseContext.Provider>
    </addproductResponseContext.Provider>
  )
}

export default Contextshare;








