import { cva } from '@/styled-system/css'

type Props = {
  value: string
  onChange: (e: any) => void
}

export function InputForm({ value, onChange }: Props) {
  const inputFormStyle = cva({
    base: {
      width: '100%',
      height: 54,
      paddingX: 12,
      borderRadius: 6,
      border: '1px solid #EAEAEA',
      outline: 'none',
      transition: '0.1s ease-in-out',
      _focus: {
        boxShadow: '0 0 0 2px #1C51FC',
      },
    },
  })

  return (
    <input
      className={inputFormStyle()}
      type="text"
      placeholder="環境情報学の教室を教えて"
      value={value}
      onChange={onChange}
    />
  )
}
