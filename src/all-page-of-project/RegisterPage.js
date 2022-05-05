import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../reducer/Context'
import HeaderOfPage from './HeaderOfPage'



const RegisterPage = () => {

     const consumer = useContext(Context)
     const { is_user } = consumer[0]
     const navigate = useNavigate()

  return (
     <div className='w-full flex flex-col items-center'>
          <HeaderOfPage title="đăng ký" />
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
                    > Đã có tài khoản, đăng nhập 
                         <span
                              className='text-green-600 ml-1 hover:underline cursor-pointer'
                              onClick={() => navigate('/big-green/dang-nhap')}
                         >tại đây</span>
                    </p>
                    <form className='grid gap-5 my-5 w-full'>
                         <input type='text' className='pl-4 py-2 placeholder:text-gray-600 bg-gray-100'placeholder='Họ'/>
                         <input type='text'  className='pl-4 py-2 placeholder:text-gray-600 bg-gray-100'placeholder='Tên'/>
                         <input type='email'  className='pl-4 py-2 placeholder:text-gray-600 bg-gray-100'placeholder='Email'/>
                         <input type='number'  className='pl-4 py-2 placeholder:text-gray-600 bg-gray-100' placeholder='Số điện thoại'/>
                         <input type='password'  className='pl-4 py-2 placeholder:text-gray-600 bg-gray-100'placeholder='mật khẩu'/>
                         <button
                              className='w-full py-3 bg-green-600 text-white hover:text-green-600 hover:border-green-600 hover:bg-white'
                         >Đăng ký</button>
                    </form>
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

export default RegisterPage