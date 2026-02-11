
import { ReactNode } from "react"
import { redirect, RedirectType } from 'next/navigation'

interface ButtonProps {
  children?: ReactNode, 
  className?: string,
  onClick?: () => void, 
  href?: string,
  disabled?: boolean,
  active?: boolean,
  size?: 'sm'| 'md' | 'lg'
} 

export default function Button({children, className, onClick, disabled, href, active=false, size='md'}: ButtonProps){

  const padding = size === 'sm' ? 'p-1' : size == 'md' ? 'p-4' : 'p-6'

    return (
      <button 
          className={`cursor-pointer z-50 outline-2 outline-stone-500 rounded-md bg-radial-[at_25%_25%] from-white via-stone-300 to-stone-100 hover:via-stone-100 hover:to-white disabled:opacity-50 ${padding} ${className}`}
          onClick={href ? () => redirect(href, RedirectType.push) : onClick}
          disabled={disabled}
       >
        {children}
       </button>
    )

}