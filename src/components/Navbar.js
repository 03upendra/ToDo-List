import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {

  return (
      <div className="flex justify-evenly items-center py-4 px-4 bg-gray-600">
        <h1 className="text-2xl text-white w-1/5 font-bold">My-ToDo</h1>

        <div className="w-3/5">
          <div className="mx-auto w-fit py-2 text-gray-200">

                <NavLink to='/'>
                    {({isActive})=>(
                       <span className={`text-blue-300 ${isActive?'border-b':''} mr-4 md:mr-10 hover:cursor-pointer hover:text-white`}>
                       Home
                       </span>
                    )}
                </NavLink>
            
                <NavLink to='/addTodo'>
                    {({isActive})=>(
                       <span className={`text-blue-300 ${isActive?'border-b':''} mr-6 hover:cursor-pointer hover:text-white`}>
                       Add Item
                       </span>
                    )}
                </NavLink>
          
          </div>
        </div>

        <div className="w-1/5">
         
            <h1 className="p-1 ml-auto w-fit text-white text font-bold">
               Upendra.B
            </h1>
        
        </div>
      </div>
  )
}

export default Navbar
