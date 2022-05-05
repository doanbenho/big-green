import React, { useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../reducer/Context'
import { addItem, isUser, openCart } from '../reducer/Actions'
import HeaderOfPage from './HeaderOfPage'



const LoginPage = () => {

     const navigate = useNavigate()
     const emailRef = useRef()
     const passwordRef = useRef()

     const consumer = useContext(Context)
     const { item_await, is_user } = consumer[0]
     const dispatch = consumer[1]


     const handleLogin = () => {
          if(emailRef.current.value !== '' & passwordRef.current.value !== '') {
               localStorage.setItem('login', 'isLogin')
               if(item_await) {
                    dispatch(addItem(item_await))
                    dispatch(openCart(true))
                    dispatch(isUser(true))
                    navigate('/big-green/san-pham')
               } else {
                    dispatch(isUser(true))
                    navigate('/big-green/nguoi-dung')
               } 
          }
     }



  return (
          <div className='w-full flex flex-col items-center'>
               <HeaderOfPage title="đăng nhập" />
               {
               is_user  
               ?
               <p
                    onClick={() => navigate('/big-green/nguoi-dung')}
                    className='text-4xl text-center mt-10 mb-20 cursor-pointer hover:text-orange-500 mb:text-xl'
               >Bạn đã đăng nhập thành công</p>
               :
               <div className='width-screen flex justify-center'>
                    <div className='w-1/3 shadow-xl flex flex-col items-center px-5 py-10 mb-10 md:w-1/2 sm:w-3/4 mb:w-5/6'>
                         <p className='text-2xl font-semibold'>Đăng ký </p>
                         <p 
                              className='my-2'
                         >Chưa có tài khoảng, 
                              <span
                                   className='text-green-600 ml-1 hover:underline cursor-pointer'
                                   onClick={() => navigate('/big-green/dang-ky')}
                              >đăng ký tại đây</span>
                         </p>
                         <form className='grid gap-5 my-5 w-full'>
                              <input ref={emailRef} type='email'  className='pl-4 py-2 placeholder:text-gray-600 bg-gray-100'placeholder='Email'/>
                              <input ref={passwordRef} type='password'  className='pl-4 py-2 placeholder:text-gray-600 bg-gray-100'placeholder='mật khẩu'/>
                         </form>
                         <button
                              className='w-full py-3 mb-5 bg-green-600 text-white hover:text-green-600 hover:border-green-600 hover:bg-white'
                              onClick={() => handleLogin()}
                         >Đăng nhập</button>
                         <p>Quên mật khẩu</p>
                         <p>Hoặc đăng nhập bằng</p>
                         <div>
                              <button></button>
                              <button></button>
                         </div>
                    </div>
               </div>
               }
          </div>
     )
}

export default LoginPage