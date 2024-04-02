import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useOutletContext } from "react-router-dom";
import "./Mainpage.css";
import { removeObjectWithId } from "../reusables/RemoveObjectWithId";
import "ldrs/ring";
import { ring } from "ldrs";
import useGlobal from "../hooks/useGlobal";
import Modal from "./Modal";

ring.register();

function Trashpage() {
  const [deletedNotes, setDeletedNotes] = useState([{}]);
  const [isNotes, setIsNotes] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isOn, setIsOn] = useOutletContext();
  const [isOpen, setIsOpen] = useOutletContext();
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [isDialogueModal, setIsDialogueModal] = useState(false)
  const { isDark } = useGlobal();

  //displays all deleted notes
  useEffect(() => {
    getNotes();
  }, []);

  const refreshNotes = async () => {
    const res = await fetch(`${import.meta.env.VITE_REACT_BASE_URL}/deleted-notes`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    const notes = await res.json();
    if (notes.length == 0) {
      setDeletedNotes(null);
    } else {
      setDeletedNotes(notes);
    }
  };

  const getNotes = async () => {
    setisLoading(true);
    const res = await fetch(`${import.meta.env.VITE_REACT_BASE_URL}/deleted-notes`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    const notes = await res.json();
    if (notes.length == 0) {
      setDeletedNotes(null);
      setisLoading(false);
    } else {
      setDeletedNotes(notes);
      setisLoading(false);
    }
  };

  const restoreNote = async (id) => {
    console.log("id", id);
    try {
      await fetch(`${import.meta.env.VITE_REACT_BASE_URL}/restore-note`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          notesid: id,
        }),
      });
      const currentNotes = [...deletedNotes];
      const result = await removeObjectWithId(currentNotes, id);
      setDeletedNotes(result);
      refreshNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const permanentDelete = (id) => {
    console.log("id", id);
    fetch(`${import.meta.env.VITE_REACT_BASE_URL}/permanent-delete-notes`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        deletednoteid: id,
      }),
    });
    const currentNotes = [...deletedNotes];
    const result = removeObjectWithId(currentNotes, id);
    setDeletedNotes(result);
    refreshNotes();
  };

  const breakpointColumnsObj = {
    default: 7,
    1831: 6,
    1600: 5,
    1560: 4,
    1307: 3,
    1033: 2,
    792: 1,
  };

  const deleteAll = () => {
    fetch(`${import.meta.env.VITE_REACT_BASE_URL}/delete-all`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(),
    }).then((res) => console.log(res));
    refreshNotes();
    setIsDialogueModal(false)
  };

  return (
    <div
      className={` flex ${
        deletedNotes == null ? "justify-center items-center" : ""
      } ${isLoading ? "flex justify-center pt-[200px] items-center" : ""} ${
        isDark ? "bg-dim" : ""
      }`}
    >
      {isLoading ? (
        <l-ring
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="black"
        ></l-ring>
      ) : (
        <div
          className={`flex flex-col h-screen ${
            deletedNotes == null ? "items-center justify-center" : ""
          } w-full overflow-y-auto pb-[100px]`}
        >
          {deletedNotes == null ? (
            <>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[100px] text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mt-[20px]">No notes in Trash</p>
            </>
          ) : (
            <div className="flex flex-col h-screen w-full overflow-y-auto pb-[100px]">
              <div className="flex justify-center w-full pt-8">
                <p className={`text-xs sm:text-base ${isDark? 'text-white': ''}`}>Notes in Trash are deleted after 7 days.</p>
                <button onClick={()=> setIsDialogueModal(true)} className="pl-10 text-xs sm:text-base text-blue-400">
                  Empty Trash
                </button>
              </div>
              {isOn ? (
                <div
                  className={`flex w-full overflow-visible pb-[20px] pl-[15px] ${
                    isOn
                      ? "flex-col flex-nowrap items-center"
                      : "flex-row flex-wrap"
                  } flex-1`}
                >
                  {deletedNotes.map((note) => {
                    return (
                      <div
                        key={note.id}
                        className={`w-[280px] flex flex-col group min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-md mr-4 ${
                          isOn ? "w-[597px]" : ""
                        }`}
                      >
                        <div onClick={() => {
                                  setModalData(note);
                                  setModalTitle(note);
                                  setModalBody(note);
                                  setOpen(true);
                                }}
                                 className="w-full h-full pr-3 text-ellipsis overflow-hidden pl-3 pb-8">
                          <h2 className={`text-xs ${isDark? 'text-white': ''}`}>{note.title}</h2>
                          <p className={`text-xs ${isDark? 'text-white': ''}`}>{note.body}</p>
                        </div>
                        <div className="flex flex-row justify-end">
                          <svg
                            onClick={() => restoreNote(note._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`invisible group-hover:visible mt-[5px] ${isDark? 'text-gray-400': ''} w-[20px] cursor-pointer`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <svg
                            onClick={() => permanentDelete(note._id)}
                            className={`invisible group-hover:visible mt-[7px] ${isDark? 'text-gray-400': ''} mr-1 w-[20px] cursor-pointer`}
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
                  className={`flex w-full overflow-visible pb-[20px] justify-center pl-[15px] ${
                    isOn
                      ? "flex-row flex-nowrap items-center"
                      : "flex-row flex-wrap"
                  } flex-1`}
                >
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={`my-masonry-grid pl-10`}
                    columnClassName="ny-masonry-grid-column"
                  >
                    {deletedNotes.map((note) => {
                      return (
                        <div
                          key={note.id}
                          className={`flex flex-col w-[240px] group cursor-pointer flex-1 min-h-24 text-ellipsis max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-lg mr-4 ${
                            isOn ? "w-[597px]" : ""
                          }`}
                        >
                          <div  onClick={() => {
                                  setModalData(note);
                                  setModalTitle(note);
                                  setModalBody(note);
                                  setOpen(true);
                                }} 
                                className="w-full h-full pr-3 text-ellipsis overflow-hidden pl-3 pb-8">
                            <h2 className={`text-xs ${isDark? 'text-white' : ''}`}>{note.title}</h2>
                            <p className={`text-xs ${isDark? 'text-white': ''}`}>{note.body}</p>
                          </div>
                          <div className="flex flex-row justify-end">
                            <svg
                              onClick={() => restoreNote(note._id)}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`invisible group-hover:visible mt-[5px] ${isDark? 'text-gray-400': ''} w-[20px] cursor-pointer`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <svg
                              onClick={() => permanentDelete(note._id)}
                              className={`invisible group-hover:visible mt-[7px] ${isDark? 'text-gray-400': ''} mr-1 w-[20px] cursor-pointer`}
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
                  </Masonry>
                </div>
              )}

            </div>
          )}
           {open && <Modal isOpen={open}>
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

                    </div>
                    <div className="w-full overflow-y-auto">
                      <h3
                       
                        className={`outline-none ${isDark? 'text-white' : ''} bg-inherit`}
                        
                      >{modalTitle.title}</h3>
                      <div className="w-full overflow-y-auto">
                    <p
                      className={`w-full bg-inherit ${isDark? 'text-white' : ''}  outline-none text-sm resize-none`}
                      
                    >
                      {modalBody.body}
                    </p>
                    </div>
                    </div>

                    <div className="flex flex-row w-full">
                      <svg
                        onClick={() => permanentDelete(modalData._id)}
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
                        onClick={() => restoreNote(modalData._id)}
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
                  </Modal>}

                 {isDialogueModal && <Modal isOpen={isDialogueModal}>
                   <div className="flex flex-col">
                    <div className="mb-[30px]">
                      <p className={`text-xs ${isDark? 'text-white' : ''} whitespace-nowrap`}>Empty trash? All notes in Trash will be permanently deleted.</p>
                    </div>
                    <div className="flex flex-row-reverse">
                      <div className="w-[120px] pr-[2px] justify-center hover:bg-gray-200">
                    <button onClick={deleteAll} className="text-base text-blue-400">Empty Trash</button>
                    </div>
                    <div>
                    <button onClick={()=> setIsDialogueModal(false)} className={`text-base ${isDark? 'text-white' : ''} mr-[40px]`}>Cancel</button>
                    </div>
                    </div>
                    </div>
                  </Modal>}
        </div>
        
      )}
      
    </div>
  );
}

export default Trashpage;
