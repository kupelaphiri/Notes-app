// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { useUtilities } from './hooks/useOutsideClickDetector';


function Mainpage() {
  const [isActive, setIsActive] = useState(false);
  const [backendPinnedData, setBackendPinnedData] = useState([{}])
  const [backendOtherData, setBackendOtherData] = useState([{}])
  
  const InputRef = useRef(null);
  const { useOutsideClickDetector } = useUtilities();
 
  const focus = () => {
    setIsActive(true);
  };

  const unfocus = () => {
    setIsActive(false);
  };

  useOutsideClickDetector(InputRef, unfocus);

  useEffect(() => {
    fetch('http://localhost:5000/all-notes').then(res => res.json())
    .then(notes => setBackendPinnedData(notes))
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/other').then(res => res.json())
    .then(data => setBackendOtherData(data))
  })
  

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex justify-center">
        <div
          ref={InputRef}          
          className={`flex flex-col m-8  ${isActive ? 'h-[136px]' : 'h-[46px]' } bg-white w-[598px] border rounded-lg pl-5 shadow-lg`}
        >
          <input
            className={`w-[400px] h-[42px] ${
              isActive ? 'block' : 'hidden'
            } outline-none`}
            placeholder="Title"
          />
          <input
            onFocus={focus}
            className={`w-[400px] h-[42px] outline-none placeholder-black`}
            placeholder="Take a note..."
          />
          <button onClick={unfocus} className={`${isActive? 'block' : 'hidden'} w-[80px] p-[10px] ml-[480px] hover:bg-gray-100`}>Close</button>
        </div>
      </div>

      <div className="flex flex-col w-full pr-2 h-full">
        <p className='text-xs font-bold pl-[20px]'>PINNED</p>
        <div className="flex flex-row flex-wrap h-[500px] pl-[15px] overflow-hidden items-baseline pr-[5px]">
          {backendPinnedData.map((note) => {
            return (
             
                <div key={note.id} className="w-[280px] min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] p-5 rounded-lg mr-4">
                  <h2>{note.title}</h2>
                  <p>{note.body}</p>
                </div>
             
            );
          })}
         
          
        </div>
       <p className='text-xs font-bold pl-[20px]'>OTHERS</p>

        <div className='flex flex-row h-[500px] pl-[15px] overflow-hidden items-baseline pr-[5px]'>
       {backendOtherData.map((note) => {
        return (
           <div key={note.title} className="w-[280px] min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] p-5 rounded-lg mr-4">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
         </div>
        );
       })}
       </div>
       
      </div>
    </div>
  );
}

export default Mainpage;
