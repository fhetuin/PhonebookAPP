import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import SwitchThemeMode from './SwitchThemeMode';


export default function Navbar() {
  return (
    <nav>
      <h1>
        Phonebook App
      </h1>
        <div className='links'>
            <Link to="/">Home</Link>
        </div>
      <SwitchThemeMode />
    </nav>
  )
}
