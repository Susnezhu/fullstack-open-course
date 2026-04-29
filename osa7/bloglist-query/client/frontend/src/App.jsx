import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import NotFound from "./components/NotFound";
import Users from "./UsersPage"
import Header from "./components/Header"
import NewBlog from "./NewBlogPage"
import SingleBlog from "./components/SingleBlog"

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/new-blog" element={<NewBlog />} />

        <Route path="/blogs/:id" element={<SingleBlog />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
