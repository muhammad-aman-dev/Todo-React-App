import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-blue-700 text-gray-300 font-bold w-full h-[10vh] flex justify-between p-4'>
       <h2>Work Todo</h2>
       <ul className='flex list-none gap-4'>
        <li>Home</li>
        <li>About Us</li>
       </ul>
    </nav>
  )
}

export default navbar
