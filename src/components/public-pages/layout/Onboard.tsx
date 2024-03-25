"use client"
import { usePathname } from 'next/navigation';
import React from 'react'

const Onboard = () => {
    const onBoardRoutes = ["resume-builder", "cover-letter-generator", "email-assistant", "linkedin-optimizer"]
    const pathname = usePathname();
    console.log(pathname)

  return (
    <div>Onboard</div>
  )
}

export default Onboard