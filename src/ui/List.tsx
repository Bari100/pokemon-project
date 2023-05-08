import { FC, ReactNode } from 'react'

const List: FC<Props> = ({ children }) => {
  return (
    <>
      <ul role='list' className='divide-y divide-gray-100'>
        {children}
      </ul>
    </>
  )
}

export default List

interface Props {
  children: ReactNode
}
