import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../reducer/Context'
import { decreaseItem, increaseItem, openCart, removeItem } from '../reducer/Actions'
import { gototop } from '../map-content/ContentNews'

const MenuCart = () => {

     const navigate = useNavigate()
     const consumer = useContext(Context)
     const { open_cart, items_in_cart } = consumer[0]
     const dispatch = consumer[1]


     const total_price = useMemo(() => {
     
          let total = 0
          items_in_cart.forEach(item => {
               const price = Number(item['new-price'].replace('.', '').replace('.', ''))
               total = total + price*item.amount
          })
          return total.toLocaleString() 
     }, [items_in_cart])

  return (
     <React.Fragment>    
          <div className=''>
               <span className='fixed hidden z-10 top-0 left-0 w-full h-full bg-black bg-opacity-30'
                    style={open_cart === true ? {'display': 'block'} : {'display': 'none'}}
                    onClick={() => {
                         dispatch(openCart(false))
                    }}
               ></span>
               <div className='menu-cart flex flex-col'
                    style={open_cart === true ? {'right': '0'} : {'right': '-100%'}}
               >
                    <div className='m-5 flex justify-between items-center uppercase text-lg'>
                         <p>Giỏ hàng</p>
                         <i className="fa-solid fa-xmark ml-56"
                              onClick={() => {
                                   dispatch(openCart(false))
                              }}
                         ></i>
                    </div>
                    {
                         items_in_cart.length === 0
                         ?
                         <div className='flex flex-col justify-center items-center'>
                              <i className="fa-solid fa-wallet max-w-max text-xl"
                                   onClick={() => {
                                        dispatch(openCart(false))
                                        navigate('/big-green/san-pham')
                                        gototop()
                                   }}
                              ></i>
                              <p className='text-black opacity-70 mt-2 mb-5'>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                         </div>
                         : 
                         <div className='flex-1 flex flex-col px-5'>
                              <div className='flex-1 flex flex-col overflow-auto'>
                                   {
                                        items_in_cart.map((item, index) => (
                                             <div className='flex mb-5' key={index}>
                                                  <img src={item.image} alt='' className='w-20'/>
                                                  <div className='flex-1 ml-3 flex justify-between items-center'>
                                                       <div className='flex flex-col'>
                                                            <p className=''>{item.name}</p>
                                                            <p className='my-1 text-sm'>So luong</p>
                                                            <div className='flex border-2 max-w-max cursor-pointer'>
                                                                 <button className='px-2 border-r-2'
                                                                      onClick={e => {
                                                                           dispatch(decreaseItem(item.id))
                                                                      }}
                                                                 >-</button>
                                                                 <p className='px-2'>{item.amount}</p>
                                                                 <button className='px-2 border-l-2'
                                                                      onClick={e => {
                                                                           dispatch(increaseItem(item.id))
                                                                      }}
                                                                 >+</button>
                                                            </div>
                                                       </div>
                                                       <div className='flex flex-col items-end cursor-pointer'>
                                                            <p className='text-green-600  font-semibold'>{item['new-price']}<sup>đ</sup></p>
                                                            <button
                                                                 onClick={e => {
                                                                      dispatch(removeItem(index))
                                                                 }}
                                                            >Xoa</button>
                                                       </div>
                                                  </div>
                                             </div>
                                        ))
                                   }
                              </div>
                              <div className=' w-full mb-10 mt-2'>
                                   <div className='flex justify-between mb-5'>
                                        <p>Tổng tiền:</p>
                                        <p>
                                             {total_price}  
                                        <span>đ</span></p>
                                   </div>
                                   <button 
                                        className='w-full py-2 bg-orange-500 hover:bg-green-600 font-semibold text-lg text-white rounded-3xl mt-5'
                                        onClick={() => {
                                             navigate('/big-green/thanh-toan')
                                             dispatch(openCart(false))
                                        }}     
                                   >Thanh toán</button>
                              </div>
                         </div>
                    }
               </div>
          </div>
    </React.Fragment>
  )
}

export default MenuCart