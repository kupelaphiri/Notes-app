// eslint-disable-next-line no-unused-vars
import React from 'react';

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
      {[1, 2, 3, 4, 5, 6].map(() => {
        return (
          <div className=" flex flex-col w-full mb-40">
            <div className=" w-100px h-100px ml-20">
              <p>PINNED</p>
            </div>
            <div className="flex flex-row ">
              <div className="w-1/4 h-100px border-2 mt-5 ml-20 p-5 rounded-lg">
                <h2>YT video ideas</h2>
                <p>
                  Body shamming <br />
                  What I fear about marriage. <br />
                  Not everyone can be included in everything. <br />
                  NBA youngboy is trash
                </p>
              </div>
              <div className="w-1/4 h-100px border-2 mt-5 ml-5 p-5 rounded-lg">
                <h2>YT video ideas</h2>
                <p>
                  Body shamming <br />
                  What I fear about marriage. <br />
                  Not everyone can be included in everything. <br />
                  NBA youngboy is trash
                </p>
              </div>
              <div className="w-1/4 h-100px border-2 mt-5 ml-5 p-5 rounded-lg">
                <h2>YT video ideas</h2>
                <p>
                  Body shamming <br />
                  What I fear about marriage. <br />
                  Not everyone can be included in everything. <br />
                  NBA youngboy is trash
                </p>
              </div>
            </div>
          </div>
        );
      })}

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
  );
}

export default Mainpage;
