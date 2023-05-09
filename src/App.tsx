import { useState } from 'react'
import { useGetPokemonsQuery } from '@redux/services/pokemonApi'
import { ItemData } from '@types'
import { DROPDOWN_OPTIONS, POKEMONS_FULL_AMOUNT } from './constants'
import ModalWrapper from '@components/ModalWrapper'
import Checkboxes from '@components/Checkboxes'
import ListItemsWrapper from '@components/ListItemsWrapper'
import PaginationWrapper from '@components/PaginationWrapper'
import List from '@ui/List'
import Dropdown from '@ui/Dropdown'
import ListItem from '@ui/ListItem'
import Modal from '@ui/Modal'
import DropdownItems from '@ui/DropdownItems'
import Search from '@ui/Search'
import './App.css'

function App() {
  const [open, setOpen] = useState(false)
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [id, setId] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [pageIndex, setPageIndex] = useState({ pageIndex: 0 })
  const setForcePage = (index: number) => {
    setOffset(index)
    setPageIndex({ pageIndex: index })
  }
  const { data, isLoading } = useGetPokemonsQuery({
    offset: offset.toString(),
    limit: itemsPerPage.toString(),
    types: pokemonTypes,
    searchValue: searchValue,
  })

  if (isLoading) return null

  const { pokemons, totalNumberOfPages, pokemonsAmount } = data || {}

  return (
    <>
      <Search
        setSearchValue={setSearchValue}
        onChange={() => {
          setForcePage(0)
        }}
        placeholder='Find pokemons by name'
        delay={1000}
      />
      <Checkboxes setTypes={setPokemonTypes} setForcePage={setForcePage} />
      <Dropdown title={`pokemons to show on the page: ${itemsPerPage}`}>
        <DropdownItems
          dropDownOptions={DROPDOWN_OPTIONS}
          onClick={option => {
            setItemsPerPage(option as number)
            setForcePage(0)
          }}
        />
      </Dropdown>
      <List>
        <ListItemsWrapper pokemonsData={pokemons}>
          {(data, id) => (
            <ListItem
              data={data}
              onClick={() => {
                setOpen(true)
                setId(id)
              }}
            />
          )}
        </ListItemsWrapper>
      </List>
      <ModalWrapper id={id} pokemonsData={pokemons}>
        {(data: ItemData) => <Modal setOpen={setOpen} open={open} data={data} />}
      </ModalWrapper>
      <PaginationWrapper
        setOffset={setOffset}
        itemsPerPage={itemsPerPage}
        itemsAmount={pokemonsAmount || POKEMONS_FULL_AMOUNT}
        totalNumberOfPages={totalNumberOfPages || 0}
        forcePage={pageIndex}
      />
    </>
  )
}

export default App
