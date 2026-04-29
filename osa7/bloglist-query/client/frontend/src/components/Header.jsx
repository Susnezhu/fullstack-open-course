import { Link } from "react-router";

import { useUser } from "../hooks/customQuery"

import styles from "../styles/default"

const Header = () => {
  const { user, userLogOut, rememberUser } = useUser()

  const headerStyles = {
    color: "white",
    background: "orange",
    padding: 10,
    textShadow: "1px 1px 2px pink",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const menuStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 25,
    textTransform: "uppercase",
    color: "white!important"
  }

  if (user) {
    return (
      <div style={headerStyles}>
        <h1>Bloglist App</h1>
        <div style={menuStyle}>
          <Link to="/" style={styles.link}>Blogs</Link>
          <Link to="/users"  style={styles.link}>Users</Link>
          <Link to="/new-blog"  style={styles.link}>New blog</Link>
          <Link to="/" onClick={() => userLogOut()}  style={styles.link}>log out</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={styles}>
      <h1>Bloglist App</h1>
    </div>
  )
};

export default Header;
