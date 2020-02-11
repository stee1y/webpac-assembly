function creatAnalytics() {
  let counter = 0
  let isDes = false
  const listener = () => counter++

  document.addEventListener('click', listener)
  return{
    destroy(){
      document.removeEventListener('click', listener)
      isDes = true
    },
    getClick() {
      if (isDes) {
        return 'Analytics is destroyed'
      }
      return counter
    }
  }
}
window.analytics = creatAnalytics()