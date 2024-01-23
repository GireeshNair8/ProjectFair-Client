import React, { createContext, useState } from 'react'
//create contextapi
export const addProjectResponseContext= createContext()

export const editProjectResponseContext= createContext()

export const isAuthTokenContext= createContext()
//children is a predefined prop used to share data between all components
function ContextShare({children}) {
    //data to share
    const[addProjectResponse, setAddProjectResponse]=  useState({})
    const[editProjectResponse, setEditProjectResponse]= useState({})
    const [isAuthToken, setIsAuthToken]= useState(true)
    return (
    <>
    {/*only provider can provide data and value attributes, is used to specify the data to share*/}
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
        <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
          <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
            {children}
            </isAuthTokenContext.Provider>

          </editProjectResponseContext.Provider>
       
    </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare