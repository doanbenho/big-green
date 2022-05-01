import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../reducer/Context'
import { icon_hiden_product } from '../map-content/MapContent'
import { addItem, itemAwait, itemLove, openCart, setData } from '../reducer/Actions'
import { gototop } from '../map-content/ContentNews'

export const PaternProduct = props => {

     const navigatee = useNavigate()

     const consumer = useContext(Context)
     const { is_user } = consumer[0]
     const dispatch = consumer[1]
     const item = props.item
     
     const takeData = (target, index, data) => {
          if(index === 1) {
               dispatch(setData(data))
          } else if (index === 2) {
               if(is_user || localStorage.getItem('login')) {
                    data.amount = 1
                    dispatch(addItem(data))
                    dispatch(openCart(true))
               } else {
                    navigatee('/dang-nhap')
                    dispatch(itemAwait(data))
               }
          } else {
               dispatch(itemLove(data))
          }
     }

     const onOpenDetail = (target, item) => {
          if ( target.className.includes('show-choice-product') ) {
               navigatee(`/san-pham/${item.name}`)
               gototop()
          }
     }

  return (
          <div 
               className='product relative pb-8 md:mx-5 sm:mx-2'
          >
               <div className='product relative rounded-lg overflow-hidden'>
                    <img src={item.image} alt='' className='w-full'/>
                    {
                         item.sell.isSell 
                         &&
                         <div className='absolute top-0 right-0 w-1/5 h-8 bg-orange-400 text-white flex items-center justify-center rounded-bl-xl'>
                              <p 
                                   style={{'fontSize': '10px'}}
                              >{item.sell['per-sell']}</p>
                         </div>
                    }
                    <div 
                         className='show-choice-product bg-white bg-opacity-80 items-center justify-around text-3xl tb-mb:text-xl'
                         onClick={e => onOpenDetail(e.target, item)}
                    >
                         {
                              icon_hiden_product.map((item, index) => (
                                   <div 
                                        key={index}
                                        className='item bg-white rounded-full flex items-center justify-center p-3 md:text-3xl tb-mb:p-2 mb:text-sm'
                                        style={{'color': '#339538', 'border': '2px solid #339538'}}
                                        onClick={e => takeData(e.target, index+1, props.item)}
                                   >
                                        {item}
                                   </div>
                              ))
                         }
                    </div>
               </div>
               <div className='flex flex-col items-center'>
                    <p className='my-3 text-neutral-600 text-center text-lg font-mono mb:text-base'>{item.name}</p>
                    <div className='flex items-center  '>
                         <p className='text-orange-400 text-2xl font-bold mr-5 mb:text-lg'>{item['new-price']}<sup>đ</sup></p>
                         {
                              item.sell.isSell && <p className='line-through text-neutral-500 font-semibold text-lg'>{item.sell['old-price']}<sup>đ</sup></p>
                         }
                    </div>
               </div>
          </div>
  )
}
