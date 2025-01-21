import React from "react";
import { useState } from "react";
import Label from "./Label";
import Input from "./InputField";
import Button from "./Button";

const CRM = () =>{

const [ProjectName,setProjectName] = useState('');
const [open,IsOpen] = useState(true);

const handleInputChange = (e) =>{
    setProjectName(e.target.value)
}
const ProjectNameSubmitHandler = () =>{
    console.log("ProjectName",ProjectName);
    IsOpen(!open)
 
}

    return(
        <div>
   
    <Button className={`bg-green-400 ${!open ? 'khula' : 'nikhula'}`} name={'submit'} onClick={ProjectNameSubmitHandler}/>
    <div class="group">
  <button class="bg-blue-500 hover:bg-blue-700 transition duration-300">Click me</button>
  <div class="hidden group-hover:block">
    {/* <!-- This content will be visible when the parent has the 'group-hover' state --> */}
    Additional content on hover
  </div>
</div>

        </div>
    )
}
export default CRM;