import LandingPage from "../src/components/LandingPage";
import FeedPage from "../src/components/FeedPage";
import PostCard from "../src/components/PostCard"
import ProfilePage from "./components/ProfilePage";
import Layout from "./components/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<LandingPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
}