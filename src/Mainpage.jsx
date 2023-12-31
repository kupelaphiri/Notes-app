// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { useUtilities } from './hooks/useOutsideClickDetector';

const pinnedNotes = [
  {
    title: 'Yt ideas',
    content:
      '-How to not be a simp how to get girls-delete world -how to be cool -youtube tutorials be like -gangsta with feminine names -how to clap without your hands.',
  },
  {
    title: '',
    content:
      'Cooking oil K38 Washing soap K30 Onion K10 Bread K15 Noodles K30 Sausage K50.',
  },
  {
    title: 'Addma question',
    content: 'Addma paper 2 2015 question 13 Addma 2016 question 12.',
  },
  {
    title: '',
    content: 'Lexus IS 250.',
  },
  {
    title: 'Rush hour 3.',
    content: '',
  }, 
  {
    title: 'Rush hour 3.',
    content: '',
  },
  
];

const otherNotes = [
  {
    title: 'Yt ideas',
    content:
      '-How to not be a simp how to get girls-delete world -how to be cool -youtube tutorials be like -gangsta with feminine names -how to clap without your hands.',
  },  
   {
    title: '',
    content:
      'Cooking oil K38 Washing soap K30 Onion K10 Bread K15 Noodles K30 Sausage K50.',
  },
  {
    title: 'Addma question',
    content: 'Addma paper 2 2015 question 13 Addma 2016 question 12.',
  },
  {
    title: '',
    content: 'Lexus IS 250.',
  },
  {
    title: 'Rush hour 3.',
    content: '',
  }, 
  {
    title: 'Rush hour 3.',
    content: '',
  },
]

function Mainpage() {
  const [isActive, setIsActive] = useState(false);
  const InputRef = useRef(null);
  const { useOutsideClickDetector } = useUtilities();
 
  const focus = () => {
    setIsActive(true);
  };

  const unfocus = () => {
    setIsActive(false);
  };

  useOutsideClickDetector(InputRef, unfocus);
  

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
          {pinnedNotes.map((note) => {
            return (
             
                <div key={note.title} className="w-[280px] min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] p-5 rounded-lg mr-4">
                  <h2>{note.title}</h2>
                  <p>{note.content}</p>
                </div>
             
            );
          })}
         
          
        </div>
       <p className='text-xs font-bold pl-[20px]'>OTHERS</p>

        <div className='flex flex-row h-[500px] pl-[15px] overflow-hidden items-baseline pr-[5px]'>
       {otherNotes.map((note) => {
        return (
           <div key={note.title} className="w-[280px] min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] p-5 rounded-lg mr-4">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
         </div>
        );
       })}
       </div>
        {/* <div className='flex flex-col w-full mt-40'>
      <div className=' w-100px h-100px ml-20'>
       <p>OTHERS</p>
       </div>
       <div className='flex flex-row '>
       <div className='w-1/4 h-100px border-2 mt-5 ml-20 p-5 rounded-lg'>
        <h2>YT video ideas</h2>
        <p>Body shamming <br />
What I fear about marriage. <br />
Not everyone can be included in everything. <br /> 
NBA youngboy is trash</p>
       </div>
       <div className='w-1/4 h-100px border-2 mt-5 ml-5 p-5 rounded-lg'>
        <h2>YT video ideas</h2>
        <p>Body shamming <br />
What I fear about marriage. <br />
Not everyone can be included in everything. <br /> 
NBA youngboy is trash</p>
       </div>
       <div className='w-1/4 h-100px border-2 mt-5 ml-5 p-5 rounded-lg'>
        <h2>YT video ideas</h2>
        <p>Body shamming <br />
What I fear about marriage. <br />
Not everyone can be included in everything. <br /> 
NBA youngboy is trash</p>
       </div>
     </div>
   </div> */}
      </div>
    </div>
  );
}

export default Mainpage;
