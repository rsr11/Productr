import React from 'react'




const Toaster = ({msg}) => {
  return (
    <span className='text-white bg-green-500 px-4 py-2' >
       {msg}
    </span>
  )
}

export default Toaster
