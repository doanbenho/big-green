import React, { useContext, useMemo } from 'react'
import { openCart, openNavbar } from '../reducer/Actions'
import Context from '../reducer/Context'
import logo from '../image-green-food/logo.webp'
import { useNavigate } from 'react-router-dom'


const NavbarTablet = () => {


     const consumer = useContext(Context)
     const { items_in_cart } = consumer[0]
     const dispatch = consumer[1]
     const navigate = useNavigate()

     const total_quantity = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               total = total + item.amount
          })

          return total
     }, [items_in_cart])

     return (
          <div className='flex justify-between items-center z-20'>
               <div className='relative flex rounded-full items-center justify-center text-2xl text-green-600 hover:text-black'
                    onClick={() => {
                         dispatch(openNavbar(true))
                    }}
               >
                    <i className="fa-solid fa-bars text-4xl mb:text-2xl"></i>
               </div>
               <div className='w-1/4'
                    onClick={() => navigate('/big-green/trang-chu')}
               >
                    <img src={logo} alt='' className='w-full h-full' />
               </div>
               <div className='relative flex justify-center items-center py-2 px-3 mb:py-1 mb:px-2 bg-green-600 text-white rounded-full'
                    onClick={() => {
                         dispatch(openCart(true))
                    }}
               >
                    <i className="fa-solid fa-cart-shopping text-2xl mb:text-base"></i>
                    <span className='absolute -top-2 -right-2 px-1.5 text-sm bg-orange-500 rounded-full'>{total_quantity}</span>
               </div>
          </div>
     )
}

export default NavbarTablet