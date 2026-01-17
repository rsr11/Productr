import React from 'react'
import logo from "../assets/logo_symbol.png";

const Logo = ({styling}) => {
  return (
                 <h1 className={`${styling} flex gap-2 items-center`} >Productr <img src={logo} alt="" /> </h1>
  )
}

export default Logo
