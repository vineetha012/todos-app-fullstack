import React, { createContext, useState } from "react";
export const   RegLogcontext=createContext()
export const RegLogcontextProvider=({children})=>{
    const [token,setToken]=useState(null)
    const [isauthentiacated,setisauthenticated]=useState(false)
    return(
        <RegLogcontext.Provider value={{token,setToken,isauthentiacated,setisauthenticated}}>
            {children}
        </RegLogcontext.Provider>
    )
}
