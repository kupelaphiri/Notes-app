import React, { useEffect, useState } from 'react'



function Trashpage({isOn}) {

  const [deletedNotes, setDeletedNotes] = useState([{}])

  useEffect(()=>{
    fetch('http://localhost:5000/deleted-notes').then(res => res.json())
      .then(notes => setDeletedNotes(notes))
    
  })

  return (
    <div className="h-full w-full overflow-y-auto">
       <div className="flex justify-center w-full pt-8">
        <p>Notes in Trash are deleted after 7 days.</p>
        <button className='pl-10'>Empty Trash</button>
       </div>
       <div className={`flex h-full w-full pl-[15px]  ${isOn? 'flex-col flex-nowrap items-center' : 'flex-row flex-wrap'} items-baseline overflow-visible pr-[5px]`}>
       {deletedNotes.map((note) => {
            return (
             
                <div key={note.id} className={`w-[280px] min-h-24 max-h-[452px] overflow-visible border-[1px] mt-[20px] pl-5 pt-5 pb-2 rounded-lg mr-4 ${isOn? 'w-[597px]' : ''}`}>
                  <h2>{note.title}</h2>
                  <p>{note.body}</p>

                </div>
             
            );
          })}
       </div>

    </div>
  )
}

export default Trashpage