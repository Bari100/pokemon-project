import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
}

const pokemonsStatusSlice = createSlice({
  name: 'pokemonsStatus',
  initialState,
  reducers: {
    pokemonsPending: state => {
      state.loading = true
      state.error = null
    },
    pokemonsSuccess: state => {
      state.loading = false
      state.error = null
    },
    pokemonsError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { pokemonsPending, pokemonsSuccess, pokemonsError } = pokemonsStatusSlice.actions
export default pokemonsStatusSlice.reducer
