export default function SubHeading ( {text, className}:{text?: string , className?: string}  ) {

    return (     
    <h1 className={`text-lg text-bold font-black text-white bg-linear-to-r from-stone-500 to-neutral-500/50 rounded-sm p-2 ${className}`}>
       {text}
    </h1>)
}
