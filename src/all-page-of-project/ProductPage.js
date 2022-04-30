import { Outlet } from 'react-router-dom'
import HeaderOfPage from './HeaderOfPage'

const ProductPage = () => {

return (
    <div className='w-full flex flex-col items-center'>
          <HeaderOfPage title='sản phẩm'/>
          <Outlet />
    </div>
  )
}

export default ProductPage
     
     