import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import CreateNewBlog from "./components/NewBlog";
import ErrorBoundary from "./components/ErrorCatcher";
// import Crash from './components/Crash'  /* For testing ErrorBoundary (testata ErrorBoundary) */

import { useReducer } from "react";
import Notification, { notificationReducer, initialState } from "./components/Notification"

import { useBlogs, useUser, UserProvider } from "./hooks/customQuery"

const Home = () => {

  const [notification, dispatchNotification] = useReducer(notificationReducer, initialState) // viesti

  const { blogs, getAllBlogs, handleLike, handleDetele, handleNewBlog } = useBlogs() //kaikki blogit

  const { user, userLogOut, rememberUser, getAllUsers } = useUser() //kirjautunut käyttäjä (tallentuu myös localStoragen)

  const formsRef = useRef();

  if (user === null) {
    //jos käyttäjä ei ole kirjautunut
    return (
      <div>

        <ErrorBoundary>
          <Notification 
            state={notification}
            dispatch={dispatchNotification} 
          />

          <Togglable buttonLabel="log in" formsRef={formsRef}>
            <LoginForm
              rememberUser={rememberUser}
              user={user}
              dispatchNotification={dispatchNotification}
              formsRef={formsRef}
            />
          </Togglable>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div>

      <ErrorBoundary>

        {/* <Crash /> */}

        <p>{user.name} logged in</p>

        <Notification
          state={notification}
          dispatch={dispatchNotification}
        />

        <Togglable buttonLabel="create new blog" formsRef={formsRef}>
          <CreateNewBlog
            formsRef={formsRef}
            handleNewBlog={handleNewBlog}
          />
        </Togglable>

        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleDetele={handleDetele}
          />
        ))}
      </ErrorBoundary>
    </div>
  );
};

export default Home;
