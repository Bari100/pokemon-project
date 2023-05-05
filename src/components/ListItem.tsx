import React from 'react'

export default function ListItem({ data, onClick }) {
  const { title, text1, text2, text3, imageUrl, imageAlt } = data

  return (
    <li
      key={title}
      onClick={onClick}
      className='flex justify-between gap-x-6 p-5 rounded-md cursor-pointer hover:bg-yellow-50'
    >
      <div className='flex gap-x-4'>
        <img className='h-12 w-12 flex-none rounded-full bg-gray-50' src={imageUrl} alt={imageAlt} />
        <div className='min-w-0 flex-auto'>
          <p className='text-sm font-semibold leading-6 text-gray-900'>{title}</p>
          <p className='mt-1 truncate text-xs leading-5 text-gray-500'>{text1}</p>
        </div>
      </div>
      <div className='hidden sm:flex sm:flex-col sm:items-end'>
        <p className='text-sm leading-6 text-gray-900'>height: {text2}</p>
        <div className='mt-1 flex items-center gap-x-1.5'>
          <p className='text-xs leading-5 text-gray-500'>Base experience: {text3}</p>
        </div>
      </div>
    </li>
  )
}
