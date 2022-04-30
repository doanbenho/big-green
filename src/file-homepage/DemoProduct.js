import React, {useEffect, useState} from 'react'
import { PaternProduct } from '../component/PaternProduct'
import Slider from "react-slick";


const DemoProduct = props => {

     const config = {
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 0,
          rows: 2,
          arrows: false,
          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    }
               },
               {
                    breakpoint: 768,
                    settings: {
                         slidesToShow: 2,
                         slidesToScroll: 1
                    }
               }
          ]
     };
  
  
     const [ changeProduct, setChangeProduct ] = useState(1)
     const [ typeAPI, setTypeAPI ] = useState('tat-ca')
     const [ productsDemo, setProductsDemo ] = useState([])
     const [ loading, setLoading ] = useState(false)
     const navigate = props.navigate_demo
     const products = props.product_demo
  
     useEffect(() => {
          setProductsDemo(products[typeAPI])
          setLoading(true)
     }, [typeAPI, products])
  
     return (
          <div className='demo-product relative flex justify-center py-16 mb:py-5 sm:py-5'>
               <div className='width-screen flex flex-col items-center'>
                    <p className='text-4xl font-semibold uppercase sm:text-3xl mb:text-2xl'>sản phẩm</p>
                    <div className='flex py-10 mb:flex-wrap mb:py-5 sm:flex-wrap justify-center sm:py-5'>
                         {
                              navigate.map(item => (
                                   <p
                                        key={item.id}
                                        className='text-lg mx-2 px-5 py-2 text-center bg-white border-2 rounded-full cursor-pointer  mb:text-base mb:px-2 mb:py-1 sm:text-base sm:px-2 sm:py-1 my-2'
                                        style={item.id === changeProduct ? {'backgroundColor': '#339538', 'color': 'white', 'borderColor': '#339538'} : {'borderColor': '#339538'}}
                                        onClick={() => {
                                             if(item.id !== changeProduct) {
                                                  setTypeAPI(item.type)
                                                  setLoading(false)
                                                  setChangeProduct(item.id)
                                             }
                                        }}
                                   >
                                        {item.title}
                                   </p>
                              ))
                         }
                    </div> 
                    <div className='w-full'>
                         {
                              loading 
                              ?
                              <Slider {...config} className='demo_slider'>
                                   {
                                        productsDemo.map(item => (
                                             <PaternProduct item={item} key={item.id} />
                                        ))
                                   }
                              </Slider>
                              :
                              <div className='flex justify-center items-center text-xl'>
                                   <p>loaing ...</p>
                              </div> 
                         }
                    </div>
               </div>
          </div>
     )
}

export default DemoProduct
