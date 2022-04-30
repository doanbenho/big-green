import slider_1 from '../image-green-food/slider_1.webp'
import { navigate_homepage } from '../map-content/MapContent'
import banner_intro from '../image-green-food/banner_intro.webp'
import img_intro from '../image-green-food/img_intro_1.webp'
import banner_1 from '../image-green-food/banner_1.webp'
import banner_2 from '../image-green-food/banner_2.webp'
import banner_3 from '../image-green-food/banner_3.webp'
import DemoProduct from '../file-homepage/DemoProduct'
import NewsHomepage from '../file-homepage/NewsHomepage'
import { navigate_demo_thuc_pham, navigate_demo_dung_cu } from '../file-homepage/APINavigatehomepage'
import { product_demo_thuc_pham, product_demo_dung_cu } from '../file-homepage/APIHomepage'
import { useEffect, useState } from 'react'

const Homepage = () => {

     const [ banner, setBanner ] = useState()
     useEffect(() => {
          setTimeout(() => {
               setBanner(slider_1)
          }, 1000);
     }, [])

  return (
     <section className='w-full'>
          <div className='w-full'>
               {
                    banner ? <img src={banner} alt=''  className='w-full '/>
                    : <p className='text-center my-96'>loading ...</p>
               }
          </div>
          <div className='w-full flex justify-center -mt-20 mb-20 tb-mb:mt-10'>
               <div className='width-screen flex justify-between  tb-mb:grid tb-mb:grid-cols-3 tb-mb:gap-5'>
                    {
                         navigate_homepage.map(item => (
                              <div
                                   key={item.id}
                                   className='flex flex-col items-center'
                              >
                                   <div className='navigate_homepage relative rounded-full bg-white flex justify-center items-center w-32 h-32 border-2 tb-mb:w-20 tb-mb:h-20'>
                                        <img src={item.image} alt='' className='w-3/4 h-3/4 rounded-full' />
                                        <span className='absolute text-lg mb:text-base hidden justify-center items-center text-center bg-black bg-opacity-50 rounded-full z-10 top-0 left-0 w-full h-full text-white'>{item.content}</span>
                                   </div>
                                   <p className='text-lg font-semibold mt-2'>{item.title}</p>
                              </div>
                         ))
                    }
               </div>
          </div>
          <div className='w-full flex justify-center pb-20'>
               <div className='width-screen grid grid-cols-2 tb-mb:flex tb-mb:flex-col-reverse'>
                    <div className='flex justify-center tb-mb:mt-10'>
                         <img src={banner_intro} alt=''/>
                    </div>
                    <div className='flex flex-col items-center'>
                         <p className='text-3xl font-mono'>Chúng tôi cung cấp</p>
                         <p className='text-5xl mb-10 mt-5 font-sans text-center font-thin text-green-600 uppercase md:text-2xl sm:text-xl tb-mb:font-semibold tb-mb:mb-5 mb:text-lg'>các sản phẩm nông sản tươi - sạch</p>
                         <p className='text-xl text-justify tb-mb:text-center leading-10 mb:text-lg'>Cửa hàng Nông sản sạch là một website cung cấp thực phẩm an toàn, nông sản sạch cho người dân. Với mong muốn mang tới mọi gia đình những thực phẩm an toàn nhất trước mối lo ngại về thực phẩm bẩn tại Việt Nam.</p>
                         <p className='text-xl w-full tb-mb:text-center self-start mt-3'>Với mục đích là "<span className='font-semibold'>Mang thiên nhiên về với căn nhà của bạn</span>"</p>
                         <div className='grid grid-cols-3 gap-5 p-2 mt-10 -ml-48 bg-white rounded-xl tb-mb:hidden'>
                              <img src={img_intro} alt='' />
                              <img src={img_intro} alt='' />
                              <img src={img_intro} alt='' />
                         </div>
                    </div>
               </div>
          </div>
          <DemoProduct navigate_demo={navigate_demo_thuc_pham} product_demo={product_demo_thuc_pham} />
          <div className='w-full flex justify-center py-20 tb-mb:py-10'>
               <div className='width-screen relative flex justify-between'>
                    <img src={banner_1} alt='' className='w-1/4 tb-mb:w-1/5'/>
                    <img src={banner_2} alt='' className='flex-1 mx-5 tb-mb:w-1/2'/>
                    <img src={banner_3} alt='' className='w-1/4 tb-mb:w-1/5'/>
               </div>
          </div>
          <DemoProduct navigate_demo={navigate_demo_dung_cu} product_demo={product_demo_dung_cu}/>
          <NewsHomepage />
     </section>
     )
}

export default Homepage