import React from 'react'

const Input = props => {
  return (
    //  <input 
    //       type={props.type} 
    //       className=' mb-5 py-3 pl-5 rounded-3xl tracking-widest border-2 w-full'
    //       style={props.styling}
    //       placeholder={props.placeholder}
    //  />
    <div className='relative w-full'>
     <input 
        type={props.type} 
        className=' mb-5 py-3 pl-5 rounded-3xl tracking-widest w-full'
        style={props.styling}
        placeholder={props.placeholder}
     />     
      <p className='warning_input items-center bg-white rounded-md px-5 py-1 hidden'
          style={{'borderWidth': '1px'}}
      >
          <i className="fa-solid fa-triangle-exclamation text-lg text-yellow-400 mr-2"></i> 
                Please fill out this field.
      </p>              
    </div>
    )
}

export default Input