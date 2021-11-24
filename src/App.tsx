import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootState } from "./features/rootReducer";
import Auth from './features/auth/Auth';
import Home from './features/home/Home'
import DiaryEntriesList from './features/diary/DiaryEntriesList'
import Editor from "./features/entry/editor";

const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
        <Route path="/diary/:id" element={<DiaryEntriesList />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
