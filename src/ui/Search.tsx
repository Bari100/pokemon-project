import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import useDebounce from '@hooks/useDebounce'

const Search: FC<Props> = ({ setSearchValue, onChange, placeholder, delay = 500 }) => {
  const [value, setValue] = useState('')
  const debouncedSearchValue = useDebounce<string>(value, delay)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setValue(value)
  }

  useEffect(() => {
    setSearchValue(debouncedSearchValue)
  }, [debouncedSearchValue, setSearchValue])

  return (
    <input
      type='search'
      name='search'
      value={value}
      placeholder={placeholder}
      onChange={e => {
        handleSearch(e)
        onChange && onChange()
      }}
      className='bg-white text-blue-800 border-2 border-cyan-600 mb-10'
    />
  )
}

export default Search

interface Props {
  setSearchValue: Dispatch<SetStateAction<string>>
  placeholder: string
  delay?: number
  onChange?: () => void
}
