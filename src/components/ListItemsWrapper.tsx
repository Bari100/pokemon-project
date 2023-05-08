import { FC, ReactElement } from 'react'
import { PokemonsData, ItemData } from '@types'

const ListItemsWrapper: FC<Props> = ({ pokemonsData, children }) => (
  <>
    {pokemonsData?.map((pokemonData: PokemonsData) => {
      const { id, name, pokemonTypes, height, baseExperience, smAvatarUrl, avatarAlt } = pokemonData
      const listData = {
        title: name,
        text1: pokemonTypes,
        text2: height,
        text3: baseExperience,
        imageUrl: smAvatarUrl,
        imageAlt: avatarAlt,
      }
      return children(listData, id)
    })}
  </>
)

export default ListItemsWrapper

interface Props {
  pokemonsData?: PokemonsData[]
  children(data: ItemData, id: number): ReactElement
}
