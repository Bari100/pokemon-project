import React, { Dispatch, FC, SetStateAction } from 'react'
import Pagination from './Pagination'

const PaginationWrapper: FC<Props> = ({ setOffset, itemsPerPage, itemsAmount, totalNumberOfPages, forcePage }) => {
  const handlePaginationChange = (pageIndex: number) => {
    const newOffset = (pageIndex * itemsPerPage) % itemsAmount
    setOffset(newOffset)
  }

  return <Pagination pageCount={totalNumberOfPages} onClick={handlePaginationChange} forcePage={forcePage} />
}

export default PaginationWrapper

interface Props {
  setOffset: Dispatch<SetStateAction<number>>
  itemsPerPage: number
  itemsAmount: number
  totalNumberOfPages: number
  forcePage?: { pageIndex: number }
}
