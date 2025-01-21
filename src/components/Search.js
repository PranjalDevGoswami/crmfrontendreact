import React from 'react'
import Input from './InputField'
import Button from './Button'


const Search = () => {
  return (
    <div>
      <Input type={'text'} className='p-4 border border-black'  />
      <Button name='Search' className='bg-green-400 p-4' />
    </div>
  )
}

export default Search
