import React from 'react'
import {assets} from '../assets/admin_assets/assets.js'

const Navbar = ({setToken}) => {
   
  return (
    <div className='flex justify-between items-center  px-[4%] py-2'>
      <img className='w-40' src={assets.logo} alt="logo" />
      <button onClick={()=>setToken('')} className='bg-black text-white px-5 sm:px-7 py-2 rounded-full text-sm sm:text-lg'>Logout</button>
    </div>
  )
}

export default Navbar
