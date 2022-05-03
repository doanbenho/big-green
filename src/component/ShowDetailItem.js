import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../reducer/Context'
import { addItem, openCart, setData, itemAwait } from '../reducer/Actions'



const ShowDetailItem = () => {
     
     const navigate = useNavigate()
     const consumer = useContext(Context)
     const { data_item, is_user } = consumer[0]
     const dispatch = consumer[1]


     const [ quantity, setQuantity ] = useState(1)


     const handleBuyItem = () => {
          localStorage.setItem('quantity', quantity)
          if(is_user) {
               dispatch(addItem(data_item))
               dispatch(openCart(true))
          } else {
               navigate('/dang-nhap')
               dispatch(itemAwait(data_item))
          }
          dispatch(setData([]))
          setQuantity(1)
     }


     return (
          <section className='fixed top-0 left-0 w-full h-full z-10 justify-center items-center'
               style={data_item.length === 0 ? {'display': 'none'} : {'display': 'flex'}}
          >
               <span className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'
                    onClick={() => {
                         dispatch(setData([]))
                         setQuantity(1)
                    }}
               ></span>
               <div className='w-2/3 bg-white z-10 grid grid-cols-2 gap-5 px-5 py-10 mb:flex flex-col mb:w-5/6 sm:w-5/6'>
                    <div className='border-2'>
                         <img src={data_item.image} alt='' />
                    </div>
                    <div className=''>
                         <p className='text-2xl hover:text-green-500 mb:text-xl sm:text-xl'>{data_item.name}</p>
                         <div className='flex items-center my-5'>
                              <p className='text-3xl mr-5 text-green-500 font-semibold mb:text-xl mb:font-bold sm:text-xl sm:font-bold'>{data_item['new-price']}<sup>đ</sup></p>
                              {
                                   (data_item.length === undefined && data_item.sell.isSell)
                                   &&
                                   <p className='line-through text-neutral-500 font-semibold text-lg mb:text-base mb:font-thin sm:text-base sm:font-thin'>{data_item.sell['old-price']}<sup>đ</sup></p>
                              }
                         </div>
                         <div>
                              <p className='mb-5 mb:leading-5'>Thông tin sản phẩm đang cập nhật</p>
                              <div className='flex items-center'>
                                   <p>Số lượng</p>
                                   <div className='flex items-center border-2 ml-5 mb:ml-2  sm:ml-3'>
                                        <p className='px-7 text-lg md:px-5'>{quantity}</p>
                                        <div className='grid grid-rows-2 border-l-2 text-lg'>
                                             <button className='border-b-2 px-2'
                                                  onClick={() => {
                                                      setQuantity(prev => prev + 1)
                                                  }}
                                             >+</button>
                                             <button
                                                  onClick={() => {
                                                       if(data_item.amount < 2) {
                                                            setQuantity(1)
                                                       } else {
                                                            setQuantity(prev => prev - 1)
                                                       }}
                                                  }
                                             >-</button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='mt-5'>
                              <button className='px-5 py-3 bg-orange-500 text-white text-xl rounded-xl mb:w-full mb:px-2 mb:text-base sm:px-3 sm:text-base'
                                   onClick={() => handleBuyItem()}
                              >Thêm vào giỏ hàng</button>
                         </div>
                    </div>
               </div>
          </section>
  )
}

export default ShowDetailItem