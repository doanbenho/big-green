import React from 'react'
import Slider from "react-slick";
import './styleComponent.css'


const PrevFooter = () => {
     const config = {
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    }
               }
          ]
     };
     return (
          <Slider {...config} 
               className='width-screen slide-prev-footer bg-orange-500'
          >
               <div className='item_slider border-r-2  tb-mb:border-none'>
                    <div className='flex flex-col items-end'>
                         <p className='font-bold text-lg'>Hỗ trợ 24/7</p>
                         <p>Liên hệ chúng tôi 24h</p>
                    </div>
                    <i className="fa-solid fa-headphones-simple text-4xl ml-5"></i>
               </div>
               <div className='item_slider border-r-2  tb-mb:border-none'>
                    <div className='flex flex-col items-end'>
                         <p className='font-bold text-lg'>Thanh toán</p>
                         <p>Bảo mật thanh toán</p>
                    </div>
                    <i className="fa-solid fa-wallet text-4xl ml-5"></i>
               </div>
               <div className='item_slider items-center'>
                    <div className='flex flex-col items-end'>
                         <p className='font-bold text-lg'>Giao hàng</p>
                         <p>Giao hàng tận nhà</p>
                    </div>
                    <i className="fa-solid fa-car-side text-4xl ml-5"></i>
              </div>
          </Slider>
     )
}

export default PrevFooter