import React, { useState, useEffect } from 'react'

function Archivepage({isOn}) {

  const [archivedNotes, setArchivedNotes] = useState([{}])

//displays all archived notes
  useEffect(()=>{
    fetch('http://localhost:5000/archived-notes').then(res => res.json())
      .then(notes => setArchivedNotes(notes))
    
  })

  return (
    <div className="h-full w-full overflow-y-auto">
            <div className={`flex h-full w-full pl-[15px]  ${isOn? 'flex-col flex-nowrap items-center' : 'flex-row flex-wrap'} items-baseline overflow-visible pr-[5px]`}>
       {archivedNotes.map((note) => {
            return (
             
                <div key={note.id} className={`w-[280px] min-h-24 max-h-[452px] overflow-visible border-[1px] mt-[20px] pl-5 pt-5 pb-2 rounded-lg mr-4 ${isOn? 'w-[597px]' : ''}`}>
                  <h2>{note.title}</h2>
                  <p>{note.body}</p>
                  <div className='flex flex-row'>
                  <svg onClick={()=>restoreNote(note._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-[20px] w-5 h-5 cursor-pointer">
                   <path fillRule="evenodd" d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z" clip-rule="evenodd" />
                  </svg>
                  <svg onClick={()=>permanentDelete(note._id)} className='mt-[21px] ml-1 w-5 h-5 cursor-pointer' viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h48v48H0V0z" fill="none"/>
                    <path d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"/>
                    <path d="M0 0h48v48H0z" fill="none"/>
                    </svg>
                   </div>
                </div>
             
            );
          })}
       </div>
    </div>
  )
}

export default Archivepage