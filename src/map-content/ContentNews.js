export const gototop = () => {
     let timer = setInterval(() => {
          document.documentElement.scrollTop -= 500;
     if(document.documentElement.scrollTop <= 0) {
          clearInterval(timer)
     }
}, 1)}