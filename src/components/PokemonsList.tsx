import React, { FC, useState } from 'react'
import { ItemData, PokemonsData } from '@types'
import ModalWrapper from '@components/ModalWrapper'
import ListItemsWrapper from '@components/ListItemsWrapper'
import List from '@ui/List'
import ListItem from '@ui/ListItem'
import Modal from '@ui/Modal'

const PokemonsList: FC<Props> = ({ pokemons }) => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<number | null>(null)

  return (
    <>
      <List>
        <ListItemsWrapper pokemonsData={pokemons}>
          {(data, id) => (
            <ListItem
              data={data}
              onClick={() => {
                setOpen(true)
                setId(id)
              }}
            />
          )}
        </ListItemsWrapper>
      </List>
      <ModalWrapper id={id} pokemonsData={pokemons}>
        {(data: ItemData) => <Modal setOpen={setOpen} open={open} data={data} />}
      </ModalWrapper>
    </>
  )
}

export default PokemonsList

interface Props {
  pokemons?: PokemonsData[]
}
