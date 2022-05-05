import React from 'react'
import { useNavigate } from 'react-router-dom'


const NotFoundPage404 = () => {

     const navigate = useNavigate()

  return (
     <div className='w-full flex flex-col items-center'>
          <div className='width-screen flex justify-center items-center pt-10 mb-20 text-2xl font-semibold text-green-600'>
               <div className='flex flex-col items-center'>
                    <p>Not Found 404</p>
                    <button className='px-5 py-2 bg-green-600 text-white text-sm mt-5 rounded-2xl'
                         onClick={() => {
                              navigate('/big-green/trang-chu')
                         }}
                    >comeback homepage</button>
               </div>

          </div>
     </div>
  )
}

export default NotFoundPage404