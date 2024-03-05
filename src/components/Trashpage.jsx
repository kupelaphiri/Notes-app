import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css';
import { useOutletContext } from 'react-router-dom';
import './Mainpage.css'



function Trashpage() {

  const [deletedNotes, setDeletedNotes] = useState([{}])
  const [isNotes, setIsNotes] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isOn, setIsOn] = useOutletContext()
  const [isOpen, setIsOpen] = useOutletContext()

//displays all deleted notes
  useEffect(()=>{
    fetch('http://localhost:5000/deleted-notes', {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: 'include'

    }).then(res => res.json())
      .then(notes => setDeletedNotes(notes))
    
  })

  const restoreNote = (id) => {
    console.log('id', id)
    fetch('http://localhost:5000/restore-note', {
      method: 'POST',
       headers: { "Content-type": "application/json" },
       credentials: 'include',
      body: JSON.stringify({
        notesid: id
      }),
     })
  }

const permanentDelete = (id) => {
  console.log('id', id);
  fetch('http://localhost:5000/permanent-delete-notes', {
    method: 'POST',
    headers: {"Content-type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({
      deletednoteid: id
    })
  })
}

const breakpointColumnsObj = {
  default: 7,
  1831: 6,
  1600: 5,
  1560: 4,
  1307: 3,
  1033: 2,
  792: 1
};

const deleteAll = () => {
  fetch('http://localhost:5000/delete-all', {
    method: 'POST',
    headers: {"Content-type": "application/json" },
    credentials: 'include',
    body: JSON.stringify()
  }).then(res => console.log(res));
}

  return (
    <div className="flex flex-col h-screen w-full overflow-y-auto pb-[100px]">
       <div className="flex justify-center w-full pt-8">
        <p>Notes in Trash are deleted after 7 days.</p>
        <button onClick={deleteAll} className='pl-10 text-blue-400'>Empty Trash</button>
       </div>
       {isOn ? (
        <div className={`flex w-full overflow-visible pb-[20px] pl-[15px] ${isOn? 'flex-col flex-nowrap items-center' : 'flex-row flex-wrap'} flex-1`}>
        {deletedNotes.map((note) => {
             return (
                 
                 <div key={note.id} className={`w-[280px] flex flex-col min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-lg mr-4 ${isOn? 'w-[597px]' : ''}`}>
                   <div className='w-full h-full pr-3 text-ellipsis pl-3 pb-8'>
                   <h2 className='font-bold text-xs'>{note.title}</h2>
                   <p className='text-xs'>{note.body}</p>
                     </div>
                   <div className='flex flex-row justify-end'>
                   <svg onClick={()=>restoreNote(note._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-[5px] w-[20px] cursor-pointer">
                    <path fillRule="evenodd" d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z" clip-rule="evenodd" />
                   </svg>
                   <svg onClick={()=>permanentDelete(note._id)} className='mt-[7px] mr-1 w-[20px] cursor-pointer' viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg">
                     <path d="M0 0h48v48H0V0z" fill="none"/>
                     <path d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"/>
                     <path d="M0 0h48v48H0z" fill="none"/>
                     </svg>
                    </div>
                 </div>
              
             );
           })}
           
        </div>
       ): (
        <div className={`flex w-full overflow-visible pb-[20px] justify-center pl-[15px] ${isOn? 'flex-row flex-nowrap items-center' : 'flex-row flex-wrap'} flex-1`}>
       <Masonry 
       breakpointCols={breakpointColumnsObj}
       className={`my-masonry-grid pl-10`}
       columnClassName='ny-masonry-grid-column'
       >
       {deletedNotes.map((note) => {
            return (
                
                <div key={note.id} className={`w-[280px] flex flex-col min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-lg mr-4 ${isOn? 'w-[597px]' : ''}`}>
                  <div className='w-full h-full pr-3 text-ellipsis pl-3 pb-8'>
                  <h2 className='font-bold text-xs'>{note.title}</h2>
                  <p className='text-xs'>{note.body}</p>
                    </div>
                  <div className='flex flex-row justify-end'>
                  <svg onClick={()=>restoreNote(note._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-[5px] w-[20px] cursor-pointer">
                   <path fillRule="evenodd" d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z" clip-rule="evenodd" />
                  </svg>
                  <svg onClick={()=>permanentDelete(note._id)} className='mt-[7px] mr-1 w-[20px] cursor-pointer' viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h48v48H0V0z" fill="none"/>
                    <path d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"/>
                    <path d="M0 0h48v48H0z" fill="none"/>
                    </svg>
                   </div>
                </div>
             
            );
          })}
          </Masonry>
       </div>
       )}
       

    </div>
  )
}

export default Trashpage