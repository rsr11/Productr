import React from 'react'
import EmptyCard from '../../components/EmptyCard'

const Published = () => {
  
    const isEmpty = true;

   
    if(isEmpty){
        return (
            <main className='w-full h-[80vh] flex justify-center items-center' >
                <EmptyCard 
                  heading={`No Published Products`} 
                  summary={`Your Published Products will appear here Create your first product to publish `}
                  needBtn={false}/>

            </main>
        )
    }

  return (
    <main >
    </main>
  )
}

export default Published
