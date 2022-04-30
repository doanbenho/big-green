import { useNavigate } from 'react-router-dom'
import ItemNews from '../all-page-of-project/ItemNews'
import { news_homepage } from '../map-content/MapContent'
import Slider from 'react-slick'
import './DemoProducts.css'


const NewsHomepage = () => {

     const config = {
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    }
               },
               {
                    breakpoint: 768,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1
                    }
               }
          ]
     }

     const navigate = useNavigate()

     return (
    <div className='flex justify-center py-20'>
         <div className='width-screen'>
               <p 
                    className='text-4xl text-center mb-10 font-semibold uppercase cursor-pointer hover:text-green-500 sm:text-3xl mb:text-2xl'
                    onClick={() => navigate('/tin-tuc')}
               >tin tức nông nghiệp</p>
               <Slider {...config} className='contaienr-newhome'>
                    {
                         news_homepage ?
                         news_homepage.map(item => (
                              <ItemNews item={item} key={item.id} />
                         ))
                         :
                         <p>loading ...</p>
                    }
               </Slider>
          </div>
     </div>
  )
}

export default NewsHomepage


/* <div className='flex justify-center py-20'>
<div className='width-screen'>
      <p 
           className='text-4xl text-center mb-10 font-semibold uppercase cursor-pointer hover:text-green-500'
           onClick={() => navigate('/tin-tuc')}
      >tin tức nông nghiệp</p>
      <div className=' grid grid-cols-3 gap-10'>
           {
                news_homepage.map(item => (
                     <ItemNews item={item} key={item.id} />
                ))
           }
      </div>
</div>
</div>*/ 