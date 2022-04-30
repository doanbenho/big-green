import React, { useState } from 'react'
import { navigate_contact } from '../map-content/MapContent'
import Input from './Input'
import { handleSendBooking } from '../function/logic_send'
import HeaderOfPage from './HeaderOfPage'



const ContactPage = () => {


     const [ send, setSend ] = useState(false)
     const handleCheckTrue = () => {
          const formInputs = document.querySelectorAll('.formInputs input')
          const textarea = document.querySelector('.formInputs textarea')
          const success = handleSendBooking(formInputs, textarea)
          setSend(success)
          setTimeout(() => {
               setSend(false)
          }, 5000);
     }

  return (
    <div className='w-full flex flex-col items-center'>
          <HeaderOfPage title="liên lạc" />
         <div className='width-screen mb-10'>
               <div className='w-full grid grid-cols-3 gap-10 pt-10 sm:grid-cols-1 mb:grid-cols-1 sm:gap-0 mb:gap-0'>
                    {
                         navigate_contact.map(item => (
                              <div
                                   key={item.id}
                                   className='flex flex-col items-center px-4 py-5'
                              >
                                   <div
                                        className='w-24 h-24 flex items-center justify-center rounded-full text-4xl'
                                        style={{'color': '#339538', 'backgroundColor': '#f2f2f2'}}

                                   >{item.icon}</div>
                                   <p className='my-3 font-bold text-xl'>{item.title}</p>
                                   <p className='text-center text-black opacity-80 sm:w-3/4'>{item.content}</p>
                              </div>
                         ))
                    }
               </div>
               <div className='my-10'>
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7805.607225366489!2d109.17924824591579!3d11.988086800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170f3299cd5667b%3A0x4618dc0ed46b851!2zVHLGsOG7nW5nIFRIUFQgTmfDtCBHaWEgVOG7sQ!5e0!3m2!1svi!2s!4v1651233665589!5m2!1svi!2s"style={{"border": '0', 'width': '100%', 'height': '450px'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
               </div>
               <div className='flex flex-col items-center'>
                    <p className='my-3 font-bold text-center text-3xl sm:text-2xl mb:text-2xl'>Gửi thông tin liên hệ cho chúng tôi</p>
                    <p className='text-center text-black opacity-80 mb-10'>Bạn hãy điền nội dung tin nhắn vào form dưới đây. Chúng tôi sẽ trả lời bạn ngay sau khi nhận được tin nhắn.</p>
                    {
                         send 
                         ?
                         <div className='w-full bg-blue-200 flex justify-center rounded-xl px-5 py-2 mb-5 md:flex-col sm:flex-col mb:flex-col'>
                              <p className='mr-1'>Bạn đã gửi tin nhắn thành công.</p>
                              <p>Chúng tôi sẽ liên hệ lại sau.</p>
                         </div>
                         :
                         null
                    }    
                    <form className='formInputs w-full flex flex-wrap justify-center'>
                         <Input type='text' placeholder='Họ và tên:'  styling={{'borderWidth': '1px'}}/>
                         <Input type='number' placeholder='Số điện thoại:'  styling={{'borderWidth': '1px'}}/>
                         <Input type='email' placeholder='Email:' styling={{'width': '100%', 'borderWidth': '1px'}} />
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
                    >Gửi tin nhắn</button>
               </div>
         </div>
    </div>
  )
}

export default ContactPage
