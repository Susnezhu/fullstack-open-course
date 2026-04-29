import blogService from "../services/blogs";
import { useField } from "../hooks/customQuery"
import styles from "../styles/default"

const LoginForm = ({ rememberUser, dispatchNotification, formsRef }) => {

  const { reset: resetUsername, ...username } = useField('username')
  const { reset: resetPassword, ...password } = useField('password', 'password')

  const handleLogin = (event) => {
    event.preventDefault();

    formsRef.current.toggleVisibility(); // piilottaa kentän kirjautumiseen

    console.log("logging in with", username.value);

    blogService
      .getLoggedUser(username.value, password.value)
      .then((data) => {
        rememberUser(data)
      })
      .catch((error) => {
        console.log("loggin error:", error);
        dispatchNotification({ type: "show_error", message: "Wrong password or username" })
      });

    resetUsername()
    resetPassword()
  };

  return (
    <div>
      <form>
        <label>
          Username:
          <input {...username} />
        </label>
        <br />
        <label>
          Password:
          <input {...password} />
        </label>
        <br />
        <button onClick={handleLogin} id="login_submit" style={styles.lightBtn}>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
