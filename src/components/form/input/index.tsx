import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './input.module.css'

type InputProps = Omit<JSX.IntrinsicElements['input'], 'size'> & {
  classNameOuter?: string
}

const InputWithRef: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ className, classNameOuter, ...props }, ref) => (
  <div className={clsx(styles.wrapper, classNameOuter)}>
    <input
      {...props}
      type={props.type || 'text'}
      className={clsx(styles.input, className)}
      ref={ref}
    />
  </div>
)

export const Input = forwardRef(InputWithRef)
