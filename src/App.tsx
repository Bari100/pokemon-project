import { useState } from 'react'
import { useGetPokemonsQuery } from '@redux/services/pokemonApi'
import { ItemData } from '@types'
import ModalWrapper from '@components/ModalWrapper'
import Checkboxes from '@components/Checkboxes'
import ListItemsWrapper from '@components/ListItemsWrapper'
import Pagination from '@components/Pagination'
import List from '@ui/List'
import Dropdown from '@ui/Dropdown'
import ListItem from '@ui/ListItem'
import Modal from '@ui/Modal'
import DropdownItems from '@ui/DropdownItems'
import Search from '@ui/Search'
import './App.css'

const pokemonsFullAmount = 1281
const dropDownOptions = [10, 20, 50]

function App() {
  const [open, setOpen] = useState(false)
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [id, setId] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
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
      <Search setSearchValue={setSearchValue} placeholder='find pokemon by name' delay={1000} />
      <Checkboxes setTypes={setPokemonTypes} />
      <Dropdown title={`pokemons to show on the page: ${itemsPerPage}`}>
        <DropdownItems
          dropDownOptions={dropDownOptions}
          onClick={option => {
            setItemsPerPage(option as number)
            setOffset(0)
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
      <Pagination
        setOffset={setOffset}
        itemsPerPage={itemsPerPage}
        itemsAmount={pokemonsAmount || pokemonsFullAmount}
        totalNumberOfPages={totalNumberOfPages || 0}
      />
    </>
  )
}

export default App
