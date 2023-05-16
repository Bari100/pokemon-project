import { useState } from 'react'
import { useGetPokemonsQuery } from '@redux/services/pokemonApi'
import { DROPDOWN_OPTIONS, POKEMONS_FULL_AMOUNT } from './constants'
import Checkboxes from '@components/Checkboxes'
import PaginationWrapper from '@components/PaginationWrapper'
import Dropdown from '@ui/Dropdown'
import DropdownItems from '@ui/DropdownItems'
import Search from '@ui/Search'
import Loader from '@ui/Loader'
import './App.css'
import { useAppSelector } from '@redux/hooks'
import PokemonsList from '@components/PokemonsList'

function App() {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [offset, setOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [pageIndex, setPageIndex] = useState({ pageIndex: 0 })
  const setForcePage = (index: number) => {
    setOffset(index)
    setPageIndex({ pageIndex: index })
  }
  const { data } = useGetPokemonsQuery({
    offset: offset.toString(),
    limit: itemsPerPage.toString(),
    types: pokemonTypes,
    searchValue: searchValue,
  })

  const { loading } = useAppSelector(state => state.pokemonsStatus) || {}

  const { pokemons, totalNumberOfPages, pokemonsAmount } = data || {}

  return (
    <>
      {loading && <Loader />}
      <Search
        setSearchValue={setSearchValue}
        onChange={() => {
          setForcePage(0)
        }}
        placeholder='Find pokemons by name'
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
      <PokemonsList pokemons={pokemons} />
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
