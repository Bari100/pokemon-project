import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { findByString } from '@utils/findByString'

const POKEAPI = 'https://pokeapi.co/api/v2/'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: POKEAPI }),
  endpoints: builder => ({
    getPokemons: builder.query({
      queryFn: async (arg, _api, _extraOptions, fetchWithBQ) => {
        const { offset, limit, types, searchValue } = arg

        const getPokemonsLength = fetchWithBQ(`pokemon/?limit=1`)
        const { data: pokemonsLength } = await getPokemonsLength
        const { count: pokemonsFullAmount } = pokemonsLength
        let totalNumberOfPages = null
        let pokemonsAmount = pokemonsFullAmount

        const getPokemonNames = async () => {
          if (!searchValue && !types.length) {
            const getPokemons = fetchWithBQ(`pokemon/?offset=${offset}&limit=${limit}`)
            const { data: pokemons } = await getPokemons
            const { results: pokemonsResult } = pokemons
            const pokemonNames = pokemonsResult.map(({ name }) => name)
            return pokemonNames
          }

          if (types.length) {
            const pokemonNames = []
            await Promise.all(
              types.map(async type => {
                const pokemonsByTypeResponse = fetchWithBQ(`type/${type}`)
                const { data: pokemonsByType } = await pokemonsByTypeResponse
                return pokemonsByType.pokemon.forEach(({ pokemon: { name } }) => pokemonNames.push(name))
              })
            )
            const sortedPokemonNames = pokemonNames.sort((a, b) => (a > b ? 1 : -1))
            return sortedPokemonNames
          }

          if (searchValue) {
            const getAllPokemons = fetchWithBQ(`pokemon/?limit=${pokemonsFullAmount}`)
            const { data: allPokemons } = await getAllPokemons
            const { results: allPokemonsResult } = allPokemons
            const allPokemonNames = allPokemonsResult.map(({ name }) => name)
            return allPokemonNames
          }
        }

        let pokemonNames = await getPokemonNames()

        if (!searchValue && !types.length) pokemonsAmount = pokemonsFullAmount

        if (types.length && !searchValue) {
          const slicedPokemonNames = pokemonNames.slice(parseInt(offset), parseInt(offset) + parseInt(limit))
          pokemonsAmount = pokemonNames.length
          pokemonNames = slicedPokemonNames
        }

        if (searchValue) {
          const foundPokemonNames = findByString(pokemonNames, searchValue)
          pokemonNames = foundPokemonNames.slice(parseInt(offset), parseInt(offset) + parseInt(limit))
          pokemonsAmount = foundPokemonNames.length
        }

        totalNumberOfPages = Math.ceil(pokemonsAmount / parseInt(limit))

        const res = await Promise.all(
          pokemonNames.map(async name => {
            const pokemonResult = fetchWithBQ(`pokemon/${name}`)
            const { data } = await pokemonResult
            const pokemon = await data
            return pokemon
          })
        )

        const transformedRes = res.map(response => {
          const { id, name, height, weight, base_experience, types, abilities } = response
          let pokemonTypes = ''
          let pokemonAbilities = ''
          types.forEach(({ type }) => (pokemonTypes += `${type.name} `))
          abilities.forEach(({ ability }) => (pokemonAbilities += `${ability.name} `))
          const smAvatarUrl = response.sprites.front_default
          const lgAvatarUrl = response.sprites.other['official-artwork'].front_default
          const avatarAlt = `picture of ${name}`

          return {
            id,
            name,
            pokemonTypes,
            pokemonAbilities,
            height,
            weight,
            baseExperience: base_experience,
            smAvatarUrl,
            lgAvatarUrl,
            avatarAlt,
          }
        })

        return { data: { pokemons: transformedRes, totalNumberOfPages, pokemonsAmount } }
      },
    }),
  }),
})

export const { useGetPokemonsQuery } = pokemonApi
