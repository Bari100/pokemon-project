import { useState, ChangeEvent } from 'react'
import ReactPaginate from 'react-paginate'
import { Menu } from '@headlessui/react'
import { useGetPokemonsQuery } from '@redux/services/pokemonApi'
import { PokemonsData } from '@types'
import List from '@components/List'
import ModalWrapper from '@components/ModalWrapper'
import Dropdown from '@components/Dropdown'
import useDebounce from '@hooks/useDebounce'
import ListItem from '@components/ListItem'
import Checkboxes from '@components/Checkboxes'
import './App.css'

const pokemonsFullAmount = 1281
const dropDownOptions = [10, 20, 50]

function App() {
  const [open, setOpen] = useState(false)
  const [types, setTypes] = useState([])
  const [id, setId] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce<string>(searchValue, 1000)
  const { data, isLoading } = useGetPokemonsQuery({
    offset: offset.toString(),
    limit: itemsPerPage.toString(),
    types,
    searchValue: debouncedSearchValue,
  })

  if (isLoading) return null
  const { pokemons, totalNumberOfPages, pokemonsAmount } = data || {}

  const handlePaginationChange = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % (pokemonsAmount || pokemonsFullAmount)
    setOffset(newOffset)
  }

  const dropdownItems = dropDownOptions.map(option => (
    <Menu.Item>
      <button
        onClick={() => {
          setItemsPerPage(option)
          setOffset(0)
        }}
        className='bg-gray-100 text-gray-900 block px-4 py-2 text-sm w-full'
      >
        {option}
      </button>
    </Menu.Item>
  ))

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <>
      <input
        type='search'
        name='search'
        value={searchValue}
        placeholder='find pokemon by name'
        onChange={handleSearch}
        className='bg-white text-blue-800 border-2 border-cyan-600 mb-10'
      />
      <Checkboxes setTypes={setTypes} />
      <Dropdown title={`pokemons to show on the page: ${itemsPerPage}`} items={dropdownItems} />
      <List>
        {pokemons?.map((pokemonData: PokemonsData) => {
          const { id, name, pokemonTypes, height, baseExperience, smAvatarUrl, avatarAlt } = pokemonData
          const listData = {
            title: name,
            text1: pokemonTypes,
            text2: height,
            text3: baseExperience,
            imageUrl: smAvatarUrl,
            imageAlt: avatarAlt,
          }
          return (
            <ListItem
              data={listData}
              onClick={() => {
                setOpen(true)
                setId(id)
              }}
            />
          )
        })}
        {open && <ModalWrapper id={id} setOpen={setOpen} open={open} data={pokemons} />}
      </List>
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
    </>
  )
}

export default App
