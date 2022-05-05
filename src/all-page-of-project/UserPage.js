import React, { useContext, useEffect } from 'react'
import Context from '../reducer/Context'
import user_avatar from '../image-green-food/img_intro_1.webp'
import { isUser, removeAll, removeItem } from '../reducer/Actions'
import { useNavigate } from 'react-router-dom'
import HeaderOfPage from './HeaderOfPage'




const UserPage = () => {

     const navigate = useNavigate()
     const consumer = useContext(Context)
     const { items_in_cart, is_user } = consumer[0]
     const dispatch = consumer[1]
     
     
     useEffect(() => {
          const had_login = is_user
          if( !had_login ) {
               navigate('/big-green/dang-nhap')
               dispatch(removeAll(true))
          }
          console.log('running ....')
     })


     const handleLogout = () => {
          dispatch(isUser(false))
          localStorage.removeItem('login')
     }

     const handleBuyItem = () => {
          // navigate('/thanh-toan')
          const itemwillbuy = document.querySelectorAll('.itemwillbuy input')
          console.log(itemwillbuy)
     }
 
     return (
          <div className='w-full flex flex-col items-center'>
               <HeaderOfPage title="người dùng"/>
               <div className='width-screen pt-10 mb-20 mb:pt-0'>
                    <div className='flex justify-between my-10 sm:flex-col mb:flex-col'>
                         <div className='flex items-center'>
                              <div className='relative w-24'
                                   onMouseOver={(e) => {
                                        const div = e.currentTarget.childNodes[1]
                                        div.style.display = 'flex'
                                   }}
                                   onMouseOut={(e) => {
                                        const div = e.currentTarget.childNodes[1]
                                        div.style.display = 'none'
                                   }}
                              >
                                   <img src={user_avatar} alt='' className='rounded-full overflow-hidden'/>
                                   <p className='absolute py-1 bottom-full left-1/2 text-sm w-full hidden justify-center cursor-pointer bg-white border-2 rounded-full'
                                        onClick={() => handleLogout()}
                                   >Đăng suất</p>
                              </div>
                              <div className='ml-5 text-xl'>
                                   <p>User's name</p>
                                   <p>User's email</p>
                              </div>
                         </div>
                         <div className='flex items-center sm:mt-5 mb:mt-5'>
                              <button 
                                   className='mr-2 px-20 py-2 bg-green-500 text-white rounded-lg hover:bg-orange-600 tb-mb:px-10'
                              >Giỏ hàng</button>
                              <button   
                                   className='ml-2 px-20 py-2 bg-green-500 text-white rounded-lg hover:bg-orange-600 tb-mb:px-10'
                                   onClick={() => navigate('/not-found')}
                              >Yêu thích</button>
                         </div>
                    </div>
                    <div className='my-10'>
                         <p className='text-center text-3xl my-5'>Giỏ hàng</p>
                         <div className='grid grid-cols-1 gap-5'>
                              <div className='grid grid-cols-5 sm:flex mb:flex justify-between border-2 px-5 mb:text-sm mb:px-0'>
                                   <p className='flex items-center'>Hình ảnh</p>
                                   <p className='flex items-center'>Sản phẩm</p>
                                   <p className='flex items-center'>Giá cả</p>
                                   <p className='flex items-center'>Số lượng</p>
                                   {/* <p className='flex justify-end items-center'>Lựa chọn</p> */}
                              </div>
                              {
                                   items_in_cart.length === 0 
                                   ?
                                   <p 
                                        className='text-center text-2xl cursor-pointer'
                                        onClick={() => navigate('/san-pham')}
                                   >Đến danh sách sản phẩm</p>
                                   :
                                   items_in_cart.map((item, index) => (
                                        <div className='itemwillbuy grid grid-cols-5 justify-between border-2 px-5 mb:px-0 mb:border-0 mb:border-b-2 sm:flex mb:flex' key={item.id}>
                                             <div className='w-24 sm:w-20 mb:w-12'>
                                                  <img src={item.image} alt='' />
                                             </div>
                                             <p className='flex items-center mb:text-sm'>{item.name}</p>
                                             <p className='flex items-center mb:text-sm'>{item['new-price']}<sup>đ</sup></p>
                                             <p className='flex items-center mb:text-sm'>{item.amount}</p>
                                             <div  className='flex items-center justify-end text-xl'>
                                                  <i 
                                                       className="fa-solid fa-trash-can ml-2"
                                                       onClick={() => dispatch(removeItem(index))}
                                                  ></i>
                                             </div>
                                        </div>
                                   ))
                              }
                         </div>
                    </div>
                    <div className='flex justify-end items-center' >
                         <div className='flex-1'>
                              <p className='text-xl mb:text-base sm:text-lg'><span className='text-orange-600 font-bold'>Lưu ý:</span> thanh toán sau khi nhận hàng</p>
                         </div>
                         <div className='flex justify-end'>
                              <button
                                   className='px-10 py-3 text-xl bg-green-500 hover:bg-orange-600 text-white mb:px-5 mb:py-2 mb:text-lg sm:px-5 sm:py-2 sm:text-lg'
                                   onClick={() => handleBuyItem()}
                              >Mua hàng</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default UserPage