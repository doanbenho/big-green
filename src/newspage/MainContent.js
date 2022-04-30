import React, { useEffect, useState } from 'react'
import { content_newspage_1 } from '../map-content/MapContent'
import ItemNews from '../all-page-of-project/ItemNews'


const MainContent = () => {

     const [ newspage_1, setNewspage_1 ] = useState([])

     useEffect(() => {
          setNewspage_1(content_newspage_1)
     }, [])

  return (
     <div className='flex-1 flex flex-col justify-start'>
          <p className='pb-5 text-3xl font-semibold mb:text-2xl'>Tin tức</p>
          <div>
               {
                    newspage_1.length === 0
                    ?
                    <div className='flex justify-center text-xl mt-32'>
                         <p>loading ...</p>
                    </div>
                    :
                    <div className='grid grid-cols-2 gap-7 sm:grid-cols-1 mb:grid-cols-1'>
                         {
                              newspage_1.map(item => (
                                   <ItemNews item={item} key={item.id} />
                              ))
                         }
                    </div>
               }
          </div>
     </div>
  )
}

export default MainContent