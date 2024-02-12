import React from 'react'
import Input from './InputField'
import Button from './Button'

const AddClient = () => {
  return (
    <div className='p-8' >
    <div className='flex flex-wrap gap-4'>
      <Input type={'text'} className={'p-4 w-[45%]'} placeholder={'Client Name'} required />
      <Input type={'text'} className={'p-4 w-[45%]'} placeholder={'Address'} />
      <Input type={'text'} className={'p-4 w-[45%]'} placeholder={'City'} required />
      <Input type={'text'} className={'p-4 w-[45%]'} placeholder={'Country'} required />
      <Input type={'number'} className={'p-4 w-[45%]'} placeholder={'Phone number'} required />
      <Input type={'text'} className={'p-4 w-[45%]'} placeholder={'Contact Person'} required />
      </div>
      <Button name={'Add Client'} className={'bg-yellow-200 p-4 rounded mt-4 w-[92%]'}/>
    </div>
  )
}

export default AddClient
