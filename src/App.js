import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Components/Footer";

import Navigation from "./Components/Navigation";
import Login from "./pages/Login";
import EditArticle from "./pages/EditArticle";
import MyArticle from "./pages/MyArticle";
import NewArticle from "./pages/NewArticle";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import SingleArticlePage from "./pages/SingleArticlePage";
import MainArticle from "./Components/MainArticle";
import ArticlePreview from "./Components/ArticlePreview";
import Home from "./pages/Home";
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {user && (
          <>
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/articles/:id/edit" element={<EditArticle />} />
          <Route path ="/articles/me" element = {<MyArticle />} />
          </>
        )}
        <Route path = "/articles/:id" element ={<SingleArticlePage />} />
        <Route path = "*" element ={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
