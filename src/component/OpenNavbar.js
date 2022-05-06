import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../App.css'
import { gototop } from '../map-content/ContentNews'
import { openNavbar } from '../reducer/Actions'
import Context from '../reducer/Context'

export const navigate_tb_mb = [
     {
          'id': 1,
          'title': 'trang chủ',
          'url-to': 'big-green/trang-chu'
     },
     {
          'id': 2,
          'title': 'giới thiệu',
          'url-to': 'big-green/gioi-thieu'
     },
     {
          'id': 3,
          'title': 'sản phẩm',
          'url-to': 'big-green/san-pham'
     },
     {
          'id': 4,
          'title': 'đặt hàng',
          'url-to': 'big-green/dat-hang'
     },
     {
          'id': 5,
          'title': 'tin tức',
          'url-to': 'big-green/tin-tuc'
     },
     {
          'id': 6,
          'title': 'liên hệ',
          'url-to': 'big-green/lien-he'
     },
     {
          'id': 7,
          'title': 'đăng nhập',
          'url-to': 'big-green/dang-nhap'
     },
     {
          'id': 8,
          'title': 'đăng ký',
          'url-to': 'big-green/dang-ky'
     }
]

const OpenNavbar = () => {

     const consumer = useContext(Context)
     const { open_navbar } = consumer[0]
     const dispatch = consumer[1]
     const location = useLocation()
     const [ currentPage, setCurrentPage ] = useState('trang-chu')

     useEffect(() => {
          if(location.pathname !== '') {
               setCurrentPage(location.pathname)
          }
     }, [location.pathname])


  return (
    <div>
         <span className='fixed hidden top-0 left-0 z-30 w-full h-full bg-black bg-opacity-50'
               onClick={() => {
                    dispatch(openNavbar(false))
               }}
               style={open_navbar === true ? {'display': 'block'} : {'display': 'none'}}
         ></span>
         <div className='navbar_tb_mb flex flex-col pt-5 z-30'
               style={open_navbar === true ? {'left': '0'} : {'left': '-100%'}}
         >
              {
                   navigate_tb_mb.map(item => (
                        <Link 
                              to={item['url-to']}
                              key={item.id}
                              className='py-2 text-lg hover:text-orange-600 ml-5'
                              style={currentPage.includes(item['url-to']) ? {'color': 'orange'} : {'color': 'black'}}
                              onClick={() => {
                                   dispatch(openNavbar(false))
                                   gototop()
                              }}
                         >{item.title}</Link>
                   ))
               }
         </div>
    </div>
  )
}

export default OpenNavbar