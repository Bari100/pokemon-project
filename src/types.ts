import { DROPDOWN_OPTIONS } from './constants'

export interface PokemonsData {
  id: number
  name: string
  pokemonTypes: string
  pokemonAbilities: string
  height: number
  weight: number
  baseExperience: number
  smAvatarUrl: string
  lgAvatarUrl: string | null
  avatarAlt: string
}

export interface ItemData {
  title?: string
  text1?: string | number
  text2?: string | number
  text3?: string | number
  text4?: string | number
  text5?: string | number
  imageUrl?: string
  imageAlt?: string
}

export type TypesFromArrayValues<A extends readonly unknown[]> = A[number]

export type ItemsPerPage = TypesFromArrayValues<typeof DROPDOWN_OPTIONS>
