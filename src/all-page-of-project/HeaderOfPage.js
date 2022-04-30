import { useNavigate } from 'react-router-dom'
import banner_introduction from '../image-green-food/bg_breadcrumb.webp'


const HeaderOfPage = props => {

     const navigate = useNavigate()


     return (
          <div className='w-full relative mb:h-20'>
               <img src={banner_introduction} alt=''  className='w-full h-full'/>
               <div className='absolute flex justify-center text-2xl w-full -translate-y-1/2 top-1/2 tb-mb:text-xl'>
                    <div className='flex text-white'>
                         <p 
                              className='hover:underline cursor-pointer'
                              onClick={() => navigate('/trang-chu')}
                         >Trang chủ</p>
                         <i className="fa-solid fa-arrow-right mx-5 mb:mx-3 self-center mt-1"></i>
                         <p className='text-green-500 first-letter:uppercase'>{props.title}</p>
                    </div>
               </div>
          </div>
     )
}

export default HeaderOfPage