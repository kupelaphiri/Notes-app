// eslint-disable-next-line no-unused-vars
import React from 'react';

const notes = [{
  title: 'Yt ideas',
  content: '-How to not be a simp how to get girls-delete world -how to be cool -youtube tutorials be like -gangsta with feminine names -how to clap without your hands',
}, {
  title: '',
  content: 'Cooking oil K38 Washing soap K30 Onion K10 Bread K15 Noodles K30 Sausage K50',
}, {
  title: 'Addma question',
  content: 'Addma paper 2 2015 question 13 Addma 2016 question 12'
}, {
  title: '',
  content: 'Lexus IS 250'
}, {
  title: 'Rush hour 3',
  content: ''
}]

function Mainpage() {
  return (
    <div className="flex-1 h-full overflow-y-auto">
      <div className="flex justify-center ">
        <div className="m-8 h-[46px] bg-white w-[598px] border rounded-lg pl-5 shadow-lg">
          <input
            className="w-[400px] h-[42px] outline-none placeholder-black"
            placeholder="Take a note..."
          />
        </div>
      </div>
     
          <div className="flex flex-col w-full pr-4 mb-40">
            
              <p>PINNED</p>
            <div className='flex flex-row justify-between'>
            {notes.map((note) => {
               return (
            <div key={note.title} className="flex flex-row ">
              <div className="w-[280px] h-full border-2 mt-[20px] p-5 rounded-lg">
                <h2>{note.title}</h2>
                <p>
                 {note.content}
                </p>
              </div>
            
              
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
