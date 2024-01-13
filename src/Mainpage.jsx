// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { useUtilities } from './hooks/useOutsideClickDetector';


function Mainpage() {
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

  // const click = () => {
  //   alert(value)
  // }
  const changeTitle = event => {
    setTitle(event.target.value)
  }

  const changeBody = event => {
    setBody(event.target.value)
  }



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
    <div className="h-full overflow-y-auto">
      <div className="flex justify-center">
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
        <div className="flex flex-row flex-wrap h-[500px] pl-[15px] items-baseline pr-[5px]">
          {backendPinnedData.map((note) => {
            return (
             
                <div key={note.id} className="w-[280px] min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pl-5 pt-5 pb-2 rounded-lg mr-4">
                  <h2>{note.title}</h2>
                  <p>{note.body}</p>
                  <svg className="w-[20px] mt-5 ml-[225px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
