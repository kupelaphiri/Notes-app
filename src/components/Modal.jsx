import React from 'react'
import { useRef } from 'react';
import useGlobal from '../hooks/useGlobal';

function Modal({ isOpen, onClose, children, ref }) {
    const ModalRef = useRef(null)
    const {isDark} = useGlobal()
    if (!isOpen) return null;
  return (
    
        <div
            onClick={onClose}
            ref={ref}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
            className={`${isDark ? 'bg-dim': 'bg-white'} flex flex-col w-full max-w-[640px] m-2 p-[2%] rounded-md overflow-y-hidden max-h-[425px]`}
                // style={{
                //     background: "white",
                //     height: 150,
                //     width: 240,
                //     margin: "auto",
                //     padding: "2%",
                //     border: "2px solid #000",
                //     borderRadius: "10px",
                //     boxShadow: "2px solid black",
                // }}
            >
                {children}
            </div>
        </div>
  )
}

export default Modal