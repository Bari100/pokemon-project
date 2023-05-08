import { FC, ReactElement } from 'react'
import { PokemonsData, ItemData } from '@types'

const ModalWrapper: FC<Props> = ({ id, pokemonsData, children }) => {
  const getPokemonById = (id: number) => {
    return pokemonsData?.find(pokemon => pokemon.id === id)
  }

  const { name, pokemonTypes, pokemonAbilities, height, weight, baseExperience, lgAvatarUrl, avatarAlt } =
    getPokemonById(id || 1) || {}

  const modalData = {
    title: name,
    text1: pokemonTypes,
    text2: `Abilities: ${pokemonAbilities}`,
    text3: `Height: ${height}`,
    text4: `Weight ${weight}`,
    text5: `Exp: ${baseExperience}`,
    imageUrl: lgAvatarUrl || '#',
    imageAlt: avatarAlt,
  }

  return children(modalData)
}

export default ModalWrapper

interface Props {
  id: number | null
  pokemonsData?: PokemonsData[]
  children(data: ItemData): ReactElement
}
