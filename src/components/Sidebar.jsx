// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useGlobal from "../hooks/useGlobal";
import { useRef } from 'react'; 
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


function Sidebar(props) {
const {isDark} = useGlobal()
const optionsRef = useRef()
const sidebarOptions = [{
  title: 'Notes',
  id: 1,
  icon: <LightbulbOutlinedIcon sx={{ fontSize: 25 }} />,
  path: '/'
}, {
  title: 'Archive',
  id: 2,
  icon:   <ArchiveOutlinedIcon sx={{ fontSize: 25 }} />,
  path: '/archivepage'
}, {
  title: 'Trash',
  id: 3,
  icon:  <DeleteOutlineOutlinedIcon sx={{ fontSize: 25 }} />,
  path: '/trashpage' 
}]

const navigate = useNavigate()

const HandleNavigate = (path) => {
  navigate(path)
}

const location = useLocation()

const isPathSelected = (path) => {
  return location.pathname == path
}

const isDarkMode = () => {
  if (isDark) {
   optionsRef.isDark == true
  }
}



useEffect(() => {
  window.addEventListener("resize", props.updateMedia);
  return () => window.removeEventListener("resize", props.updateMedia);
});

  return (
    <div className={`h-full pt-2 z-1 ${isDark? 'bg-dim': ''}`}>
     {sidebarOptions.map((option) => {
      return ( <div onClick={() => {HandleNavigate(option.path)}} ref={optionsRef} key={option.id} className={`flex flex-row items-center h-[48px] z-10 w-full cursor-pointer ${props.isOpen? 'rounded-r-3xl pl-[12px]' : 'rounded-full'} ${isPathSelected(option.path)? isDark ? 'bg-amber-500 bg-opacity-10' : 'bg-amber-100' : 'hover:bg-gray-200'} `}>
      <div className={`px-[12px] mb-1 ${isDark? 'text-gray-400' : 'text-gray-600'} `}>
       {option.icon}
       </div>
       {props.isOpen && <p className={`ml-[20px] text-xs ${isDark? 'text-white' : 'text-gray-800'} font-semibold`}>{option.title}</p>}
      </div>)})}
      
    </div>
  )
    }

export default Sidebar