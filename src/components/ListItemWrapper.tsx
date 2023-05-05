import { useGetPokemonByIdQuery } from '@redux/services/pokemonApi'
import ListItem from './ListItem'

const ListItemWrapper = ({ id, open, setOpen, setId }) => {
  const { data, isLoading } = useGetPokemonByIdQuery(id)

  if (isLoading || !data) return null

  const { name, pokemonTypes, height, baseExperience, smAvatarUrl, avatarAlt } = data

  const listData = {
    title: name,
    text1: pokemonTypes,
    text2: height,
    text3: baseExperience,
    imageUrl: smAvatarUrl,
    imageAlt: avatarAlt,
  }

  return (
    <ListItem
      data={listData}
      onClick={() => {
        setOpen(true)
        setId(id)
      }}
    />
  )
}

export default ListItemWrapper
