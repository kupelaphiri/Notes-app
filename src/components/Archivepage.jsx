import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Masonry from "react-masonry-css";
import "./Mainpage.css";
import { usePageVisibility } from "../hooks/usePageVisibility";
import useGlobal from "../hooks/useGlobal";
import { removeObjectWithId } from "../reusables/RemoveObjectWithId";
import 'ldrs/ring'
import { ring } from 'ldrs'


ring.register();


function Archivepage() {
  const [archivedNotes, setArchivedNotes] = useState([{}]);
  const [modalData, setModalData] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOn, setIsOn] = useOutletContext();
  const [isOpen, setIsOpen] = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const isPageVisible = usePageVisibility();
  const [isVisible, setIsVisible] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [noteID, setNoteID] = useState(null)
  const [isUndone, setIsUndone] = useState(false)
  const {isDark} = useGlobal()

  const getNotes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/archived-notes", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      const notes = await res.json();
      // setLoading(false)
      if (notes.length == 0) {
        setArchivedNotes(null);
      } else if (notes.length != 0) {
        setArchivedNotes(notes);
        // setArchivedNotes((prev)=> {
        //   const newArr = [...prev]
        //   newArr.
        // })
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const refreshNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/archived-notes", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      const notes = await res.json();
      // setLoading(false)
      if (notes.length == 0) {
        setArchivedNotes(null);
      } else if (notes.length != 0) {
        setArchivedNotes(notes);
        // setArchivedNotes((prev)=> {
        //   const newArr = [...prev]
        //   newArr.
        // })
        // setIsLoading(false);
      } else {
        // setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //displays all archived notes
  useEffect(() => {
    getNotes();
  }, []);

  //unarchives all archived notes
  const unarchive = async (id) => {
    setNoteID(id)

    try {
      await fetch("http://localhost:5000/unarchive", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          archivedNoteId: id,
        }),
      });
      const currentNotes = [...archivedNotes];
      const result = removeObjectWithId(currentNotes, id);
      console.log("results", result, currentNotes);
      setArchivedNotes(result);
      refreshNotes();
      setIsVisible(true)
    } catch (error) {
      console.log("error", error);
    }
  };

  const archiveNote = () => {
    
    fetch("http://localhost:5000/archive-note", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        archivedNoteId: noteID,
      }),
    });

    refreshNotes();
    setIsUndone(true)
    setIsVisible(false)
    // setIsDeleted(false);
    // setIsVisible(true);

    // setOpen(false);
  };

  const deleteNote = (id) => {
    
    setNoteID(id)
    fetch("http://localhost:5000/delete-note", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        noteid: id,
      }),
    });

    const currentNotes = [...archivedNotes];
    const result = removeObjectWithId(currentNotes, id);
    setArchivedNotes(result);
    setIsVisible(true)
    setIsDeleted(true)
  };

  setTimeout(() => {
    setIsVisible(false)
  }, 10000);

  setTimeout(() => {
    setIsUndone(false)
  }, 5000);


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
    <div className={`flex ${isLoading? 'justify-center pt-[200px] items-center': ''} ${isDark? 'bg-dim': ''}`}>
      {isLoading === true ? (
       <l-ring
       size="40"
       stroke="5"
       bg-opacity="0"
       speed="2" 
       color="black" 
     ></l-ring>
      ) : (
        <div className={`flex flex-col h-screen ${archivedNotes == null ? 'items-center justify-center' : ''} w-full overflow-y-auto pb-[100px]`}>
          {archivedNotes == null ? (
           <>
           <div>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-[100px] text-gray-300' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <p className="text-gray-600 mt-[20px]">Your archived notes appear here</p>
            </>
          ) : (
            <div className="flex flex-col h-screen w-full overflow-y-auto pb-[100px]">
              {isOn ? (
                <div
                  className={`flex w-full overflow-visible pb-[20px] pl-[15px] ${
                    isOn
                      ? "flex-col flex-nowrap items-center"
                      : "flex-row flex-wrap"
                  } flex-1`}
                >
                  {archivedNotes.map((note) => {
                    return (
                      <div
                        key={note.id}
                        className={`flex flex-col w-[240px] group cursor-pointer flex-1 min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-md mr-4 ${
                          isOn ? "w-[597px]" : ""
                        }`}
                      >
                        <div
                          className="w-full h-full pr-3 text-ellipsis pl-3 pb-9"
                          onClick={() => {
                            setModalData(note);
                            setModalTitle(note);
                            setModalBody(note);
                            setOpen(true);
                          }}
                        >
                          <h2 className={`text-xs ${isDark? 'text-white': ''}`}>{note.title}</h2>
                          <p className={`text-xs ${isDark? 'text-white': ''}`}>{note.body}</p>
                        </div>
                        <div className="flex flex-row justify-end pr-1 h-full w-full">
                          <svg
                            onClick={() => unarchive(note._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="invisible group-hover:visible w-[20px] cursor-pointer"
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <svg
                            onClick={() => permanentDelete(note._id)}
                            className="invisible group-hover:visible w-[20px] cursor-pointer"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h48v48H0V0z" fill="none" />
                            <path d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z" />
                            <path d="M0 0h48v48H0z" fill="none" />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`flex w-full items-stretch overflow-visible pb-[20px] justify-center pl-[15px] ${
                    isOn
                      ? "flex-col flex-nowrap items-center"
                      : "flex-row flex-wrap"
                  }  flex-1`}
                >
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={`my-masonry-grid pl-10`}
                    columnClassName="ny-masonry-grid-column"
                  >
                    {archivedNotes.map((note) => {
                      return (
                        <div
                          key={note.id}
                          className={`flex flex-col w-[240px] group cursor-pointer flex-1 min-h-24 text-ellipsis max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-lg mr-4 ${
                            isOn ? "w-[597px]" : ""
                          }`}
                        >
                          <div
                            className="w-full h-full pr-3 pl-3 pb-9"
                            onClick={() => {
                              setModalData(note);
                              setModalTitle(note);
                              setModalBody(note);
                              setOpen(true);
                            }}
                          >
                            <h2 className={`text-xs ${isDark? 'text-white': ''}`}>{note.title}</h2>
                            <p className={`text-xs ${isDark? 'text-white': ''}`}>{note.body}</p>
                          </div>
                          <div className="flex flex-row justify-end pr-1 h-full w-full">
                            <svg
                              onClick={() => unarchive(note._id)}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="invisible group-hover:visible w-[20px] cursor-pointer"
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
              )}
              {isModalOpen && <Modal ref={ModalRef} isOpen={open}>
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
                        className={`outline-none ${isDark? 'text-white' : ''} bg-inherit`}
                        onKeyUp={(e) => setModalTitle(e.target.value)}
                      />
                    </div>
                    <TextareaAutosize
                      className={`w-full bg-inherit ${isDark? 'text-white' : ''}  outline-none text-sm resize-none`}
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
                  </Modal>}
            </div>
          )}
        </div>
      )}
      {isVisible && (
          <div
            className={`absolute flex items-center flex-nowrap pl-[15px] bottom-[20px] left-[30px] h-[64px] w-full max-w-[512px] ${
              isDark ? "bg-black" : "bg-dim"
            } `}
          >
            {isDeleted ? (
              <p className="text-xs text-white">Note deleted</p>
            ) : (
              <p className="text-xs text-white whitespace-nowrap">Note unarchived</p>
            )}
            <div className="flex items-center justify-center w-[60px] h-[40px] hover:bg-slate-400 ml-[290px]">
              <button onClick={archiveNote} className="text-amber-100 text-xs">
                Undo
              </button>
            </div>
            <svg
              onClick={() => {
                setIsVisible(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-[24px] h-[24px] text-white ml-[15px] mr-[10px] cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
        {isUndone && <div
            className={`absolute flex items-center rounded-sm flex-nowrap pl-[15px] bottom-[20px] left-[30px] h-[64px] w-full max-w-[512px] ${
              isDark ? "bg-black" : "bg-dim"
            } `}
          >
            <p className="text-xs text-white whitespace-nowrap">Action undone</p>
            <svg
              onClick={() => {
                setIsUndone(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-[24px] h-[24px] text-white ml-[370px] mr-[10px] cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>}
    </div>
  );
}

export default Archivepage;
