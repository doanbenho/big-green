export const handleSendBooking = (formInputs, textarea) => {
     const condition_send = []
     for (let i = 0; i < formInputs.length; i++) {
          const input = formInputs[i];
          if( input.value === '') {
               input.nextElementSibling.style.display = 'flex'
               input.onmousedown = () => {
                    input.nextElementSibling.style.display = 'none'
               }
               setTimeout(() => {
                    input.nextElementSibling.style.display = 'none'
               }, 5000);
          } else {
               input.nextElementSibling.style.display = 'none'
               condition_send.push(true)
          }

          var textareaBoolean = true
          if(textarea !== undefined)
               if(textarea.value === '') {
                    textarea.nextElementSibling.style.display = 'flex'
                    textarea.onmousedown = () => {
                         textarea.nextElementSibling.style.display = 'none'
                    }
                    setTimeout(() => {
                         textarea.nextElementSibling.style.display = 'none'
                    }, 5000);
                    textareaBoolean = false
               } else {
                    textarea.nextElementSibling.style.display = 'none'
               }
          } 
     if(condition_send.length === formInputs.length && textareaBoolean) {
          for (let i = 0; i < formInputs.length; i++) {
               formInputs[i].value = ''
          }
          if(textarea !== undefined) textarea.value = ''
          return true
     }
}



