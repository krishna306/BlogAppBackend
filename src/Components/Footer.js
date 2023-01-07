import React from 'react'
const year  = new Date().getFullYear();
function Footer() {
  return (
    <div className='bg-light mt-4 py-4 text-center'>Copyright {year} @Krishna Kumar</div>
  )
}

export default Footer