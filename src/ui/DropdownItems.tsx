import { FC } from 'react'
import { Menu } from '@headlessui/react'

const DropdownItems: FC<Props> = ({ dropDownOptions, onClick }) => (
  <>
    {dropDownOptions.map(option => (
      <Menu.Item>
        <button onClick={() => onClick(option)} className='bg-gray-100 text-gray-900 block px-4 py-2 text-sm w-full'>
          {option}
        </button>
      </Menu.Item>
    ))}
  </>
)

export default DropdownItems

interface Props {
  dropDownOptions: readonly string[] | readonly number[]
  onClick: (option: number | string) => void
}
