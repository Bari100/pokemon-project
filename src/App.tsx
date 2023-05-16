import { useCallback, useState } from 'react'
import { useGetPokemonsQuery } from '@redux/services/pokemonApi'
import { DROPDOWN_OPTIONS, FIRST_PAGE, POKEMONS_FULL_AMOUNT, ZERO_PAGES } from './constants'
import Checkboxes from '@components/Checkboxes'
import PaginationWrapper from '@components/PaginationWrapper'
import Dropdown from '@ui/Dropdown'
import DropdownItems from '@ui/DropdownItems'
import Search from '@ui/Search'
import Loader from '@ui/Loader'
import './App.css'
import { useAppSelector } from '@redux/hooks'
import PokemonsList from '@components/PokemonsList'
import { ItemsPerPage } from '@types'

function App() {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [offset, setOffset] = useState(FIRST_PAGE)
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(DROPDOWN_OPTIONS[0])
  const [searchValue, setSearchValue] = useState('')
  const [pageIndex, setPageIndex] = useState({ pageIndex: FIRST_PAGE })
  const setForcePage = useCallback((index: number) => {
    setOffset(index)
    setPageIndex({ pageIndex: index })
  }, [])
  const { data } = useGetPokemonsQuery({
    offset: offset.toString(),
    limit: itemsPerPage.toString(),
    types: pokemonTypes,
    searchValue: searchValue,
  })

  const handleSearchChange = useCallback(() => {
    setForcePage(FIRST_PAGE)
  }, [setForcePage])

  const handleDropdownItemsClick = (option: ItemsPerPage) => {
    setItemsPerPage(option)
    setForcePage(FIRST_PAGE)
  }

  const { loading } = useAppSelector(state => state.pokemonsStatus) || {}

  const { pokemons, totalNumberOfPages, pokemonsAmount } = data || {}

  return (
    <>
      {loading && <Loader />}
      <Search setSearchValue={setSearchValue} onChange={handleSearchChange} placeholder='Find pokemons by name' />
      <Checkboxes setTypes={setPokemonTypes} setForcePage={setForcePage} />
      <Dropdown title={`pokemons to show on the page: ${itemsPerPage}`}>
        <DropdownItems
          dropDownOptions={DROPDOWN_OPTIONS}
          onClick={handleDropdownItemsClick as (option: string | number) => void}
        />
      </Dropdown>
      <PokemonsList pokemons={pokemons} />
      <PaginationWrapper
        setOffset={setOffset}
        itemsPerPage={itemsPerPage}
        itemsAmount={pokemonsAmount || POKEMONS_FULL_AMOUNT}
        totalNumberOfPages={totalNumberOfPages || ZERO_PAGES}
        forcePage={pageIndex}
      />
    </>
  )
}

export default App
