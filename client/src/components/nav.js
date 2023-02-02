import React from "react";
export const Nav=({username})=>{
    return(
        <div className="Nav">
            <div style={{color:'rgb(9, 163, 145)',fontSize:"20px"}}>User Name: {username}</div>
        </div>
    )
}