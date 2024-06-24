import './App.css';
import Layout from './Outlet/Layout';
import AddPost from './components/Posts/AddPost';
import PostList from './components/features/PostList';

import SinlgePost from './components/features/SinlgePost';

import EditPost from './components/features/EditPost';

import UserList from './components/Posts/UserList';

import { Routes,Route } from 'react-router-dom';
import UserPage from './components/Posts/UserPage';

function App() {

  return (
<Routes>
  <Route path='/' element={<Layout/>} >
    <Route index element={<PostList/>} />

    <Route path='/post'>
      <Route index element={<AddPost/>} />
      <Route path='/post/:singlePostId' element={<SinlgePost/>} />
      <Route path='/post/edit/:singlePostId' element={<EditPost/>} />
    </Route>

    <Route path='/user'>
      <Route index element={<UserList/>} />
      <Route path='/user/:userId' element={<UserPage/>} />
    </Route>

  </Route>
</Routes>
  )
}

export default App
