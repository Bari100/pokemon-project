import { Dispatch, FC, SetStateAction } from 'react'
import { pokemonTypes } from '@constants/pokemonTypes'
import Checkbox from '@ui/Checkbox'

const Checkboxes: FC<Props> = ({ setTypes }) => {
  return (
    <div className='flex flex-wrap gap-2 mb-10'>
      {pokemonTypes.map(({ type, color }) => (
        <Checkbox
          value={type}
          color={color}
          onClick={checked =>
            setTypes((prev: string[]) =>
              checked ? [...prev.filter(pokemonType => pokemonType !== type)] : [...prev, type]
            )
          }
        />
      ))}
    </div>
  )
}

export default Checkboxes

interface Props {
  setTypes: Dispatch<SetStateAction<string[]>>
}
