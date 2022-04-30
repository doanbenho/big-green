import React, { useContext, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSendBooking } from '../function/logic_send'
import Context from '../reducer/Context'
import { infoUser } from '../reducer/Actions'


const inputs = [
     { 'id': 1, 'placeholder': 'Email', 'type': 'email'},  { 'id': 2, 'placeholder': 'Họ và tên', 'type': 'text'},  { 'id': 3, 'placeholder': 'Số điện thoại (tùy chọn)', 'type': 'number'} , { 'id': 4, 'placeholder': 'Địa chỉ (tùy chọn)', 'type': 'text'},  { 'id': 5, 'placeholder': 'Tỉnh thành', 'type': 'text'},  { 'id': 6, 'placeholder': 'Quận huyện', 'type': 'text'},  { 'id': 7, 'placeholder': 'Xã phường', 'type': 'text'}
]

const PaymentPage = () => {

     const [ check, setCheck ] = useState(false)
     const checkRef = useRef()
     const navigate = useNavigate()
     const consumer = useContext(Context)
     const { items_in_cart } = consumer[0]
     const dispatch = consumer[1]
     const [ voucher, setVoucher ] = useState(100/100)
     const [ infoVoucher, setInfoVoucher ] = useState('')

     let total_price = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               const price = Number(item['new-price'].replace('.', '').replace('.', ''))
               total = (total + price*item.amount) * voucher
          })
          return total
     }, [items_in_cart, voucher])

     const total_quantity = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               total = total + item.amount
          })

          return total
     }, [items_in_cart])

     

     const handlePayment = () => {
          const formInputs = document.querySelectorAll('.formInputs input')
          dispatch(infoUser({
               "email": formInputs[0].value,
               "fullName": formInputs[1].value,
               "numberPhone": formInputs[2].value,
               "address": formInputs[3].value,
               "tinh": formInputs[4].value,
               "quan": formInputs[5].value,
               "xa": formInputs[6].value,
          }))
          const inputs = []
          for(let i = 0; i < formInputs.length; i++) {
               if(!formInputs[i].ariaPlaceholder.includes('tùy')) {
                    inputs.push(formInputs[i])
               }
          }
          const checkInputs = handleSendBooking(inputs, undefined)
          if(checkRef.current.checked && checkInputs) {
               navigate('/hoan-thanh-thanh-toan')
          }
     }

     const voucherRef = useRef()
     const handleVoucher = () => {
          console.log(voucherRef.current.value)
          if(voucherRef.current.value === '') {
               setInfoVoucher('Nhập mã voucher!')
               voucherRef.current.focus()
               } else {
                    if(voucherRef.current.value === 'conghieudeptrai') {
                         setVoucher(50/100)
                         setInfoVoucher('Voucher giảm giá 50%.')
                    } else {
                         setInfoVoucher('Voucher không tồn tại!')
                         voucherRef.current.focus()
                    }             
               }
          }
    
     


  return (


       <div className='payment-parent relative w-full flex justify-center overflow-hidden'>
         {
               items_in_cart.length === 0
               ?
               <div className='flex flex-col items-center my-20'>
                    <p className='text-orange-600 mb-5'>Chưa có sản phẩm nào!</p>
                    <button 
                         className='px-3 py-2 text-sm bg-blue-500 hover:bg-blue-800 text-white rounded-md'
                         onClick={() => navigate('/san-pham')}
                    >Quay lại giỏ hàng</button>
               </div>
               :
               <div className='flex width-screen tb-mb:flex-col'>
                    <div className='flex-1 flex flex-col pt-10'>
                         <p className='text-3xl text-blue-600'>Template Green Food</p>
                         <div className='grid grid-cols-2 my-8 sm:flex flex-col sm:my-5 mb:flex mb:my-5'>
                              <div>
                                   <div className='flex justify-between items-center mb-3'>
                                        <p className='text-xl font-semibold'>Thông tin nhận hàng</p>
                                        <Link 
                                             to='/dang-nhap' 
                                             className='text-blue-600 cursor-pointer hover:underline'
                                        >Đăng nhập</Link>
                                   </div>
                                   <form className='formInputs grid gap-3'>
                                        {
                                             inputs.map(item => (
                                                  <div 
                                                       className='relative'
                                                       key={item.id}
                                                  >
                                                       <input 
                                                            type={item.type}
                                                            placeholder={item.placeholder}
                                                            aria-placeholder={item.placeholder}
                                                            className='pl-5 py-2 rounded-md w-full'
                                                       />
                                                       <p className='warning_input absolute w-3/4 bottom-0 left-1/2 items-center bg-white rounded-md px-5 py-1 hidden'
                                                            style={{'borderWidth': '1px'}}
                                                       >
                                                            <i className="fa-solid fa-triangle-exclamation text-lg text-yellow-400 mr-2"></i> 
                                                                 Please fill out this field.
                                                       </p>  
                                                  </div>
                                             ))
                                        }
                                        <textarea className='h-20 pl-5 py-2 rounded-md' placeholder='Ghi chú (tùy chọn)' />
                                   </form>
                              </div>
                              <div className='mx-7 sm:mx-0 mb:mx-0'>
                                   <form className='flex flex-col'>
                                        <p className='text-xl font-semibold'>Vận chuyển</p>
                                        <p className='mt-3 mb-7 pl-5 py-2 bg-blue-100 rounded-md '>Vui lòng nhập thông tin giao hàng</p>
                                        <p className='text-xl font-semibold'>Thanh toán</p>
                                        <div className='flex items-center justify-between mt-3 mb-1 py-3 border-2 rounded-md'>
                                             <input 
                                                  type='checkbox' 
                                                  className='w-5 h-5 mx-3' 
                                                  checked={check}
                                                  ref={checkRef}
                                                  onChange={() => setCheck(!check)}
                                             />
                                             <p className='flex-1 text-sm'>Thanh toán khi giao hàng (COD)</p> 
                                             <i className="fa-solid fa-money-bill-1 mr-3 text-blue-500 text-xl"></i>
                                        </div>
                                        {
                                             check 
                                             ?
                                             <p className='pl-5 py-2 bg-blue-100 rounded-md '>Phương thức thanh toán (COD)</p>
                                             : null
                                        }
                                   </form>
                              </div>
                         </div>
                    </div>
                    <div className='w-1/3 payment relative text-zinc-500 pt-10 tb-mb:w-full border-l-2 tb-mb:border-none sm:pt-0 mb:pt-0'>
                         <p 
                              className='text-xl font-semibold pb-5 pl-5 text-black border-b-2 border-zinc-300 tb-mb:mx-5 tb-mb:pl-0'
                         >Đơn hàng ({total_quantity} sản phẩm)</p>
                         <div 
                              className='flex flex-col mt-5 pb-2 ml-5  border-b-2 border-zinc-300 tb-mb:mx-5'
                         >
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
                                             <p className='text-sm flex-1 ml-5 md:mx-5'>{item.name}</p>
                                             <p className='text-sm justify-self-end'>{item['new-price']}<sup>đ</sup></p>
                                        </div>
                                   ))
                              }
                         </div>
                         <div className='py-5 ml-5  border-b-2 border-zinc-300 md:mx-5'
                         >
                              <div className='flex justify-between'>
                                   <input 
                                        type='text' 
                                        ref={voucherRef} 
                                        className='flex-1 rounded-md px-4 py-2' 
                                        placeholder='Nhập mã khuyên mãi'
                                        onKeyDown={e => {
                                             if(e.key === 'Enter') {
                                                  handleVoucher()
                                             }
                                        }}
                                   />
                                   <button
                                        className='ml-5 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-800 text-white rounded-md'  
                                        onClick={() => handleVoucher()}
                                   >Áp dụng</button>
                              </div>
                              {
                                   infoVoucher !== '' ? <p className='text-blue-800 font-semibold ml-5 mt-5' >{infoVoucher}</p>
                                   : null
                              }
                         </div>
                         <div
                              className='py-5 ml-5  border-b-2 border-zinc-300 md:mx-5 mb:mx-2'
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
                         <div className='py-5 ml-5 md:mx-5 md:mb-20 mb:mb-20 '>
                              <div className='flex justify-between mb-5'>
                                   <p>Tổng cộng</p>
                                   <p className='text-xl text-blue-400 font-semibold'>{(total_price + 40000).toLocaleString()}<sup>đ</sup></p>
                              </div>
                              <div className='flex items-centers justify-between mt-5'>
                                   <p 
                                        className='hover:underlines text-blue-500 cursor-pointer'
                                        onClick={() => navigate('/san-pham')}
                                   >Quay về giỏ hàng</p>
                                   <button 
                                        className='px-5 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-md'
                                        onClick={() => handlePayment()}
                                   >Đặt hàng</button>
                              </div>
                         </div>
                    </div>
               </div>
         }
    </div>
  )
}

export default PaymentPage