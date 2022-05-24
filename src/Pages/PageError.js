import React from "react";
import {Link} from "react-router-dom"

export default function PageNotFound(){
    return(
        <>
        <h1>404 error</h1>
        <h1>Page not Found</h1>
        <Link to="/">Go back to Home</Link>
        </>
    )
}