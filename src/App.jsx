import React, { useContext } from 'react'

//importar paginas del proyecto
import {Tasks} from './pages/Tasks'
import {PerfilPage} from './pages/PerfilPage'
import { ApiPage } from './pages/ApiPage'
import {Form} from "./pages/Form"
import {Components} from './pages/Components'
import { VoicePage } from './pages/VoicePage'
import { Chat } from './components/Chat'
import { Informes } from './pages/Informes'

//Importar componentes del proyecto
import { Navegator } from './components/Navegator'
import { Footer } from './components/Footer'

import {Routes, Route} from 'react-router'
import { LoginProvider } from './context/LoginProvider'

import './background/style.css'
import './App.css'

//Darkmode
import { DarkmodeContext } from './context/DarkmodeContext'

const App = () => {

  const {darkmodeData}= useContext(DarkmodeContext)
  console.log(darkmodeData)


  return (
    <main className={darkmodeData.isDark ? "dark" : "light"} data-bs-theme={darkmodeData.isDark ? "dark" : "light"}>
          <header>
            <h1 className="text-center">Catty Cat</h1>
          </header>
          <Navegator/>

          <section>
            <LoginProvider>
              <div className='containerPages'>
                <Routes>
                  <Route path='/ApiPage' element={<ApiPage></ApiPage>}></Route>
                  <Route path='/Tasks' element={<Tasks></Tasks>}></Route>
                  <Route path='/PerfilPage' element={<PerfilPage></PerfilPage>}></Route>
                  <Route path='/Form' element={<Form></Form>}></Route>
                  <Route path='/VoicePage' element={<VoicePage></VoicePage>}></Route>
                  <Route path='/Components' element={<Components></Components>}></Route>
                  <Route path='/Informes' element={<Informes></Informes>}></Route>
                </Routes>
              </div>
            </LoginProvider>
          </section>
          <Chat/>
          <Footer/>
      
    </main>
  )
}

export default App
