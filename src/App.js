import { useMemo, useState, useContext, useRef, useEffect } from 'react'
import bannerHeader from './image-green-food/banner_header_top.webp'
import logo from './image-green-food/logo.webp'
import Footer from './all-page-of-project/Footer'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { info_user, navigate } from './map-content/MapContent'
import ShowDetailItem from './component/ShowDetailItem'
import MenuCart from './component/MenuCart'
import Context from './reducer/Context'
import { openCart, searchValue } from './reducer/Actions'
import './App.css'
import './fontawesome/font-awesome/css/all.css'
import './fontawesome/font-awesome/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavbarTablet from './component/NavbarTablet'
import OpenNavbar from './component/OpenNavbar'

const App = () => {


     const searchRef= useRef()
     const consumer = useContext(Context)
     const { items_in_cart, is_user} = consumer[0]
     const dispatch = consumer[1]
     
     const [ navbar, setNavbar ] = useState(false)
     const navigater = useNavigate()
     const location = useLocation()
     const [ currentPage, setCurrentPage ] = useState('/big-reen/trang-chu')

     
     useEffect(() => {
          setCurrentPage(location.pathname)
     }, [location.pathname])

     const total_quantity = useMemo(() => {
          let total = 0
          items_in_cart.forEach(item => {
               total = total + item.amount
          })

          return total
     }, [items_in_cart])


     window.onscroll = () => {
          const y = window.pageYOffset
          if(document.querySelector('.gototop')) {
               if(y > 500) {
                    document.querySelector('.gototop').style.display = 'flex'
               } else {
                    if(document.querySelector('.gototop'))
                         document.querySelector('.gototop').style.display = 'none'
               }
          } else {
               return null
          }
     }

     const handleGototop = () => {
          const timer = setInterval(() => {
               document.documentElement.scrollTop -= 50;
               if(document.documentElement.scrollTop <= 0) {
                   clearInterval(timer)
               }
           }, 10)
        };
     
        
     const handleAccessUser = () => {
          if(is_user || localStorage.getItem('login')) {
               navigater('/big-green/nguoi-dung')
          }  else {
               navigater('/big-green/dang-nhap')     
          }

     }

     const handleSearchProducts = () => {
          dispatch(searchValue(searchRef.current.value))
          navigater('/big-green/tim-kiem')
     }
          
     return (
          <section className='w-full flex flex-col items-center'>
               <OpenNavbar open={navbar}/>
               <div>
                    <img src={bannerHeader} alt='' className='w-full h-full'/>
               </div>
               <div className='width-screen relative flex justify-between py-5 tb-mb:flex-col-reverse'>
                    <div className='w-1/3 flex items-center tb-mb:w-full'>
                         <div className='w-full p-1 border-2 border-neutral-200 rounded-full flex items-center justify-between tb-mb:w-full tb-mb:mt-5'>
                              <input
                                   ref={searchRef}
                                   className='w-5/6 pl-5 text-lg text-neutral-500 rounded-full outline-none border-none'
                                   placeholder='Tìm sản phẩm'
                                   onKeyDown={e => {
                                        if(e.key === "Enter") {
                                             handleSearchProducts()    
                                        }
                                   }}
                              />
                              <div className='flex justify-center items-center bg-green-600 rounded-full py-2 px-3 mb:py-0'>
                                   <i 
                                        className="fa-solid fa-magnifying-glass text-2xl  rounded-full text-white"
                                        onClick={() => handleSearchProducts()}
                                   ></i>
                              </div>
                         </div>
                    </div>
                    <div className='absolute tb-mb:hidden'
                         style={{'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)'}}
                         onClick={() => navigater('/big-green/trang-chu')}
                    >
                         <img src={logo} alt='' className=''/>
                    </div>
                    <div className='w-1/3 flex items-center justify-between tb-mb:justify-end tb-mb:hidden'>
                         <div className='flex max-w-max h-5/6 pl-3 pr-4 py-1 text-green-600 items-center border-2 border-neutral-200 rounded-full'>
                              <i className="fa-solid fa-phone-volume text-3xl"></i>
                              <div className='flex flex-col ml-4'>
                                   <p className=''>Hỗ trợ</p>
                                   <p className='text-2xl font-semibold'>1810  2004</p>
                              </div>
                         </div>
                         <div className='info-user relative flex h-5/6 w-14 rounded-full items-center justify-center text-3xl bg-green-600 text-white'>
                              <i 
                                   className="fa-solid fa-user"
                                   onClick={() =>handleAccessUser()}
                              ></i>
                              <div className='absolute grid grid-rows-3 shadow-2xl'>
                                   {
                                        info_user.map(item => (
                                             <Link
                                                  to={item['url-to']}
                                                  className='text-center px-5 cursor-pointer hover:text-green-600 border-b-2'
                                                  key={item.id}
                                             >{item.title}</Link>
                                        ))
                                   }
                              </div>
                         </div>
                         <div className='relative flex h-5/6 w-14 rounded-full items-center justify-center text-3xl bg-green-600 text-white tb-mb:text-lg'>
                              <i className="fa-solid fa-cart-shopping"
                                   onClick={() => {
                                        dispatch(openCart(true))
                                   }}
                              ></i>
                              <span className='absolute top-0 right-0 px-1.5 text-sm bg-orange-500 rounded-full'>{total_quantity}</span>
                         </div>
                    </div>
                    <div className='hidden tb-mb:block'>
                         <NavbarTablet setNavbar={setNavbar}/>
                    </div>
               </div>
               <div className='navigate w-full flex justify-center pt-5 tb-mb:hidden'>
                    <div className='width-screen flex justify-center'>
                         {
                              navigate.map(item => (
                                   <Link
                                        key={item.id}     
                                        to={ item['url-to']}
                                        className='text-lg lg:text-sm uppercase font-semibold cursor-pointer px-10'
                                        style={currentPage.includes(item['url-to']) ? {'color': 'orange'} : {'color': 'white'}}
                                   >
                                        {item.title}
                                   </Link>
                              ))
                         }
                    </div>
               </div>
               <Outlet />
               <Footer />
               <ShowDetailItem />
               <MenuCart />
               <span className='gototop hidden font-semibold fixed'
                         onClick={handleGototop}
                    ><i className="fa-solid fa-angle-up"></i>
               </span>
          </section>
     )
}

export default App