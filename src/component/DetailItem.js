import { useParams } from 'react-router-dom'
import { content_products } from '../map-content/MapContent'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../reducer/Context'
import { addItem, openCart, setData, itemAwait } from '../reducer/Actions'

const DetailItem = () => {

     const { name } = useParams()

     let get_item = content_products.find(item => {
          return item.name === name 
     })


     const consumer = useContext(Context)
     const { is_user } = consumer[0]
     const dispatch = consumer[1]
     const navigate = useNavigate()
     const [ quantity, setQuantity ] = useState(get_item.amount)
     const [ itemBuy, setItemBuy ] = useState(false)
     const [ itemAdd, setItemAdd ] = useState(false)


     const handleOpenContext = target => {
          const context = document.querySelector('.context')
          const opacity_context = document.querySelector('.opacity-context')
          console.log(context)
          if(context.style.height !== "auto") {
               context.style.height = "auto"
               opacity_context.style.display = 'none'
               target.innerHTML = 'Thu Gọn'
          } else {
               context.style.height = "24rem" 
               opacity_context.style.display = 'block'
               target.innerHTML = 'Xem thêm'
          }
     }

     useEffect(() => {
          if(itemAdd) {
               // get_item.amount = quantity
               localStorage.setItem('quantity', quantity)
               if(is_user) {
                    dispatch(addItem(get_item))
                    dispatch(openCart(true))
               } else {
                    navigate('/big-green/dang-nhap')
                    dispatch(itemAwait(get_item))
               }
               dispatch(setData([]))
               setItemAdd(false)
          }
          setQuantity(1)
     }, [itemAdd])
     
     
     useEffect(() => {
          if(itemBuy) {
               localStorage.setItem('quantity', quantity)
               if(is_user) {
                    dispatch(addItem(get_item))
                    navigate('/big-green/thanh-toan')
               } else {
                    navigate('/big-green/dang-nhap')
                    dispatch(itemAwait(get_item))
               }
               dispatch(setData([]))
               setItemBuy(false)
          }
          setQuantity(1)
     }, [itemBuy])

  return (
     <div className='width-screen mt-10 mb-20'>
          <div className='flex sm:flex-col mb:flex-col'>
               <div className='w-1/2 border-2 mr-5 mb:w-full sm:w-full'>
                    <img src={get_item.image} alt='' className='w-full' />
               </div>
               <div className='flex-1'>
                    <p className='text-3xl font-semibold mb:mt-3 mb:text-orange-500'>{get_item.name}</p>
                    <div className='flex my-3 mb:flex-col'>
                         <p className='text-lg'><span className='font-semibold'>Thương hiệu:</span> Limited</p>
                         <p className='mx-2 mb:hidden'>l</p>
                         <p className='text-lg'><span className='font-semibold'>Tình trạng:</span> Còn hàng</p>
                    </div>
                    <div className='flex items-center mb-5'>
                         <p className='text-3xl font-semibold text-green-500'>{get_item['new-price']}</p>
                         {
                              get_item.sell.isSell
                              &&
                              <React.Fragment>
                                   <p className='mx-5 line-through text-xl opacity-50'>{get_item.sell['old-price']}</p>
                                   <p className='px-2 bg-orange-600 rounded-sm text-white font-bold'>{get_item.sell['per-sell']}</p>
                              </React.Fragment>
                         }
                    </div>
                    <div className='flex items-center py-6 border-t-2 border-b-2'>
                         <p>Số lượng</p>
                         <div className='flex items-center border-2 ml-5 mb:ml-2 sm:ml-3'>
                              <p className='px-7 text-lg mb:px-7 sm:px-5'>{quantity}</p>
                              <div className='grid grid-rows-2 border-l-2 text-lg'>
                                   <button className='border-b-2 px-2'
                                        onClick={() => {
                                             setQuantity(prev => prev + 1)
                                        }}
                                        >+</button>
                                   <button
                                        onClick={() => {
                                             if(quantity < 2) {
                                                  setQuantity(1)
                                             } else {
                                                  setQuantity(prev => prev - 1)
                                             }}
                                        }
                                   >-</button>
                              </div>
                         </div>
                    </div>
                    <p className='my-8'><i>Mô tả đang cập nhật</i></p>
                    <div className='grid grid-cols-2 tb-mb:grid-cols-1 gap-5'>
                         <div 
                              className='flex flex-col items-center px-5 py-2 bg-orange-500 hover:bg-green-600 cursor-pointer text-white rounded-xl lg:px-3'
                              onClick={() => setItemBuy(true)}              
                         >
                              <p className='text-xl font-semibold'>MUA NGAY</p>
                              <p className='text-sm'>Giao hàng tận tay quý khách</p>
                         </div>
                         <div 
                              className='flex flex-col items-center px-5 py-2 bg-orange-100 hover:bg-green-600 cursor-pointer hover:text-white hover:border-green-600 text-orange-500 border-2 border-orange-500 rounded-xl lg:px-3'
                              onClick={() => setItemAdd(true)}                                           
                         >     
                              <p className='text-xl font-semibold'>CHO VÀO GIỎ</p>
                              <p className='text-sm'>Thêm vào giỏ hàng để chọn tiếp</p>
                         </div>
                    </div>
               </div>
          </div>
          <div className='mt-10 flex flex-col'>
               <p className='max-w-max px-10 py-2 bg-green-600 text-white text-xl font-semibold rounded-t-lg'>Mô tả sản phẩm</p>
               <div className='context relative h-96 pt-10 border-t-2 text-lg text-justify overflow-hidden'>
                    <span className='opacity-context'></span>
                    <p className='mb-5'>(Mô tả mang tính chất ví dụ)</p>
                    <p className='mb-5'>Chuối là một loại thực phẩm, đồng thời cũng là một dược liệu thiên nhiên để hỗ trợ cho nhiều căn bệnh. So với quả táo, chuối có hàm lượng carbohydrate cao gấp 2 lần, protein cao gấp 4 lần, vitamin A và sắt cao gấp 5 lần, những loại vitamin và khoáng chất khác cao gấp 2 lần, hàm lượng phosphorus cao gấp 3 lần.</p>
                    <p className='mb-5'>Nhớ lại trận bão larry ở queensland năm 2005 đã tàn phá hầu như toàn bộ các vườn chuối trên tiểu bang này (queensland là “thủ đô” chuối của Úc), khiến giá cả chuối tăng lên gấp 10 lần. Lúc này, các bệnh nhân cao huyết áơ “lục đục” rủ nhau đến dịch vụ chăm sóc y tế để… đòi tiền mua chuối, nhưng vì chưa có ai lo xa đến tình huống này nên dịch vụ này cũng đành “bó tay”. Kể câu chuyện này ra, chỉ muốn nói lên tầm quan trọng của loại trái cây dân dã này.</p>
                    <p className='mb-5'>Chuối là một loại thực phẩm, đồng thời cũng là một dược liệu thiên nhiên để hỗ trợ cho nhiều căn bệnh. So với quả táo, chuối có hàm lượng carbohydrate cao gấp 2 lần, protein cao gấp 4 lần, vitamin A và sắt cao gấp 5 lần, những loại vitamin và khoáng chất khác cao gấp 2 lần, hàm lượng phosphorus cao gấp 3 lần.</p>
                    <p className='mb-5'>Trong chuối, hàm lượng kali (potassium) chiếm tỉ lệ rất cao, chứa nhiều loại đường thiên nhiên như: fructose, sucrose, glucose, cung cấp một năng lượng dồi dào cho cơ thể. Hai quả chuối có thể cung cấp năng lượng cho 90 phút luyện tập thể thao. Không những thế, chuối còn giúp điều trị một số bệnh, nhờ đó, chuối được xếp vào hạng “top” trong thực đơn hàng ngày.</p>
                    <p className='mb-5'>Chuối là nguồn cung cấp fructooligosaccharides, một chất quan trọng để nuôi dưỡng những loại vi khuẩn có lợi trong đường ruột, giúp chức năng ruột hoạt động tốt hơn, nhờ đó, cơ thể sẽ hấp thu vitamin và các chất dinh dưỡng một cách hiệu quả hơn. Sự tăng hấp thu này sẽ đem nhiều canxi hơn tới xương chúng ta, giúp cho bộ xương vững chắc hơn.</p>
                    <p className='mb-5'>Đối với dạ dày, những hợp chất có trong quả chuối sẽ giúp nuôi dưỡng tế bào thành ruột, tạo nên một hàng rào dịch nhầy vững mạnh có đủ sức để chiến đấu chống lại những loại vi khuẩn gây lở loét dạ dày.</p>
                    <p className='mb-5'>Khi chúng ta bị tiêu chảy (đặc biệt trong mùa dịch tiêu chảy), chuối có thể cung cấp tức thời các chất điện giải mà cơ thể bị mất, trong đó, kali là chất quan trọng nhất. Kali là một loại khoáng chất quan trọng giúp mang oxy tới não, điều hòa nhịp tim và cân bằng nước trong cơ thể.</p>
                    <p className='mb-5'>Nhờ hàm lượng cao kali và hàm lượng thấp natri có trong chuối đã giúp chuối vươn lên hàng thực phẩm “vua” trong việc hạ huyết áp và giảm nguy cơ đột quị. Theo tạp chí The New England Journal of Medicine, ăn chuối đều đặn có thể làm giảm tần suất tử vong do đột quị tới 40%. Hiện tại, FDA đã cho phép các công ty chuối đóng “mác” giảm huyết áp và ngăn ngừa đột quị trên các bao bì sản phẩm của họ.</p>
                    <p className='mb-5'>Khi bị táo bón, ăn chuối sẽ được cung cấp chất xơ, vốn làm gia tăng chức năng ruột. Khi mắc các chứng bệnh về dạ dày, chuối cũng giúp cải thiện triệu chứng do chứa những chất có tác dụng làm giảm độ acid (antacid).</p>
                    <p className='mb-5'>Trong chuối cũng chứa một hàm lượng cao sắt, kích thích cơ thể tạo ra hemoglobin giúp ngăn chặn sự thiếu máu. Một hợp chất khác có trong chuối là tryptophan, chất này vào cơ thể sẽ được chuyển hóa thành serotonin. Đây là một chất hóa học giúp điều hòa trạng thái cơ thể. Cùng với serotonin, những vitamin nhóm B trong chuối cũng giúp điều hòa glucose huyết (nồng độ glucose huyết sẽ ảnh hưởng đến trạng thái tinh thần).</p>
                    <p className='mb-5'>Những loại đường thiên nhiên có trong chuối giúp điều hòa nồng độ đường huyết, giúp cải thiện tình trạng stress do thực phẩm gây ra, giúp cải thiện sức khỏe cho thai phụ. Chuối thường được “ăn dặm” sau những bữa ăn sẽ có tác dụng kiểm soát nồng độ đường huyết.</p>
              </div>
              <button className='border-2 max-w-max px-8 py-2 self-center text-lg mt-5'
                    onClick={e => handleOpenContext(e.target)}
              >Xem thêm</button>
          </div>
     </div>
  )
}

export default DetailItem