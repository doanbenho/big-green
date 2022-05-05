import { Routes, Route } from 'react-router-dom'
import App from './App'
import Homepage from './all-page-of-project/Homepage'
import IntroductionPage from './all-page-of-project/IntroductionPage'
import OrderPage from './all-page-of-project/OrderPage'
import NewsPage from './all-page-of-project/NewsPage'
import ContactPage from './all-page-of-project/ContactPage'
import ProductPage from './all-page-of-project/ProductPage'
import NotFoundPage from './component/NotFoundPage'
import RegisterPage from './all-page-of-project/RegisterPage'
import LoginPage from './all-page-of-project/LoginPage'
import UserPage from './all-page-of-project/UserPage'
import PaymentPage from './all-page-of-project/PaymentPage'
import CompletePayment from './all-page-of-project/CompletePayment'
import { useContext, useEffect } from 'react'
import Context from './reducer/Context'
import { isUser } from './reducer/Actions'
import SearchPage from './all-page-of-project/SearchPage'
import DetailItem from './component/DetailItem'
import ContentProductsPage from './component/ContentProductsPage'
import MainContent from './newspage/MainContent'
import ContentNews from './newspage/ContentNews'
import NotFoundPage404 from './all-page-of-project/NotFound404'

const Admin = () => {

     const consumer = useContext(Context)
     const dispatch = consumer[1]

     useEffect(() => {
          if(localStorage.getItem('login')) {
               dispatch(isUser(true))
          }
        }, [])


  return (
     <Routes>
          <Route path='/' element={<App />}>
               {/* <Route path='/' element={<Homepage />} /> */}
               <Route path='/big-green' element={<Homepage />} />
               <Route path='/big-green/trang-chu' element={<Homepage />} />
               <Route path='/big-green/gioi-thieu' element={<IntroductionPage />} />
               <Route path='/big-green/dat-hang' element={<OrderPage />} />
               <Route path='/big-green/tin-tuc' element={<NewsPage />}>
                    <Route path='' element={<MainContent />} />
                    <Route path=':id' element={<ContentNews />} />
               </Route>
               <Route path='/big-green/lien-he' element={<ContactPage />} />
               <Route path='/big-green/san-pham' element={<ProductPage />}>
                    <Route path='' element={<ContentProductsPage />} />
                    <Route path=':name' element={<DetailItem />} />
               </Route>
               <Route path='/big-green/dang-ky' element={<RegisterPage />} />
               <Route path='/big-green/dang-nhap' element={<LoginPage />} />
               <Route path='/big-green/nguoi-dung' element={<UserPage />} />
               <Route path='/big-green/tim-kiem' element={<SearchPage />} />
               <Route path='*' element={<NotFoundPage />} />
          </Route>
          <Route path='/big-green/thanh-toan' element={<PaymentPage />} />
          <Route path='/big-green/hoan-thanh-thanh-toan' element={<CompletePayment />} />
          <Route path='/big-green/not-found' element={<NotFoundPage404 />} />
          <Route path='*' element={<NotFoundPage404 />} />
     </Routes>
  )
}

export default Admin