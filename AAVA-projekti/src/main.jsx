import React from 'react'
import ReactDOM from 'react-dom/client' 
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home.jsx';
import KysymysLista from './components/KysymysLista.jsx';
import Error from './components/Error.jsx';
import Diagrammi from './components/Diagrammi.jsx';


// router elementti polkuja
const router = createBrowserRouter([  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,    //error käsittely
    children: [                      
      {
        element: <Home />,
        index: true                   
      },
      {
        path: "diagrammi",              
        element: <Diagrammi />,
      },


    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)