import React from 'react'
import { useParams } from 'react-router-dom'
import { content_newspage_1 } from '../map-content/MapContent'

const ContentNews = () => {

     const { id } = useParams()
     
     const item = content_newspage_1.find(item => {
          return item.id === Number(id) 
     })
  return (
    <div className='flex-1 flex flex-col justify-start'>
          <p className='font-bold text-2xl mb:font-semibold'>{item.title}</p>
          <div className='flex items-center mt-5'>
               <p className='mr-3 border-neutral-500 text-neutral-500'><i className="fa-solid fa-circle-user"></i> {item.cre.name}</p>
               <p className='text-neutral-500 text-sm'>|</p>
               <p className='ml-3 text-neutral-500'><i className="fa-solid fa-clock"></i> {item.cre.time}</p>
          </div>
          {
               item.content.map((item, index) => (
                    <p
                         key={index}
                         className='my-5 leading-8 text-lg text-justify'
                    >{item}</p>
               ))

          }
    </div>
  )
}

export default ContentNews