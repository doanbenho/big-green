import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAll } from '../reducer/Actions'
import Context from '../reducer/Context'

const CompletePayment = () => {

     const navigate = useNavigate()
     const consumer = useContext(Context)
     const { items_in_cart, info_user } = consumer[0]
     const dispatch = consumer[1]
     const [ goOn, setGoOn ] = useState(false)



     const total_price = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               const price = Number(item['new-price'].replace('.', '').replace('.', ''))
               total = total + price*item.amount
          })
          return total
     }, [items_in_cart])

     const total_quantity = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               total = total + item.amount
          })

          return total
     }, [items_in_cart])


     useEffect(() => {
          if(items_in_cart.length === 0) {
               navigate('/not-found')
          }

          return () => {
               if(goOn) {
                    navigate('/san-pham')
               } else {
                    navigate('/trang-chu')
               }
               localStorage.removeItem('items_in_cart')
               dispatch(removeAll(true))
          }
     }, [goOn])


  return (
    <div className='relative payment-parent w-full flex justify-center pt-10 overflow-hidden tb-mb:overflow-visible'
          style={{'backgroundColor': '#f2f2f2'}}
    >
         <div className='width-screen flex flex-col'>
              <p className='text-3xl text-blue-600 mb-5'>Template Green Food</p>
              <div className='flex tb-mb:flex-col'>
                    <div className='w-3/5 flex flex-col tb-mb:w-full'>
                         <div className='flex items-center'>
                              <i className="fa-solid fa-check text-3xl text-green-400 px-5 py-4 flex justify-center items-center border-2 border-green-400 mr-4 rounded-full"></i>
                              <div className='flex flex-col'>
                                   <p className='text-xl font-semibold mb-1'>Cảm ơn bạn đã đặt hàng</p>
                                   <div className='text-sm grid mt-1'>
                                        <p className=''>Một email xác nhận đã được gửi tới conghieucoconcuto@gmail.com.</p>
                                        <p>Xin vui lòng kiểm tra email của bạn</p>
                                   </div>
                              </div>
                         </div>
                         <div className='flex flex-col flex-1 mt-10 ml-5 p-5 border-2 tb-mb:ml-0'>
                              <div className='grid grid-cols-2 sm:grid-cols-1 mb:grid-cols-1'>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>Thông tin mua hàng</p>
                                        <div className=''>
                                             <p className='mb-1'>{info_user.fullName}</p>
                                             <p className='mb-1'>{info_user.email}</p>
                                             <p>{info_user.numberPhone}</p>
                                        </div>
                                   </div>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>Địa chỉ nhận hàng</p>
                                        <div className=''>
                                             <p className='mb-1'>{info_user.fullName}</p>
                                             <p className='mb-1'>{info_user.address}</p>
                                             <p className='mb-1'>{info_user.xa}, {info_user.quan}, {info_user.tinh}</p>
                                             <p className='mb-1'>{info_user.numberPhone}</p>
                                        </div>
                                   </div>
                              </div>
                              <div className='grid grid-cols-2 sm:grid-cols-1 mb:grid-cols-1'>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>Phương thức thanh toán</p>
                                        <div className=''>
                                             <p className='mb-1'>Thanh toán khi giao hàng (COD)</p>
                                        </div>
                                   </div>
                                   <div className='mb-2'>
                                        <p className='font-semibold text-xl mb-1'>Phương thức vận chuyển</p>
                                        <div className=''>
                                             <p className='mb-1'>Giao hàng tận nơi</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='flex justify-end mt-10'>
                              <button 
                                   className='px-10 py-4 bg-blue-500 hover:bg-blue-700 text-white text-lg rounded-lg sm:mb-10 mb:mb-10' 
                                   onClick={() => setGoOn(true)}     
                              >Tiếp tục mua hàng</button>
                         </div>
                    </div>
                    <div className='flex-1 ml-10 '>
                         <div className='flex flex-col bg-white md:hidden sm:hidden mb:hidden '>
                              <p className='font-semibold pl-3 pt-3'>Đơn hàng #1006 ({total_quantity})</p>
                              <div className='flex flex-col mt-5 pb-2 px-3 border-b-2 border-zinc-300'>
                                   {
                                        items_in_cart.map((item, index) => (
                                        <div 
                                             key={index}
                                             className='flex items-center justify-between py-2 w-full'  
                                        >
                                             <div className='relative w-12 rounded-xl'>
                                                  <img src={item.image} alt='' className='rounded-xl border-2'/>
                                                  <span className='absolute -top-2 -right-2 text-sm bg-orange-600 text-white px-2 rounded-xl'>{item.amount}</span>
                                             </div>
                                             <p className='text-sm flex-1 ml-5'>{item.name}</p>
                                             <p className='text-sm justify-self-end'>{item['new-price']}<sup>đ</sup></p>
                                        </div>
                                        ))
                                   }
                              </div>
                              <div
                                   className='py-2 px-3  border-b-2 border-zinc-300'
                              >
                                   <div className='flex justify-between'>
                                        <p>Tạm tính</p>
                                        <p>{total_price.toLocaleString() }<sup>đ</sup></p>
                                   </div>
                                   <div className='flex justify-between'>
                                        <p>Phí vận chuyển</p>
                                        <p>40,000<sup>đ</sup></p>
                                   </div>
                              </div>
                              <div className='flex justify-between py-2 px-3 border-zinc-300'>
                                   <p>Tổng cộng</p>
                                   <p className='text-xl text-blue-400 font-semibold'>{(total_price + 40000).toLocaleString()}<sup>đ</sup></p>
                              </div>
                         </div>
                    </div>
              </div>
         </div>
    </div>
  )
}

export default CompletePayment