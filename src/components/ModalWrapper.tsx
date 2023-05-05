import Modal from './Modal'

const ModalWrapper = ({ id, setOpen, open, data }) => {
  const getPokemonById = (id: number) => {
    return data.find(pokemon => pokemon.id === id)
  }

  const { name, pokemonTypes, pokemonAbilities, height, weight, baseExperience, lgAvatarUrl, avatarAlt } =
    getPokemonById(id)
  const modalData = {
    title: name,
    text1: pokemonTypes,
    text2: `Abilities: ${pokemonAbilities}`,
    text3: `Height: ${height}`,
    text4: `Weight ${weight}`,
    text5: `Exp: ${baseExperience}`,
    imageUrl: lgAvatarUrl,
    imageAlt: avatarAlt,
  }

  return <Modal setOpen={setOpen} open={open} data={modalData} />
}

export default ModalWrapper
