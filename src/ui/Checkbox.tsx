import { Dispatch, FC, SetStateAction } from 'react'
import { useCheckboxState } from 'pretty-checkbox-react'

const Checkbox: FC<Props> = ({ value, color, onClick }) => {
  const { state: checked, setState: setChecked } = useCheckboxState() as UseCheckboxState

  return (
    <div
      onClick={() => {
        setChecked(checked => !checked)
        onClick(checked)
      }}
      className={`flex justify-center items-center w-20 h-7 rounded-lg text-sm font-bold cursor-pointer ${color} ${
        checked ? 'opacity-100' : 'opacity-50'
      }`}
    >
      {value}
      <input type='checkbox' checked={checked} hidden />
    </div>
  )
}

export default Checkbox

interface Props {
  value: string
  color: string
  onClick: (checked?: boolean) => void
}

interface UseCheckboxState {
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
}
