// eslint-disable-next-line no-unused-vars
import React from 'react'

function Sidebar({isOpen}) {
const sidebarOptions = [{
  title: 'Notes',
  id: 1,
  icon:  <svg xmlns="http://www.w3.org/2000/svg" className='left-[25px] w-[25px]' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
 </svg>
}, {
  title: 'Archive',
  id: 2,
  icon:   <svg xmlns="http://www.w3.org/2000/svg" className='top-[10px] left-[25px] w-[25px]' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>
}, {
  title: 'Trash',
  id: 3,
  icon:  <svg xmlns="http://www.w3.org/2000/svg" className='top-[10px] left-[25px] w-[25px]' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
}]

  return (
    <div className={`flex flex-col h-full shrink-0 pt-3  ${isOpen? 'w-[280px]' : 'pl-[12px]'} `}>
     {sidebarOptions.map((option) => {
      return ( <div key={sidebarOptions.id} className={`flex flex-row items-center h-[48px] w-full cursor-pointer ${isOpen? 'rounded-r-3xl pl-[12px]' : 'rounded-full'} hover:bg-gray-200`}>
      <div className='px-[12px]'>
       {option.icon}
       </div>
       {isOpen && <p className='ml-[20px]'>{option.title}</p>}
      </div>)})}
    </div>
  )
    }

export default Sidebar