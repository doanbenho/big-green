import React from 'react'
import { Link } from 'react-router-dom'
import PrevFooter from '../component/PrevFooter'
import logo from '../image-green-food/logo.webp'
import { navigate } from '../map-content/MapContent'

const helpclient = [
     {
          "title": 'Trang chủ',
          "url-to": "trang-chu"
     },
     {
          "title": 'Liên hệ',
          "url-to": "lien-he"
     },
     {
          "title": 'Giới thiệu',
          "url-to": "gioi-thieu"
     }
]


const Footer = () => {
  return (
    <div 
          className='relative flex justify-center py-20 w-full'
          style={{'backgroundColor': '#f2f2f2'}}
    >
         <PrevFooter />
          <div className='width-screen grid grid-cols-3 gap-10 mb:flex mb:flex-col sm:flex sm:flex-col'>
               <div className=''>
                    <div>
                         <img src={logo} alt='' />
                    </div>
                    <p className='text-justify leading-8 mt-10 sm:mt-5'>Cửa hàng Nông sản sạch là một website cũng cấp thực phẩm an toàn, nông sản sạch cho người dân.</p>
               </div>
               <div className='flex flex-col justify-end'>
                    <p className='mb-5 font-bold'>Về chúng tôi</p>
                    <div className='text-lg text-neutral-500 grid grid-cols-2 gap-4'>
                         {
                              navigate.map(item => (
                                   <Link
                                        key={item.id}
                                        className='hover:text-black first-letter:uppercase'
                                        to={item['url-to']}
                                        onClick={() => {
                                             const timer = setInterval(() => {
                                                  document.documentElement.scrollTop -= 500;
                                                  if(document.documentElement.scrollTop <= 0) {
                                                      clearInterval(timer)
                                                  }
                                             }, 1)
                                        }}
                                   >{item.title}</Link>
                              ))
                         }
                    </div>
               </div>
               <div className='flex flex-col justify-end'>
                    <p className='mb-5 font-bold'>Hỗ trợ khách hàng</p>
                    <div className='text-lg text-neutral-500 grid grid-cols-1 gap-4'>
                         {
                              helpclient.map((item, index) => (
                                   <Link
                                        key={index}
                                        className='hover:text-black'
                                        to={item['url-to']}     
                                        onClick={() => {
                                             const timer = setInterval(() => {
                                                  document.documentElement.scrollTop -= 500;
                                                  if(document.documentElement.scrollTop <= 0) {
                                                      clearInterval(timer)
                                                  }
                                             }, 1)
                                        }}
                                   >{item.title}</Link>
                              ))
                         }
                    </div>
               </div>
          </div> 
    </div>
  )
}

export default Footer