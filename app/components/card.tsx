import { ReactNode } from 'react'
import  Heading  from '@/app/components/heading'


export default function Card ({children, title}:{children?: ReactNode,title?: string} ) {

return (

      <div className="rounded-xl p-5 grid grid-cols-1 gap-4 max-w-5xl text-slate-600 text-left text-sm " >
          <div className="flex flex-col gap-4">
            {
              title && <Heading 
                text={title} 
                className={'text-xl'} />
            }
            {children}
          </div>
      </div>
)

}