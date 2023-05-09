import { FC, useCallback, useEffect, useState } from 'react'

const Button: FC<ButtonProps> = ({ content, onClick, active }) => {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? 'bg-red-500 text-white' : 'bg-white text-red-500'}
	      hover:bg-red-500 hover:text-white`}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

const PaginationNav: FC<PaginationNavProps> = ({ gotoPage, pageCount, pageIndex }) => {
  const lastPageIndex = pageCount - 1
  const penultPageIndex = pageCount - 2
  const pageIndexIsNot = (pageIndex: number, ...indexes: number[]) => indexes.every(index => pageIndex !== index)
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null
    const visiblePageButtonCount = 3
    let numberOfButtons = pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount
    const pageIndices = [pageIndex]
    numberOfButtons--
    ;[...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1
      if (pageNumberBefore >= 0 && (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)) {
        pageIndices.unshift(pageNumberBefore)
      } else {
        pageIndices.push(pageNumberAfter)
      }
    })
    return pageIndices.map(pageIndexToMap => (
      <li key={pageIndexToMap}>
        <Button
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ))
  }, [gotoPage, pageCount, pageIndex])

  return (
    <ul className='flex gap-2'>
      {pageIndexIsNot(pageIndex, 0, 1) && (
        <>
          <li>
            <Button content={1} onClick={() => gotoPage(0)} />
          </li>
          {pageIndexIsNot(pageIndex, 2) && <li className='text-red-300'>...</li>}
        </>
      )}
      {renderPageLinks()}
      {pageIndexIsNot(pageIndex, lastPageIndex, penultPageIndex) && (
        <>
          {pageIndexIsNot(pageIndex, penultPageIndex - 1) && <li className='text-red-300'>...</li>}
          <li>
            <Button content={pageCount} onClick={() => gotoPage(pageCount - 1)} />
          </li>
        </>
      )}
    </ul>
  )
}

const Pagination: FC<PaginationProps> = ({ pageCount, onClick, forcePage }) => {
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    if (!forcePage) return

    setPageIndex(forcePage.pageIndex)
  }, [forcePage])

  return (
    <div className='flex justify-center gap-3 flex-wrap p-6 py-12'>
      <PaginationNav
        gotoPage={index => {
          setPageIndex(index)
          onClick(index)
        }}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < pageCount - 1}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </div>
  )
}

export default Pagination

interface ButtonProps {
  content: string | number
  onClick: () => void
  active?: boolean
}

interface PaginationNavProps {
  gotoPage: (index: number) => void
  canPreviousPage: boolean
  canNextPage: boolean
  pageCount: number
  pageIndex: number
}

interface PaginationProps {
  pageCount: number
  onClick: (index: number) => void
  forcePage?: { pageIndex: number }
}
