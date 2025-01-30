import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useOutletContext } from "react-router-dom";
import "./Mainpage.css";
import { removeObjectWithId } from "../reusables/RemoveObjectWithId";
import "ldrs/ring";
import { ring } from "ldrs";
import useGlobal from "../hooks/useGlobal";
import Modal from "./Modal";
import { BASE_URL } from "../constants";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';


ring.register();

function Trashpage() {
  const [deletedNotes, setDeletedNotes] = useState([{}]);
  const [isNotes, setIsNotes] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isOn, setIsOn] = useOutletContext();
  const [isOpen, setIsOpen] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [isDialogueModal, setIsDialogueModal] = useState(false);
  const { isDark } = useGlobal();

  //displays all deleted notes
  useEffect(() => {
    getNotes();
  }, []);

  const refreshNotes = async () => {
    const res = await fetch(`${BASE_URL}/deleted-notes`, {
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
    const res = await fetch(`${BASE_URL}/deleted-notes`, {
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
    try {
      await fetch(`${BASE_URL}/restore-note`, {
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
    fetch(`${BASE_URL}/permanent-delete-notes`, {
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
    fetch(`${BASE_URL}/delete-all`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(),
    }).then((res) => console.log(res));
    refreshNotes();
    setIsDialogueModal(false);
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
          color={`${isDark ? 'white' : 'black'}`}
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
             <DeleteOutlineOutlinedIcon sx={{ fontSize: 100, color: 'gray' }} />
              </div>
              <p className="text-gray-600 mt-[20px]">No notes in Trash</p>
            </>
          ) : (
            <div className="flex flex-col h-screen w-full overflow-y-auto pb-[100px]">
              <div className="flex justify-center w-full pt-8">
                <p
                  className={`text-xs text-wrap sm:text-nowrap sm:text-base ${
                    isDark ? "text-white" : ""
                  }`}
                >
                  Notes in Trash are deleted after 7 days.
                </p>
                <button
                  onClick={() => setIsDialogueModal(true)}
                  className="pl-10 text-xs sm:text-base text-blue-400"
                >
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
                        className={`w-[280px] flex flex-col group hover:shadow-lg min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-md mr-4 ${
                          isOn ? "w-[597px]" : ""
                        }`}
                      >
                        <div
                          onClick={() => {
                            setModalData(note);
                            setModalTitle(note);
                            setModalBody(note);
                            setOpen(true);
                          }}
                          className="w-full h-full pr-3 text-ellipsis overflow-hidden pl-3 pb-8"
                        >
                          <h2
                            className={`text-xs ${isDark ? "text-white" : ""}`}
                          >
                            {note.title}
                          </h2>
                          <p
                            className={`text-xs ${isDark ? "text-white" : ""}`}
                          >
                            {note.body}
                          </p>
                        </div>
                        <div className="flex flex-row justify-end">
                          <svg
                            onClick={() => restoreNote(note._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`invisible group-hover:visible mt-[5px] ${
                              isDark ? "text-gray-400" : ""
                            } w-[20px] cursor-pointer`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <div onClick={() => permanentDelete(note._id)} className={`invisible group-hover:visible mt-[7px] ${
                              isDark ? "text-gray-400" : ""
                            }`}>
                            <DeleteForeverIcon sx={{fontSize: 20}}/>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                 className="w-full"
              
                >
                   <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className={`my-masonry-grid pl-10`}
                      columnClassName="ny-masonry-grid-column"
                    >
                   
                      {deletedNotes.map((note) => {
                        return (
                          <>
                            <div
                              key={note.id}
                              className={`flex flex-col text-ellipsis  group hover:shadow-lg cursor-pointer flex-1 min-h-24 max-h-[452px] overflow-hidden border-[1px] mt-[20px] pt-2 rounded-md mr-4 ${
                                isOn ? "w-[597px]" : ""
                              }`}
                            >
                              <div
                                className="w-full max-w-[400px] overflow-hidden h-full pr-3 text-ellipsis pl-3 mb-6 pb-10"
                                onClick={() => {
                                  setModalData(note);
                                  setModalTitle(note);
                                  setModalBody(note);
                                  setOpen(true);
                                }}
                              >
                                <h2
                                  className={`text-sm ${
                                    isDark ? "text-white" : ""
                                  }`}
                                >
                                  {note.title}
                                </h2>
                                <p
                                  className={`text-sm text-ellipsis ${
                                    isDark ? "text-white" : ""
                                  } mt-1`}
                                >
                                  {note.body}
                                </p>
                              </div>
                              <div className="flex flex-row w-full justify-end pr-1">
                                <div 
                                  onClick={() => restoreNote(note._id)}
                                  className={`invisible group-hover:visible mt-[7px] ${
                                    isDark ? "text-gray-400" : ""
                                  }`}
                                >
                                  <RestoreFromTrashIcon sx={{fontSize: 20}}/>
                                </div>
                                <div onClick={() => permanentDelete(note._id)} className={`invisible group-hover:visible mt-[7px] ${
                              isDark ? "text-gray-400" : ""
                            }`}>
                            <DeleteForeverIcon sx={{fontSize: 20}}/>
                          </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                     
                   </Masonry>
                </div>
              )}
            </div>
          )}
          {open && (
            <Modal isOpen={open}>
              <div className="flex flex-row-reverse z-10 w-full h-full">
                <svg
                  onClick={() => {
                    setOpen(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`w-4 h-4 ${
                    isDark ? "text-white" : ""
                  } cursor-pointer`}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="w-full px-3 overflow-y-auto">
                <h3
                  className={`outline-none ${
                    isDark ? "text-white" : ""
                  } bg-inherit`}
                >
                  {modalTitle.title}
                </h3>
                <div className="w-full overflow-y-auto">
                  <p
                    className={`w-full bg-inherit ${
                      isDark ? "text-white" : ""
                    }  outline-none text-sm resize-none`}
                  >
                    {modalBody.body}
                  </p>
                </div>
              </div>

              <div className="flex mt-3 flex-row w-full">
              <div 
                                  onClick={() => restoreNote(modalData._id)}
                                  className={`${
                                    isDark ? "text-gray-400" : ""
                                  } ml-2`}
                                >
                                  <RestoreFromTrashIcon sx={{fontSize: 20}}/>
                                </div>
                                <div onClick={() => permanentDelete(modalData._id)} className={`${
                              isDark ? "text-gray-400" : ""
                            }mr-2`}>
                            <DeleteForeverIcon sx={{fontSize: 20}}/>
                          </div>
              </div>
            </Modal>
          )}

          {isDialogueModal && (
            <Modal isOpen={isDialogueModal}>
              <div className="flex p-4 sm:p-0 overflow-hidden flex-col">
                <div className="mb-[30px]">
                  <p
                    className={`text-xs ${
                      isDark ? "text-white" : ""
                    } sm:whitespace-nowrap`}
                  >
                    Empty trash? All notes in Trash will be permanently deleted.
                  </p>
                </div>
                <div className="flex flex-row-reverse">
                  <div className="w-[120px] pr-[2px] justify-center hover:bg-gray-200">
                    <button
                      onClick={deleteAll}
                      className="text-sm text-blue-400"
                    >
                      Empty Trash
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsDialogueModal(false)}
                      className={`text-sm ${
                        isDark ? "text-white" : ""
                      } mr-[40px]`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default Trashpage;
