import React from "react";
import template0 from "./images/template0.webp";
import { useHistory } from "react-router-dom";
import "./input.css";

const Template = () =>{
    const history = useHistory();
    const createFrom = ()=>{
        history.push("/form/");
    }
    return(
        <div className="bg-violet-300 h-screen">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <div className="bg-blue-500 text-white p-4 mb-4">
                    <span className="text-lg">Start a New Form</span>
                </div> 
            </div>
            <div className="flex flex-wrap items-center max-w-screen-xl mx-auto space-x-10">
                <div>
                    <img src={template0} onClick={createFrom} className="w-52 h-52 hover:border border-black"/>
                    <span>Blank</span>
                </div>
            </div>
        </div>
    )
};

export default Template;