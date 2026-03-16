
import { createRoot } from 'react-dom/client'
import './index.css'           
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import About from './components/About/about.jsx';
import Layout from './layout.jsx';
import { StrictMode } from 'react';
import Contact from './components/Contact/contact.jsx';
import UserLogin from './components/User/userLogin.jsx';
import Github from './components/Github/github.jsx';
import Dashboard from './components/User/dashbord.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    < Route path='/' element={ < Layout /> }>
      < Route path='' element={ < Home /> }/>
      < Route path='/about' element={ < About /> }/>
      < Route path='/contact' element={ < Contact /> }/>
      < Route path='/login' element={ < UserLogin /> }/>
      < Route path='/dashboard' element={ < Dashboard /> }/>
      < Route 
      path='/github' 
      element={ < Github /> }/>

    </ Route >
  )
)

// const router = createBrowserRouter([
//   {
//     path : "/",
//     element : < Layout />,

//     children : [
    
//     {
//       path : "",
//       element : < Home />
//     },
//     {
//       path : "/about",
//       element : < About />
//     },
//     {
//       path : "/contact",
//       element : < Contact />
//     }
//   ]
//   }
// ])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
