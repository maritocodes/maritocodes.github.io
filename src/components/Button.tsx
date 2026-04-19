import type { PropsWithChildren } from "react"

interface ButtonProps {
  onClick?: () => void
  to?: string
  disabled?: boolean
  as?: "button" | "submit" | "link"
  secondary?: boolean
  className?: string
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { as = "button", to, onClick, secondary, className, children, disabled } = props
  const baseClassName = `${secondary ? "bt-secondary" : "bt-primary"} ${className || ""}`

  if (as === "link") {
    if (!to) return null // evita render vacío
    return (
      <a draggable={false} className={baseClassName} href={to}>
        {children}
      </a>
    )
  }

  return (
    <button type={as === "submit" ? "submit" : "button"} className={baseClassName} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
