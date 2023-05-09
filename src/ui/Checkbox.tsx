import { FC, useState } from 'react'

const Checkbox: FC<Props> = ({ value, color, onClick }) => {
  const [checked, setChecked] = useState(false)

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
