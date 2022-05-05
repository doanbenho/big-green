import banner_sidebar from '../image-green-food/banner_sidebar.webp'
import { navigate } from '../map-content/MapContent'
import { Link } from 'react-router-dom'
import { PaternProduct } from './PaternProduct'
import React, { useEffect, useState } from 'react'
import { removeAccents } from '../function/removeAccents'
import { setupproducts } from '../fakeAPI'
import { gototop } from '../map-content/ContentNews'
import { useNavigate } from 'react-router-dom'


setupproducts()

const choses = ['Giá tăng dần', 'Giá giảm dần', 'A - Z', 'Z - A']

const ContentProductsPage = () => {
     
     const [ value, setValue ] = useState(1000000)
     const [ showItems, setShowItems ] = useState([])
     const [ dots, setDots ] = useState([])
     const [ showBanner, setShowBanner ] = useState(false)
     const [ totalItems, setTotalItems ] = useState([])
     const [ count, setCount ] = useState(1)
     const navigates = useNavigate()



     useEffect(() => {
          fetch("/api/products")
          .then(res => res.json())
          .then(res => setTotalItems(res.products))
          .catch(err => console.log(err))

     }, [])

     useEffect(() => {
          if(totalItems) {
               setDots([])
               const numbers = Math.ceil(totalItems.length / 12)
               for (let i = 1; i < numbers + 1; i++) {
                    setDots(prev => [...prev, i])
               }
               setShowItems(totalItems.slice(0, 12))
          }
     }, [totalItems])


     const handleChange = (target) => {
          let giatri = Number(target.value)
          setValue(giatri)
     }


     const handleGetItem = value => { 
          setShowItems(totalItems.slice(12*(value - 1), 12*value))
          gototop()
     }
 

     // lọc giá sản phẩm theo giá trị của thanh lọc
     const handleSortPrice = () => {
          const getItem = []
          totalItems.forEach(item => {
               if( Number(item['new-price'].replace('.', '').replace('.', '')) <= value ) {
                    getItem.push(item)
               }
          })
          setTotalItems(getItem)
          handleHideRangeProducts()
          setShowBanner(false)
     }

     // sấp xếp sản phẩm tự lựa chọn
     const handleSortItems = (target, index) => {
          if(index === 0) {
               totalItems.sort((a, b) => {
                    return a['new-price'].replace('.', '').replace('.', '') - b['new-price'].replace('.', '').replace('.', '')
               }) 
          } else if(index === 1) {
               totalItems.sort((a, b) => {
                    return b['new-price'].replace('.', '').replace('.', '') - a['new-price'].replace('.', '').replace('.', '')
               }) 
          } else if(index === 2) {
               totalItems.sort((a, b) => {
                    const name_1 = removeAccents(a.name)
                    const name_2 = removeAccents(b.name)
                    if (name_1 < name_2) {
                         return -1;
                    } else if (name_1 > name_2) {
                         return 1;
                    }
                         return 0;
               }) 
          } else if(index === 3) {
               totalItems.sort((a, b) => {
                    const name_1 = removeAccents(a.name)
                    const name_2 = removeAccents(b.name)
                    if (name_1 < name_2) {
                         return 1;
                    } else if (name_1 > name_2) {
                         return -1;
                    }
                         return 0;
               }) 
          }

          const putItems = totalItems.slice(0, 12)

          setShowItems(putItems)
          setShowBanner(false)
     }

     const handleHideRangeProducts = () => {
          const range_products = document.querySelector('.range_products')
          const change = document.querySelector('.change')
          if(range_products.style.right === '0px') {
               range_products.style.right = '-100%'
               change.style.right = '0'
               setShowBanner(false)
          } else {
               range_products.style.right = '0'
               change.style.right = '80%'
               setShowBanner(true)
          }
     }

return (
    <React.Fragment>
          <div 
               className='change hidden z-20 tb-mb:block fixed top-1/2 right-0 -translate-x-1/2 bg-green-600 text-white p-2 rounded-md'
               onClick={() => handleHideRangeProducts()}
          >
               <i className="fa-solid fa-right-left text-xl"></i>
          </div>
          <div className='width-screen flex pt-10 mb-20'>
               <div className='w-1/4 tb-mb:absolute'>
                    <span className='fixed hidden top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50 tb-mb:block'
                         onClick={() => {
                              handleHideRangeProducts()
                         }}
                         style={showBanner ? {'display': 'block'} : {'display': 'none'}}
                    ></span>
                    <div className='range_products w-full flex flex-col'>
                         <p className='my-3 font-semibold text-2xl'>Danh mục sản phẩm</p>
                         <div className='grid grid-cols-1 mb-10'>
                              {
                                   navigate.map(item => (
                                        <Link 
                                             to={"/" + item['url-to']}
                                             key={item.id}
                                             className='text-lg opacity-80 hover:text-orange-500 py-3 border-b-2'
                                        >
                                             {item.title}
                                        </Link>
                                   ))
                              }
                         </div>
                         <div className='mb-10'>
                              <p className='my-3 font-semibold text-2xl'>Lọc giá sản phẩm</p>
                              <div className='flex justify-between text-lg mt-5'>
                                   <p>0</p>
                                   <p>{value.toLocaleString()}<span>đ</span></p>
                              </div>
                              <div className='w-full my-5'>
                                   <input 
                                        type='range' 
                                        className='range-value w-full' 
                                        max='1000000' 
                                        step='1000' 
                                        value={value}
                                        onChange={e => handleChange(e.target)}
                                   />
                              </div>
                              <button
                                   className='w-full py-2 text-white text-2xl bg-green-600 hover:bg-orange-500 rounded-3xl'
                                   onClick={() => handleSortPrice()}
                         >Lộc giá</button>
                         </div>
                         <div 
                              className='mb-2'
                              onClick={() => navigates('/big-green/trang-chu')}
                         >
                              <img src={banner_sidebar} alt='' className='mb:w-full'/>
                         </div>
                    </div>
               </div>
               <div className='flex-1 flex flex-col items-center ml-10 tb-mb:ml-0'>
                    <div className='content-product relative w-full flex justify-between items-center mb:flex-col'>
                         <p className='my-3 font-semibold text-2xl pr-5 bg-white'>Tất cả sản phẩm</p>
                         <div 
                              className='chose_products relative flex justify-between py-2 items-center cursor-pointer bg-white'
                              style={{'border': '1px solid #e5e5e5'}}
                         >
                              <p className='ml-5 mr-16'>Sắp xếp theo: </p>
                              <i className="fa-solid fa-chevron-down mr-3"></i>
                              <div className='absolute top-full z-50 bg-white hidden'
                                   style={{'width': 'calc(100% + 2px)', 'left': '-1px'}}
                              >
                                   {
                                        choses.map((item, index) => (
                                             <p
                                                  key={index}
                                                  className='pl-5 py-2 hover:bg-slate-50'
                                                  style={{'border': '1px solid #e5e5e5'}}
                                                  onClick={e => {
                                                       handleSortItems(e.target, index)
                                                  }}
                                             >{item}</p>
                                        ))
                                   }
                              </div>
                         </div>
                    </div>
                    <div>
                         {
                              totalItems 
                              ?
                              <div className='grid grid-cols-3 gap-10 my-10 md:grid-cols-3 sm:grid-cols-2 mb:grid-cols-2'>
                                   {
                                        showItems.map(item => (
                                             <PaternProduct item={item} key={item.id}/>
                                        ))
                                   }
                              </div>
                              :
                              <div className='flex justify-center items-center text-xl mt-10'>
                                   <p>loading ...</p>
                              </div>
                         }
                    </div>
                    <ul className='flex'>
                         {
                              dots.length > 1
                              ?
                              dots.map((item, index) => (
                                   <li
                                        key={index}
                                        className='font-semibold border-2 mx-5 rounded-lg border-black px-3 py-1 cursor-pointer mb:mx-3 mb:text-sm'
                                        style={count === item ? 
                                                  {"backgroundColor": "#16a34a", "color": "white", "borderColor": "#16a34a"} : 
                                                  {"backgroundColor": "white", "color": "black", "borderColor": "black"}
                                             }
                                        onClick={() => {
                                             setCount(item)
                                             handleGetItem(item)
                                        }}
                                   >{item}</li>
                              ))
                              :
                              null
                         }
                    </ul>
               </div>
          </div>
    </React.Fragment>
  )
}

export default ContentProductsPage