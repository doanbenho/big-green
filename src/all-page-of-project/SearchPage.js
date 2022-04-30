
import { useContext, useEffect, useState } from 'react'
import { PaternProduct } from '../component/PaternProduct'
import { removeAccents } from '../function/removeAccents'
import { content_products } from '../map-content/MapContent'
import Context from '../reducer/Context'
import HeaderOfPage from './HeaderOfPage'



const SearchPage = () => {

     const consumer = useContext(Context)
     const { search_value } = consumer[0]
     const [ products_search, setProductSearch ] = useState([])
     const [ numbers, setNumbers ] = useState(0)
     const [ dots, setDots ] = useState([])
     const [ products_show, setProductsShow ] = useState([])  
     const [ count, setCount ] = useState(1)
     

     
     useEffect(() => {

          if(search_value !== '') {
               const product_search = []
               content_products.forEach(item => {
                    let new_search_value = search_value.toLocaleLowerCase()
                    let newString = removeAccents(item.name).toLocaleLowerCase()
                         if((item.name.toLocaleLowerCase()).includes(new_search_value) || newString.includes(new_search_value))
                              product_search.push(item)
                    }
               );

               setProductSearch(product_search)
               setProductsShow(product_search.slice(0, 12))
          } else {
               setProductsShow([])
               setProductSearch([])
          }

     }, [search_value]) 

     useEffect(() => {
          setDots([])
          const numbers = Math.ceil((products_search.length / 12)) 
          setNumbers(numbers)

          for (let i = 1; i < numbers + 1; i++) {
               setDots(prev => [...prev, i])               
          }
     }, [products_search])
     

     const handleGetItemShow = value => {
          setProductsShow(products_search.slice(12*(value - 1), 12*value))
          const timer = setInterval(() => {
               document.documentElement.scrollTop -= 200;
               if(document.documentElement.scrollTop <= 0) {
                   clearInterval(timer)
               }
           }, 10)
     }

  return (
     <div className='w-full flex flex-col items-center mb-10'>
          <HeaderOfPage title="tìm kiếm" />
          <div className='width-screen flex flex-col mb-10'>
               <p className='text-center text-3xl my-10'>Có {products_search.length} kết quả tìm kiếm phù hợp</p>
               <div className='grid grid-cols-4 gap-10 md:grid-cols-3 sm:grid-cols-2 mb:grid-cols-2'>
                    {
                         products_show.map((item, index) => (
                              <PaternProduct item={item} key={item.id}/>
                         ))
                    } 
               </div>
               <div className='w-full flex justify-center'>
                    {
                         numbers > 1 
                         ?
                         <ul className='flex'>
                              {
                                   dots.map(item => (
                                        <li 
                                             className='font-semibold border-2 mx-5 border-black px-3 py-1 cursor-pointer rounded-lg'
                                             key={Number(item)}
                                             style={count === item ? 
                                                  {"backgroundColor": "#16a34a", "color": "white", "borderColor": "#16a34a"} : 
                                                  {"backgroundColor": "white", "color": "black", "borderColor": "black"}
                                             }
                                             onClick={() => {
                                                  setCount(item)
                                                  handleGetItemShow(item)
                                             }}
                                        >{item}</li>
                                   ))
                              }
                         </ul>
                         :
                         null
                    }
               </div>
          </div>
    </div>
  )
}

export default SearchPage
  // className='font-semibold border-2 border-black px-3 py-1 cursor-pointer'