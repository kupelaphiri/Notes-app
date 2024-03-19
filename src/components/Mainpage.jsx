// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useUtilities } from "../hooks/useOutsideClickDetector";
import { useOutletContext } from "react-router-dom";
import Modal from "./Modal";
import Masonry from "react-masonry-css";
import "./Mainpage.css";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { removeObjectWithId } from "../utilities/Reusables"; 
import 'ldrs/ring'
import { ring } from 'ldrs'
// import { ReactComponent as empty } from "./assets/empty-21.svg";

ring.register();





function Mainpage() {
  const [isActive, setIsActive] = useState(false);
  const [backendPinnedData, setBackendPinnedData] = useState([{}]);
  const [backendOtherData, setBackendOtherData] = useState([{}]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isOn, setIsOn] = useOutletContext();
  const [isOpen, setIsOpen] = useOutletContext();

  const InputRef = useRef(null);
  const modalRef = useRef(null);
  const { useOutsideClickDetector } = useUtilities();

  const focus = () => {
    setIsActive(true);
  };

  const unfocus = () => {
    setIsActive(false);
    // handleSubmit()
  };

  const offFocus = () => {
    setOpen(false);
  };

  const getNotes = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5000/all-notes", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      })
      const notes = await res.json();
      if (notes.length == 0) {
        setBackendPinnedData(null)
        setIsLoading(false)
      } else {
        setBackendPinnedData(notes)
        setIsLoading(false)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }    
  } 

  const refreshNotes = async () => {
  
    try {
      const res = await fetch("http://localhost:5000/all-notes", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      })
      const notes = await res.json();
      if (notes.length == 0) {
        setBackendPinnedData(null)
        setIsLoading(false)
      } else {
        setBackendPinnedData(notes)
        setIsLoading(false)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }    
  } 

  


  const breakpointColumnsObj = {
    default: 7,
    1831: 6,
    1600: 5,
    1560: 4,
    1307: 3,
    1033: 2,
    792: 1,
  };

  //moves the note to trash
  const deleteNote = (id) => {
    console.log("id", id);
    fetch("http://localhost:5000/delete-note", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        noteid: id,
      }),
    }).then(async (res) => {
      const respond = await res.json();
      console.log("Delete", respond);
      setBackendPinnedData((prev) => {
        const newArr = [...prev];
        newArr.shift();
        return newArr;
      });
    });
    const currentNotes = [...backendPinnedData]
    const result = removeObjectWithId(currentNotes, id)
    setBackendPinnedData(result)
    refreshNotes()
    setOpen(false);
  };

  const archiveNote = (id) => {
    console.log("id", id);
    fetch("http://localhost:5000/archive-note", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        archivedNoteId: id,
      }),
    });
    const currentNotes = [...backendPinnedData]
    const result = removeObjectWithId(currentNotes, id)
    setBackendPinnedData(result)
    refreshNotes()
    setOpen(false);
  };

  const editNote = useCallback(
    (e) => {
      e.preventDefault();
      const noteid = modalData._id;
      console.log("noteid", noteid);
      const { title, body } = { title: modalTitle, body: modalBody };
      console.log("note", title, body);

      fetch("http://localhost:5000/edit-note", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          noteid,
          title,
          body,
        }),
      }).then(async (res) => {
        console.log(res);
        if (res.ok) {
          setOpen(false);
          getNotes()
        }
      });
    },
    [modalTitle, modalBody]
  );

  useOutsideClickDetector(InputRef, unfocus);
  useOutsideClickDetector(modalRef, offFocus);

  const handleSubmit = useCallback(
    (e) => {
      if (e) e.preventDefault();
      const note = { title: title.trim(), body: body.trim() };
      console.log(note);

      setTitle("");
      setBody("");

      fetch("http://localhost:5000/add-note", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(note),
        credentials: "include",
      }).then(async (res) => {
        try {
          console.log(res);
          const response = await res.json();
          console.log("wababade", response);
          setBackendPinnedData((prev) => {
            const newArr = [...prev];
            newArr.unshift(response);
            return newArr;
          });
          console.log("new note added");
        } catch (error) {
          console.log(error);
        }
      });
    },
    [title, body]
  );

  useEffect(() => {
   getNotes()
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/other').then(res => res.json())
  //   .then(data => setBackendOtherData(data))
  // })

 

  return (
    <>
 
    <div
        className={`h-screen flex flex-col w-full min-h-full ${isLoading? 'justify-center items-center' : ''} ${backendPinnedData == null ? 'overflow-y-hidden' : ''} overflow-y-auto pb-[100px] flex-1 shrink-0`}
      >
       {isLoading?(
      <l-ring
      size="40"
      stroke="5"
      bg-opacity="0"
      speed="2" 
      color="black" 
    ></l-ring>
      ): (
        <div>
     <div className="flex justify-center w-full">
          <div
            ref={InputRef}
            className={`flex flex-col m-8  ${
              isActive ? "min-h-[136px]" : "h-[46px]"
            } bg-white w-[598px] border rounded-lg pl-5 shadow-lg`}
          >
            <input
              onChange={(e) => setTitle(e.target.value) }
              className={`w-[400px] h-[42px] mb-2 mt-2 ${
                isActive ? "block" : "hidden"
              } outline-none`}
              placeholder="Title"
              value={title}
            />
            <TextareaAutosize
              onChange={(e)=> setBody(e.target.value)}
              onFocus={focus}
              className={`w-[400px] h-auto outline-none resize-none ${
                isActive ? "" : "mt-1"
              } placeholder-black`}
              placeholder="Take a note..."
            >
              {body}
            </TextareaAutosize>

            <button
              onClick={handleSubmit}
              className={`${
                isActive ? "block" : "hidden"
              } w-[80px] p-[10px] ml-[480px] hover:bg-gray-100`}
            >
              Ok
            </button>
          </div>
        </div>
     
        
    <div className={`h-screen flex flex-col w-full min-h-full ${backendPinnedData == null ? 'pt-[70px] items-center' : ''} overflow-y-auto pb-[100px] flex-1 shrink-0`}>

    {backendPinnedData == null ? (
      
       <svg xmlns="http://www.w3.org/2000/svg" className='left-[25px] w-[200px] text-gray-300' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
       </svg>
     
    ) : (
      <div
        className={`h-screen flex flex-col w-full min-h-full  overflow-y-auto pb-[100px] flex-1 shrink-0`}
      >
        

        {/* <div className="flex flex-col w-full h-full flex-1 bg-red-500">
        <p className='text-xs font-bold pl-[20px]'>PINNED</p> */}
        <div
          className={`flex w-full items-stretch overflow-visible pb-[20px] pl-[15px] ${
            isOn ? "flex-col flex-nowrap justify-center" : "flex-row flex-wrap"
          } ${isOpen ? "" : "justify-center"} ${
            isOn ? (isOpen ? "" : "justify-center") : ""
          }  flex-1`}
        >
          {isOn ? (
            <div
              className={`flex w-full overflow-visible pb-[20px] pl-[15px] ${
                isOn
                  ? "flex-col flex-nowrap items-center"
                  : "flex-row flex-wrap"
              } flex-1`}
            >
              {backendPinnedData.map((note) => {
                return (
                  <>
                    <div
                      key={note.id}
                      className={`flex flex-col w-[240px] hover-trigger cursor-pointer flex-1 min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-lg mr-4 ${
                        isOn ? "w-[597px]" : ""
                      }`}
                    >
                      <div
                        className="w-full h-full pr-3 text-ellipsis pl-3 pb-8"
                        onClick={() => {
                          setModalData(note);
                          setModalTitle(note);
                          setModalBody(note);
                          setOpen(true);
                        }}
                      >
                        <h2 className="font-bold text-xs">{note.title}</h2>
                        <p className="text-xs mt-1">{note.body}</p>
                      </div>
                      <div className="flex flex-row w-full justify-end pr-1">
                        <svg
                          onClick={() => archiveNote(note._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="hidden-content w-[20px] mt-[2px] cursor-pointer"
                        >
                          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                          <path
                            fillRule="evenodd"
                            d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          onClick={() => deleteNote(note._id)}
                          className=" hidden-content w-[20px] cursor-pointer"
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
                  </>
                );
              })}
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className={`my-masonry-grid pl-10`}
              columnClassName="ny-masonry-grid-column"
            >
              {backendPinnedData.map((note) => {
                return (
                  <>
                    <div
                      key={note.id}
                      className={`flex flex-col w-[240px] hover-trigger cursor-pointer flex-1 min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-lg mr-4 ${
                        isOn ? "w-[597px]" : ""
                      }`}
                    >
                      <div
                        className="w-full h-full pr-3 text-ellipsis pl-3 pb-8"
                        onClick={() => {
                          setModalData(note);
                          setModalTitle(note);
                          setModalBody(note);
                          setOpen(true);
                        }}
                      >
                        <h2 className="font-bold text-xs">{note.title}</h2>
                        <p className="text-xs mt-1">{note.body}</p>
                      </div>
                      <div className="flex flex-row w-full justify-end pr-1">
                        <svg
                          onClick={() => archiveNote(note._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="hidden-content w-[20px] mt-[2px] cursor-pointer"
                        >
                          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                          <path
                            fillRule="evenodd"
                            d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          onClick={() => deleteNote(note._id)}
                          className=" hidden-content w-[20px] cursor-pointer"
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
                  </>
                );
              })}
            </Masonry>
          )}
        </div>

        {open === true && (
          <Modal ref={modalRef} isOpen={open}>
            <div className=" flex flex-col w-full h-full">
              <svg
                onClick={() => {
                  setOpen(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 ml-[570px] cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

              <input
                value={modalTitle.title}
                className="outline-none"
                onKeyUp={(e) => setModalTitle(e.target.value)}
              />
            </div>
            <TextareaAutosize
              className="w-full outline-none text-xs resize-none"
              onChange={(e) => setModalBody(e.target.value)}
            >
              {modalBody.body}
            </TextareaAutosize>

            <div className="flex flex-row sticky w-full">
              <svg
                onClick={() => deleteNote(modalData._id)}
                className=" hidden-content w-[20px] ml-[2px] cursor-pointer"
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
              <button
                onClick={editNote}
                className="ml-[500px] p-1 hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          </Modal>
        )}
        
      </div>
    )}
    </div>
    
      </div>
      )}

    </div>
    </>
  );
}

export default Mainpage;
