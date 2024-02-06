import React from 'react'

const ProjectDetail = ({data}) => {
    console.log("data",data);
  return (
    <div className='border shadow-xl border-black w-11/12'>
        <table className='text-2xl  w-full shadow-black shadow'>
            <tbody>
            <tr className='bg-[#686868] text-left text-white'>
                <th className='p-2'>Project ID</th>
                <th className='p-2'>Project Name</th>
                <th className='p-2'>AM Name</th>
                <th className='p-2'>Client Name</th>
                <th className='p-2'>Start Date</th>
                <th className='p-2'>End Date</th>
            </tr>
            </tbody>
            <tbody>
                {
                    data.map((value,index)=>{
                        console.log("freshvalue",value.Project_id);
                       return( <tr key={index} className='border-b border-[#F66A3E]'>
                                    <td>{value.Project_id}</td>
                                    <td>{value.Project_Name}</td>
                                    <td>{value.Project_Type}</td>
                                    <td>{value.Client}</td>
                                    <td>{value.start_date}</td>
                                    <td>{value.end_data}</td>
                                </tr>
                            )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default ProjectDetail
