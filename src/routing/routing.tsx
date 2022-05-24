import { BrowserRouter, Routes, Route} from "react-router-dom";

import React from "react";
import  Register  from "../component/register/register";
import Login  from "../component/login/login";
import Dashboard from "../component/dashboard/Dashboard";
import { PrivateRoute } from "./privaterouting";
import { PublicRoutes } from "./publicrouting";
import Home from "../home/Home";



export const RouteLink= ()=>{


    const item = [
        {path:"/", Component:Login},
        {path:"/register", Component: Register},
        
        
    ]
    
    const item2 =[
        {path:"/dash/:chatID", Component:Dashboard},
        
        {path:"/home", Component:Home}
    ]
    
    return(
        <>
            <BrowserRouter>

                <Routes>
                {
                    item.map((item)=>{
                        return(<Route path={item.path} element= { <PublicRoutes Component={item.Component} />}/>)

                    })
                }

                {
                    item2.map((item)=>{
                        return(<Route path={item.path} element= { <PrivateRoute Component={item.Component} />}/>)
                    })
                }
               
                </Routes>

            </BrowserRouter>
        </>
    )
}