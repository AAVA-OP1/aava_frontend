import React from 'react'
import ReactDOM from 'react-dom/client' 
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home.jsx';
import KysymysLista from './components/KysymysLista.jsx';
import Error from './components/Error.jsx';


// router elementti polkuja
const router = createBrowserRouter([  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,    //error käsittely
    children: [                       // children are nested routes with a route
      {
        element: <Home />,
        index: true                   // index route does not need any path
      },
      {
        path: "kysymyslista",                // path can be defined relative to the parent path
        element: <KysymysLista />,
      },

    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)