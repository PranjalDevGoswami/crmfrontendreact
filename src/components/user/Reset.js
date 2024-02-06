import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../InputField'
import Button from '../Button'


const Reset = () => {
  return (
    <div className="bg-[url('./assets/rm314-adj-02.jpg')] w-full h-screen bg-cover">
    <div className="flex items-center h-full">
      <div className="w-1/2 p-8 pl-8">
        <h2 className="text-4xl text-white ">Welcome To UNIMRKT</h2>
        <p className="text-xl text-white  py-4"> Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum</p>
      </div>
      <div className="w-1/2 ">
        <div className="w-2/3 h-1/3 border-black border rounded-lg shadow-gray-600 shadow-lg bg-white">
          <div className="flex flex-col gap-2 p-4">
            <h1 className="text-5xl underline p-8 ">Forgot Password</h1>
            <Input
              type={"email"}
              className={"p-4 border outline-none rounded-md focus:border-cyan-600"}
              required={"required"}
              placeholder={"userId or email address"}
            />
            <Button className={"p-4 bg-[#e7251e]"} name={"Reset"} />
            <div className="flex justify-center">
              <Link to='/login'>
              <Button className={"p-4 underline"} name={"Have a account? Login"} />
              </Link>
              <Link to='/register'>
                <Button className={"underline p-4 "} name={"Create Account"} />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Reset
