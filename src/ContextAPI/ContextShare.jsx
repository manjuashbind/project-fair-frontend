import React, { createContext, useState } from 'react'

//add project context
export const addProjectResponseContext= createContext()
//editcontext
export const editUserProjectResponseContext=createContext()

function ContextShare({children}) {

    const [addProjectRes,setAddProjectRes]=useState( "" )
    const [editUserProjectRes,setEditUserProjectRes]=useState("")


  return (
    // <> revove div
    <>
        <addProjectResponseContext.Provider value={{addProjectRes,setAddProjectRes}}>
        <editUserProjectResponseContext.Provider value = {{editUserProjectRes,setEditUserProjectRes}}>
        {children}
        </editUserProjectResponseContext.Provider>
        </addProjectResponseContext.Provider>

    </>
  )
}

export default ContextShare