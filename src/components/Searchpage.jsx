import React, {useState, useCallback} from 'react'
import { useOutletContext } from "react-router-dom";
import Masonry from "react-masonry-css";
import { TextareaAutosize } from "@mui/material";
import useGlobal from '../hooks/useGlobal';
import "./Mainpage.css";
import Modal from "./Modal";



function Searchpage() {
const {searchResults} = useGlobal()
const {isDark} = useGlobal()
const [open, setOpen] = useState(false);
const [modalData, setModalData] = useState(null);
const [modalTitle, setModalTitle] = useState(null);
const [modalBody, setModalBody] = useState(null);

const editNote = useCallback(
  (e) => {
    e.preventDefault();
    const noteid = modalData._id;
    const { title, body } = { title: modalTitle, body: modalBody };
   

    fetch(`${BASE_URL}/edit-note`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        noteid,
        title,
        body,
      }),
    }).then(async (res) => {
      console.log(res);
      if (res.ok) {
        setOpen(false);
        getNotes();
      }
    });
  },
  [modalTitle, modalBody]
);




const breakpointColumnsObj = {
    default: 7,
    1831: 6,
    1600: 5,
    1560: 4,
    1307: 3,
    1033: 2,
    792: 1,
  };


  return (
    <div className={`flex flex-col h-screen ${isDark? 'bg-dim' : 'bg-white'} w-full overflow-y-auto pb-[100px]`}>
    {searchResults.length === 0 && 
      <div className='w-full h-full flex items-center justify-center flex-col'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-[100px] ${isDark? 'text-gray-400' : 'text-gray-300'}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
   <p className={`${isDark? 'text-gray-400': 'text-gray-600'} mt-[20px]`}>Search results will appear here</p>
      </div>
      }

      {searchResults === null && 
      <div>No search matches</div>
      }
         <div className={`w-full overflow-visible pb-[20px]`}>
         <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={`my-masonry-grid pl-10`}
                    columnClassName="ny-masonry-grid-column"
                  >
                    {searchResults.map((note) => {
                      return (
                        <div
                          key={note.id}
                          className={`flex flex-col group cursor-pointer hover:shadow-lg flex-1 min-h-24 text-ellipsis max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-lg mr-4 `}
                        >
                          <div
                            className="w-full h-full pr-3 pl-3 overflow-hidden mb-6 pb-9"
                            onClick={() => {
                              setModalData(note);
                              setModalTitle(note);
                              setModalBody(note);
                              setIsModalOpen(true);
                            }}
                          >
                            <h2
                              className={`text-xs ${
                                isDark ? "text-white" : ""
                              }`}
                            >
                              {note.title}
                            </h2>
                            <p
                              className={`text-xs ${
                                isDark ? "text-white" : ""
                              }`}
                            >
                              {note.body}
                            </p>
                          </div>
                          <div className="flex flex-row justify-end pr-1 h-full w-full">
                            <svg
                              onClick={() => unarchive(note._id)}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`invisible ${
                                isDark ? "text-gray-400" : ""
                              } group-hover:visible w-[20px] cursor-pointer`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <svg
                              onClick={() => deleteNote(note._id)}
                              className={`invisible group-hover:visible ${
                                isDark ? "text-gray-400" : ""
                              } w-[20px] cursor-pointer`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </Masonry>
   </div>
   {open === true && (
                  <Modal isOpen={open}>
                    <div className="flex flex-row-reverse w-full h-full">
                      <svg
                        onClick={() => {
                          setOpen(false);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 cursor-pointer"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div className="h-full w-full overflow-y-auto">
                      <input
                        value={modalTitle.title}
                        className={`outline-none ${
                          isDark ? "text-white" : ""
                        } bg-inherit`}
                        onKeyUp={(e) => setModalTitle(e.target.value)}
                      />
                      <div className="w-full h-full overflow-y-auto">
                        <TextareaAutosize
                          className={`w-full bg-inherit ${
                            isDark ? "text-white" : ""
                          } outline-none  text-sm resize-none`}
                          onChange={(e) => setModalBody(e.target.value)}
                        >
                          {modalBody.body}
                        </TextareaAutosize>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-row">
                      <svg
                        onClick={() => deleteNote(modalData._id)}
                        className="hidden-content w-[20px] ml-[2px] cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        onClick={() => archiveNote(modalData._id)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="hidden-content w-[20px] cursor-pointer"
                      >
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path
                          fillRule="evenodd"
                          d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      </div>
                      <button
                        onClick={editNote}
                        className="p-1 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  </Modal>
                )}
              
    </div>

  )
}

export default Searchpage