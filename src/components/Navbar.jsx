import React from 'react'

const Navbar = () => {
  return (<>
  
    <nav className= 'border-b border-sky-900 flex justify-between px-4 h-24 items-center' >
        <div className='logo font-bold'>PassOP</div>
      <ul>
        <li className='flex gap-4' >
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Share</a>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default Navbar
