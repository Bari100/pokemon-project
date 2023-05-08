import { Dispatch, FC, SetStateAction } from 'react'
import { useCheckboxState } from 'pretty-checkbox-react'

const Checkbox: FC<Props> = ({ type, color, setTypes }) => {
  const { state, setState } = useCheckboxState()
  return (
    <div
      onClick={() => {
        setState(prev => !prev)
        setTypes((prev: string[]) => (state ? [...prev.filter(pokemonType => pokemonType !== type)] : [...prev, type]))
      }}
      className={`flex justify-center items-center w-20 h-7 rounded-lg text-sm font-bold cursor-pointer ${color} ${
        state ? 'opacity-100' : 'opacity-50'
      }`}
    >
      {type}
    </div>
  )
}

export default Checkbox

interface Props {
  type: string
  color: string
  setTypes: Dispatch<SetStateAction<string[]>>
}
