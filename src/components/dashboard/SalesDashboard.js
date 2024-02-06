import React, { useState } from 'react'
import Sidebar from '../SideBar'
import { FaRegUserCircle } from "react-icons/fa";
import Input from '../InputField';
import ProjectDetail from '../ProjectDetail.js';
import Button from '../Button.js';
import Form from '../project/Form.js';

const SalesDashboard = () => {
  const [isAddProjectOpen,setIsAddProjectOpen] = useState(false)
  const [formDataList, setFormDataList] = useState([]);

  const AddProjectHandler = () =>{
    setIsAddProjectOpen(true)
  }
  const handleFormSubmit = (formData) => {
    console.log("formDataformDataformDataformData",formData);
    setFormDataList([...formDataList, formData]);
    setIsAddProjectOpen(false)
  };
  
  return (
    <div className='flex bg-[#d9d9d9]'>
      <div className=''>
      <Sidebar />
      </div>
        <div className='w-full'>
          <div className='flex justify-between w-full h-24 p-4 border-b-2 border-[#F66A3E] bg-white'>
            <div className='w-10/12'>
           
            </div>
            <div className='w-2/12'>
              <FaRegUserCircle className='text-4xl'/>
            </div>
          </div>
          <div className=''>
            <div className='flex justify-around mt-8 mb-8'>
            <div className='w-2/3'>
            <Input type={'text'} className={'p-4 w-11/12'} placeholder={'search project'}/>
            <Input type={'submit'} className={'p-4 cursor-pointer rounded-r-xl text-white'} placeholder={'Search'}/>
            </div>
            <div className='flex justify-around'>
            <Button name={'Add Project'} onClick={AddProjectHandler} />
            {isAddProjectOpen?<div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-9/12 h-4/5 overflow-y-scroll'><Form onSubmit={handleFormSubmit}/></div>:''}
            </div>
            </div>
            <ProjectDetail data={formDataList}/>
          </div>
    </div>
    </div>
  )
}

export default SalesDashboard
