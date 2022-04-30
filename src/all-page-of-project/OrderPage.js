import { useState } from 'react'
import { handleSendBooking } from '../function/logic_send'
import { service_booking } from '../map-content/MapContent'
import HeaderOfPage from './HeaderOfPage'
import Input from './Input'



const OrderPage = () => {


     const [ send, setSend ] = useState(false)
     const handleCheckTrue = () => {
          const formInputs = document.querySelectorAll('.formInputs input')
          const textarea = document.querySelector('.formInputs textarea')
          const success = handleSendBooking(formInputs, textarea)
          console.log(success)
          setSend(success)
          setTimeout(() => {
               setSend(false)
          }, 5000);
     }

  return (
    <div className='w-full flex flex-col items-center'>
          <HeaderOfPage title="đặt hàng"/>
         <div className=' width-screen flex flex-col items-center pt-20'>
               <p className='text-xl text-center font-bold uppercase'>Hợp tác cùng chúng tôi</p>
               <p  className='text-lg w-3/5 mt-5 mb-10 text-center sm:w-full mb:w-full'>Quý khách đang muốn tìm kiếm một đối tác cung cấp rau củ quả giá sỉ? Liên hệ ngay với chúng tôi</p>
               <div className='banner-booking relative w-full flex flex-col'>
                    <form className='formInputs w-1/2 flex flex-col font-mono tb-mb:w-full'>
                         {
                              send ?
                              <div className='bg-blue-200 flex justify-center rounded-xl px-5 py-2 mb-5'>
                                   <p className=''>Bạn đã gửi tin nhắn thành công.</p>
                              </div>
                              : null
                         }
                         <Input type='text' placeholder='Họ và tên:' styling={{'borderWidth': '1px'}}/>
                         <Input type='text' placeholder='Địa chỉ:' styling={{'borderWidth': '1px'}} />
                         <Input type='text' placeholder='Số điện thoại:' styling={{'borderWidth': '1px'}} />
                         <div className='relative w-full'>
                              <textarea 
                                   className='w-full h-36 mb-5 py-3 pl-5 rounded-3xl tracking-widest'
                                   style={{'borderWidth': '1px'}}
                                   placeholder='Số lượng nông sản dự kiến muốn đặt:'
                              />
                              <p className='warning_input items-center bg-white rounded-md px-5 py-1 hidden'
                                   style={{'borderWidth': '1px'}}
                              >
                                   <i className="fa-solid fa-triangle-exclamation text-lg text-yellow-400 mr-2"></i> 
                                   Please fill out this field.
                              </p> 
                         </div>
                    </form>
                    <button
                         className='mb-10 max-w-max py-4 px-8 text-xl font-semibold text-white rounded-full'
                         style={{'backgroundColor': '#339538'}}
                         onClick={() => handleCheckTrue()}
                    >Gửi thông tin</button>
               </div>
         </div>
         <div className='w-full flex justify-center mb-20'>
               <div className='width-screen grid grid-cols-3 gap-10 pt-5 pb-10 tb-mb:grid-cols-1 tb-mb:gap-5'
                    style={{'backgroundColor': '#339538', 'borderTopLeftRadius': '75px', 'borderBottomRightRadius': '75px'}}
               >
                    {
                         service_booking.map(item => (
                              <div 
                                   className='flex flex-col items-center px-5'
                                   key={item.id}
                              >
                                   <div>
                                        <img src={item.avatar} alt='' />
                                   </div>
                                   <p className='text-white text-xl font-semibold mb-5'>{item.title}</p>
                                   <p className='text-center text-white opacity-60'>{item.content}</p>
                              </div>
                         ))
                    }
               </div>
         </div>
    </div>
  )
}

export default OrderPage