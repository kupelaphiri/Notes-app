// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { useUtilities } from './hooks/useOutsideClickDetector';
import { json } from 'react-router-dom';


function Mainpage({isOn}) {
  const [isActive, setIsActive] = useState(false);
  const [backendPinnedData, setBackendPinnedData] = useState([{}])
  const [backendOtherData, setBackendOtherData] = useState([{}])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  
  const InputRef = useRef(null);
  const { useOutsideClickDetector } = useUtilities();
 
  const focus = () => {
    setIsActive(true);
  };

  const unfocus = () => {
    setIsActive(false);
  };

  const changeTitle = event => {
    setTitle(event.target.value)
  }

  const changeBody = event => {
    setBody(event.target.value)
  }
   
  const deleteNote = (id) => {
    console.log('id', id);
    fetch('http://localhost:5000/delete-note', {
      method: 'POST',
       headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        noteid: id
      }),
     }).then((res)=> res.json())
    }
  

  
  // const deleteNote = (id) => {
  //   console.log('id',id);
  //   fetch(`http://localhost:5000/delete-note`, {
  //     method: 'POST',
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       noteid: id
  //     }),
  //    }).then((res)=> res.json())
     
  //   // .then((result)=>{
  //   //   result.json().then((res)=>{
  //   //     console.warn(res)
      
  //     // const response = await res.json()
  //     // console.log('loser', response);
  //     // setBackendPinnedData((prev) => {
  //     //   const newArr = [...prev]
  //     //     newArr.push(response)
  //     //     return newArr
  //     //   })
  //       };
  



  useOutsideClickDetector(InputRef, unfocus);

  const handleSubmit = (e) => {
   e.preventDefault();
    const note = { title:title.trim(), body };
    console.log(title)
    
    fetch('http://localhost:5000/add-note', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(note)
    }).then(async(res) => {
     const response =  await res.json()
     console.log('wababade', response);
      setBackendPinnedData((prev) => {
        const newArr = [...prev]
          newArr.push(response)
          return newArr
      })
      console.log('new note added');
      
    })
  }


  useEffect(() => {
    fetch('http://localhost:5000/all-notes').then(res => res.json())
    .then(notes => setBackendPinnedData(notes))
  }, [])

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/other').then(res => res.json())
  //   .then(data => setBackendOtherData(data))
  // })
  
  

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex justify-center w-full">
        <div
          ref={InputRef}          
          className={`flex flex-col m-8  ${isActive ? 'h-[136px]' : 'h-[46px]' } bg-white w-[598px] border rounded-lg pl-5 shadow-lg`}
        >
          <input
          onChange={changeTitle}
            className={`w-[400px] h-[42px] ${
              isActive ? 'block' : 'hidden'
            } outline-none`}
            placeholder="Title"
           
          />
          <input
          onChange={changeBody}
            onFocus={focus}
            className={`w-[400px] h-[42px] outline-none placeholder-black`}
            placeholder="Take a note..."
          />
          <button onClick={handleSubmit} className={`${isActive? 'block' : 'hidden'} w-[80px] p-[10px] ml-[50px] hover:bg-gray-100`}>Ok</button>
          <button onClick={unfocus} className={`${isActive? 'block' : 'hidden'} w-[80px] p-[10px] ml-[480px] hover:bg-gray-100`}>Close</button>
        </div>
      </div>

      <div className="flex flex-col w-full pr-2 h-full">
        <p className='text-xs font-bold pl-[20px]'>PINNED</p>
        <div className={`flex h-full w-full pl-[15px]  ${isOn? 'flex-col flex-nowrap items-center' : 'flex-row flex-wrap'} items-baseline overflow-visible pr-[5px]`}>
          {backendPinnedData.map((note) => {
            return (
             
                <div key={note.id} className={`w-[280px] min-h-24 max-h-[452px] overflow-visible border-[1px] mt-[20px] pl-5 pt-5 pb-2 rounded-lg mr-4 ${isOn? 'w-[597px]' : ''}`}>
                  <h2>{note.title}</h2>
                  <p>{note.body}</p>
                  <svg onClick={()=>deleteNote(note._id)} className="w-[20px] mt-5 ml-[225px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                   <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                 </svg>

                </div>
             
            );
          })}
         
          
        </div>
       {/* <p className='text-xs font-bold pl-[20px]'>OTHERS</p> */}

        {/* <div className='flex flex-row h-[500px] flex-wrap pl-[15px] mb-10 overflow-hidden items-baseline pr-[5px]'>
       {backendOtherData.map((note) => {
        return (
           <div key={note.title} className="w-[280px] min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] p-5 rounded-lg mr-4">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
         </div>
        );
       })}
       </div> */}
       
      </div>
    </div>
  );
}

export default Mainpage;
