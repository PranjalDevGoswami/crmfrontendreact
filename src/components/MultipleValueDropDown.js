import React from 'react'
import Select from 'react-select';

const MultipleValueDropDown = ({options}) => {

    
  return (
    <div>
  <Select>
    {options.map((value,index)=>{
      <option key={index}>{value}</option>
    })}
  </Select>
      
    </div>
  )
}

export default MultipleValueDropDown
