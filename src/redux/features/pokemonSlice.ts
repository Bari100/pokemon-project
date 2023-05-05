import { pokemonApi } from '@redux/services/pokemonApi'
import { createSlice } from '@reduxjs/toolkit'

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(pokemonApi.endpoints.getPokemons.matchFulfilled, (state, { payload }) => {
      state.pokemons = payload.pokemons
      state.searchPokemonResults = payload.searchPokemonResults
    })
  },
})

export const { fetchPokemonStart, fetchPokemonSuccess, fetchPokemonFailure } = pokemonSlice.actions

export default pokemonSlice.reducer
