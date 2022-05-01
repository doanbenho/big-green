// import React, { useEffect, useState } from 'react'
import HeaderOfPage from './HeaderOfPage'
import {  content_newspage_2 } from '../map-content/MapContent'
// import ItemNews from './ItemNews'
import { Outlet, useNavigate } from 'react-router-dom'
import { gototop } from '../map-content/ContentNews'




const NewsPage = () => {

     const navigate = useNavigate()

     const handleShowContent = (item) => {
          navigate(`/tin-tuc/${item.id}`)
          gototop()
     }

  return (
     <div className='w-full flex flex-col items-center'>
          <HeaderOfPage title="tin tức" />
          <div className='width-screen flex pt-10 mb-20 tb-mb:flex-col'>
               <Outlet />
               <div className='w-1/3 tb-mb:w-full tb-mb:mt-10'>
                    <div className='ml-7 flex-1 flex flex-col justify-start tb-mb:ml-0'>
                         <p className='pb-5 text-3xl font-semibold mb:text-2xl'>Bài viết nổi bật</p>
                         <div className='grid gap-7 tb-mb:text-lg tb-mb:gap-10'>
                              {
                                   content_newspage_2.map(item => (
                                        <div 
                                             key={item.id}
                                             className='flex'
                                        >
                                             <div className='w-1/3 overflow-hidden tb-mb:w-1/6'>
                                                  <img src={item.image} alt='' className='w-full rounded-xl'/>
                                             </div>
                                             <p className='flex-1 ml-7 font-bold md:font-semibold hover:text-green-600 cursor-pointer mb:text-sm'
                                                  onClick={() => handleShowContent(item)}
                                             >{item.title}</p>
                                        </div>
                                   ))
                              }
                         </div>
                    </div>
               </div>
          </div>
     </div>
  )
}

export default NewsPage
