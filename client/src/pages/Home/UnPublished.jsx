import React from 'react'
import EmptyCard from '../../components/EmptyCard';

const UnPublished = () => {

     const isEmpty = true;


     if(isEmpty){
        return (
            <main className='w-full h-[80vh] flex justify-center items-center' >
                <EmptyCard
                  heading={`No Unpublished Products`} 
                  summary={`Your Unpublished Products will appear here Create your first product to publish`}
                  needBtn={false}/>

            </main>
        )
     }


  return (
    <div>
      
    </div>
  )
}

export default UnPublished
