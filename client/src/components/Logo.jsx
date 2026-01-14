import React from 'react'
import logo from "../assets/logo_symbol.png";

const Logo = ({styling}) => {
  return (
                 <h1 className={`${styling} flex items-center gap-2`} >Productr <img src={logo} alt="" /> </h1>
  )
}

export default Logo
