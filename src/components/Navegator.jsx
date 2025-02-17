import { NavLink } from "react-router-dom";
import { DarkmodeButton } from "./DarkmodeButton";
import React, { useContext, useState } from 'react'
import { DarkmodeContext } from '../context/DarkmodeContext';
import { SearchNav } from  './SearchNav'


export const Navegator = () => {
  return(
    
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>


        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink to='/ApiPage' className="nav-link">Api</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/Components' className="nav-link">Componentes</NavLink>
            </li>
            <li cclassNamelass="nav-item">
              <NavLink to='/Tasks' className="nav-link">Gestor de Tareas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/PerfilPage' className="nav-link">Perfil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/Informes' className="nav-link">Informes</NavLink>
            </li>
          </ul>

          <ul class="navbar-nav me-4 mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink to='/VoicePage' className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-mic-fill" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z"/>
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
              </svg>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to='/form' className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
              </NavLink>
            </li>

            <li  className="nav-item">
              <NavLink className="nav-link">
                <DarkmodeButton/>
              </NavLink>
            </li>
          
            <div classnName="nav-item" style={{position: "relative"}}>
              <SearchNav/>
            </div>
          </ul>
        </div>
      </div>
    </nav>


    
  )
}