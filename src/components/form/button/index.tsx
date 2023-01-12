import { clsx } from 'clsx'
import { PropsWithChildren } from 'react'
import styles from './button.module.css'

type ButtonProps = PropsWithChildren<
  JSX.IntrinsicElements['button'] & {
    variant?: 'primary' | 'secondary'
  }
>

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} className={clsx(styles.button, className)}>
      {children}
    </button>
  )
}
