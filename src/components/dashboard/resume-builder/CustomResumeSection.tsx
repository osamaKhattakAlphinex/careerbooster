"use client"
import { setCustomExperienceArray } from '@/store/resumeSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CustomResumeSection = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  return (
    <div>
    <button
      onClick={() => {
        dispatch(setCustomExperienceArray([...resume.customExperienceArray,{name:"Untitled",entries:[]}]))
      }}
      className="text-sm text-gray-900 cursor-pointer hover:opacity-80 font-semibold bg-gray-200 py-2 rounded-lg px-3 m-2   "
    >
      Add Custom Section
    </button>
         
  </div>
  )
}

export default CustomResumeSection