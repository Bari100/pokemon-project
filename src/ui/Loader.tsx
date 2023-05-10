import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center fixed z-50 w-full h-full bg-white opacity-50'>
      <div
        className='h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-700 border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  )
}

export default Loader
