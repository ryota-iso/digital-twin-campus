import { css, cva } from '@/styled-system/css'

type Props = {
  assetPath: string
  buttonName: string
  marginPosition?: 'left' | 'right' | 'top' | 'bottom'
  theme?: 'white' | 'gray'
  disabled?: boolean
  onClick?: () => void
}

export function IconButton({ assetPath, buttonName, marginPosition, theme, disabled, onClick }: Props) {
  const iconButtonStyle = cva({
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDescription: 'column',
      width: 54,
      minWidth: 54,
      height: 54,
      marginLeft: marginPosition === 'left' ? 6 : 0,
      marginRight: marginPosition === 'right' ? 6 : 0,
      marginTop: marginPosition === 'top' ? 6 : 0,
      marginBottom: marginPosition === 'bottom' ? 6 : 0,
      borderRadius: 6,
      border: '1px solid #EAEAEA',
      background: theme === 'white' ? 'white' : 'gray.100',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: '0.1s ease-in-out',
      _focus: {
        boxShadow: '0 0 0 2px #1C51FC',
      },
      _hover: {
        background: 'gray.200',
      },
    },
  })

  return (
    <button className={iconButtonStyle()} onClick={onClick} disabled={disabled}>
      <img className={css({ width: 16, height: 16 })} src={assetPath} />
      <p className={css({ fontSize: 10, color: 'gray.600' })}>{buttonName}</p>
    </button>
  )
}
