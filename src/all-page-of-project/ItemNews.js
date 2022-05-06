import React from 'react'
import { useNavigate } from 'react-router-dom'
import { gototop } from '../map-content/ContentNews'

const ItemNews = props => {

     const item = props.item
     const navigate = useNavigate()
     
     const handleShowContent = (item) => {
          navigate(`/big-green/tin-tuc/${item.id}`)
          gototop()
     }

  return (
     <div
          key={item.id}
     >
          <div className='rounded-xl overflow-hidden'>
               <img src={item.image} alt='' className='w-full'/>
          </div>
          <p 
               className='text-xl font-semibold my-4 hover:text-green-600 cursor-pointer'
               onClick={() => handleShowContent(props.item)}
          >{item.title}</p>
          <div className='flex items-center mb-3'>
               <p className='mr-3 border-neutral-500 text-neutral-500'><i className="fa-solid fa-circle-user"></i> {item.cre.name}</p>
               <p className='text-neutral-500 text-sm'>|</p>
               <p className='ml-3 text-neutral-500'><i className="fa-solid fa-clock"></i> {item.cre.time}</p>
          </div>
          <p className='text-justify text-neutral-400'>{item.seo}</p>
     </div>
     )
}

export default ItemNews