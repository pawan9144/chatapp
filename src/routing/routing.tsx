import { BrowserRouter, Routes, Route} from "react-router-dom";

import React, { useState } from "react";
import  Register  from "../component/register/register";
import Login  from "../component/login/login";
import Dashboard from "../component/dashboard/Dashboard";
import { PrivateRoute } from "./privaterouting";
import { PublicRoutes } from "./publicrouting";
import Home from "../home/Home";

interface Iitem {
    path: string;
    Component: () => JSX.Element;
}


export const RouteLink= ()=>{

    const [refresh,setRefresh] = useState<Number>(0);


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
                    item.map((item:any)=>{
                        return(<Route path={item.path} key={item.path} element= { <PublicRoutes refresh={refresh} Component={<item.Component refresh={setRefresh}/>} />}/>)

                    })
                }

                {
                    item2.map((item:any)=>{
                        return(<Route path={item.path } key={item.path} element= { <PrivateRoute Component={item.Component} />}/>)
                    })
                }
               
                </Routes>

            </BrowserRouter>
        </>
    )
}