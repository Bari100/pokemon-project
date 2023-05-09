import { Dispatch, FC, SetStateAction } from 'react'
import { POKEMON_TYPES } from 'src/constants'
import Checkbox from '@ui/Checkbox'

const Checkboxes: FC<Props> = ({ setTypes, setForcePage }) => {
  return (
    <div className='flex justify-center flex-wrap gap-2 mb-10'>
      {POKEMON_TYPES.map(({ type, color }) => (
        <Checkbox
          value={type}
          color={color}
          onClick={checked => {
            setTypes((prev: string[]) =>
              checked ? [...prev.filter(pokemonType => pokemonType !== type)] : [...prev, type]
            )
            setForcePage(0)
          }}
        />
      ))}
    </div>
  )
}

export default Checkboxes

interface Props {
  setTypes: Dispatch<SetStateAction<string[]>>
  setForcePage: (index: number) => void
}
