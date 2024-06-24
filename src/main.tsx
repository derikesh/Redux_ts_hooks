import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from "./components/Redux/ReduxStore.ts"
// importing react store 
import { Provider } from 'react-redux';
import { userAPi } from './components/features/UserFeatures.ts';

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { fetchApi } from './components/features/PostFeatures.ts'

store.dispatch( userAPi() );
store.dispatch( fetchApi() );


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
    <Router>
      <Routes>
        <Route path='/*' element={<App/>} />
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>,
)
