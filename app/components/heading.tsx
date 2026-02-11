import { Bruno_Ace_SC } from 'next/font/google'
import { ReactNode } from 'react'

const bruno = Bruno_Ace_SC({
  weight: '400'
})


export default function Heading (   {text, className}:{text?: string | ReactNode, className?: string}  ) {


return (

    <div className={`${bruno.className} rounded-full p-2 w-full outline-2 outline-stone-500 bg-radial-[at_25%_25%] from-stone-200 via-stone-500 to-neutral-200 ${className}`}>
        <h2 className="font-bold text-center text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.2)]">{text}</h2>
    </div>

)
}