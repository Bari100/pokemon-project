import { Dispatch, FC, SetStateAction } from 'react'
import Checkbox from './Checkbox'

const pokemonTypes = [
  {
    type: 'normal',
    color: 'bg-[#d9d9d9]',
  },
  {
    type: 'grass',
    color: 'bg-[#47ab57]',
  },
  {
    type: 'fire',
    color: 'bg-[#fd7d24]',
  },
  {
    type: 'water',
    color: 'bg-[#4592c4]',
  },
  {
    type: 'bug',
    color: 'bg-[#719f3f]',
  },
  {
    type: 'electric',
    color: 'bg-[#eed535]',
  },
  {
    type: 'rock',
    color: 'bg-[#a38c21]',
  },
  {
    type: 'ghost',
    color: 'bg-[#7b62a3]',
  },
  {
    type: 'poison',
    color: 'bg-[#b97fc9]',
  },
  {
    type: 'psychic',
    color: 'bg-[#f366b9]',
  },
  {
    type: 'fighting',
    color: 'bg-[#d56723]',
  },
  {
    type: 'ground',
    color: 'bg-[#ab9842]',
  },
  {
    type: 'dragon',
    color: 'bg-[#f06d56]',
  },
]

const Checkboxes: FC<Props> = ({ setTypes }) => {
  return (
    <div className='flex flex-wrap gap-2 mb-10'>
      {pokemonTypes.map(({ type, color }) => (
        <Checkbox type={type} color={color} setTypes={setTypes} />
      ))}
    </div>
  )
}

export default Checkboxes

interface Props {
  setTypes: Dispatch<SetStateAction<string[]>>
}
