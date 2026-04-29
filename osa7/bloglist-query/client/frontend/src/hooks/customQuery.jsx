import { useState, useEffect, useContext, createContext } from "react"
import blogService from "../services/blogs"
import { getUser, saveUser, removeUser } from "../services/persistentUser"


export const useField = (name, type="text") => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    name,
    value,
    type,
    onChange,
    reset,
    
  }
}


export const useBlogs = (notification) => {
  const [blogs, setBlogs] = useState([])

  // get all
  const getAllBlogs = () => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((a, b) => b.likes - a.likes)
      ),
    );
  }

  useEffect(() => {
    getAllBlogs()
  }, []);

  // like blog
  const handleLike = async (blog) => {
    try {
      const response = await blogService.likeBlog(blog.id);

      if (response) {
        //notification({ type: "show_confirm", message: `You liked: ${blog.title}`})
      }

      getAllBlogs();

    } catch (error) {
      console.log("liking blog error:", error);
      // notification({ type: "show_error", message: "Something went wrong liking blog" })
    }
  }

  // delete blog
  const handleDetele = async (blog) => {
    if (window.confirm(`Delete blog "${blog.title}" ?`)) {
      try {
        const response = await blogService.deleteBlog(blog.id);

        if (response) {
          // notification({ type: "show_confirm", message: `Blog "${blog.title}" deleted successfully`})
        }

        getAllBlogs();
        
      } catch (error) {
        console.log("error deleting blog", error);
        // notification({ type: "show_error", message: "Deleting blog went wrong" })
      }
      console.log("you deleted", blog.title);
    }
  };

  // new blog
  const handleNewBlog = async (formsRef, title, author, url) => {
    formsRef.current.toggleVisibility(); // piilottaa kentän blogin lisämiseen

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    try {
      const response = await blogService.createNewBlog(newBlog) //lisää blogin

      if (response) {
        // notification({ type: "show_confirm", message: `A new blog "${title.value}" by "${author.value}" added` })
      }

      // Hakee kaikki blogit uudestan
      getAllBlogs();

    } catch (error) {
      console.log("adding new blog error: ", error);
      // notification({ type: "show_error", message: 'Adding new blog went wrong' })
    }
  }

  return {
    blogs,
    getAllBlogs,
    handleLike,
    handleDetele,
    handleNewBlog
  }

}


const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser())
  }, [])

  const userLogOut = () => {
    setUser(null);
    removeUser()
  }

  const rememberUser = (data) => {
    setUser(data)
    saveUser(data)
  }
  
  return (
    <UserContext.Provider value={{ user, userLogOut, rememberUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}

export const useClickedBlog = () => {
  const [clickedBlog, setBlog] = useState('')

  const blogOpen = (blog) => setBlog(blog);

  const blogClose = () => setBlog("");

  return {
    clickedBlog,
    blogOpen,
    blogClose
  }
}