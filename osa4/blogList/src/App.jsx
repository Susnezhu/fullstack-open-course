import React, {useState} from 'react'

const blogList = [
    {  title: "Awesome day!",
        author: "Lea",
        url: "http://localhost:5173/",
        likes: 2,
        id: 1
    },
    {
        title: "Bad day..",
        author: "Max",
        url: "http://localhost:5173/",
        likes: 5,
        id: 2
    }
]

const Blogs = () => {
    return (
        <ul>
            {blogList.map(blog => (
                <li key={blog.id}>
                    {blog.title} by {blog.author} {blog.likes} likes {<a href={blog.url}>read here</a>}
                </li>
            ))}
        </ul>
    )
}

const App = () => {

    const [blog, setBlog] = useState([])

    return (
        <Blogs />
    )
}

export default App