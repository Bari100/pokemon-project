import React, { Dispatch, FC, SetStateAction } from 'react'
import ReactPaginate from 'react-paginate'

const Pagination: FC<Props> = ({ setOffset, itemsPerPage, itemsAmount, totalNumberOfPages }) => {
  const handlePaginationChange = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % itemsAmount
    setOffset(newOffset)
  }

  return (
    <ReactPaginate
      breakLabel='..'
      nextLabel='>'
      onPageChange={handlePaginationChange}
      pageRangeDisplayed={2}
      pageCount={totalNumberOfPages || 0}
      previousLabel='<'
      renderOnZeroPageCount={null}
      activeClassName='bg-black'
      containerClassName='flex justify-center gap-1 m-auto'
    />
  )
}

export default Pagination

interface Props {
  setOffset: Dispatch<SetStateAction<number>>
  itemsPerPage: number
  itemsAmount: number
  totalNumberOfPages: number
}
