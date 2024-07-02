import { useState, useContext } from "react";
import AuthContext from "./AuthContext";

export default function Form() {
  const { currentUser } = useContext(AuthContext)
  const currentPage = !currentUser ? <LoginPage /> : <Dashboard user={currentUser.name} userEmail={currentUser.email} />

  return (
    <div>
      {currentPage}
    </div>

  )
}

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin, userDatabase } = useContext(AuthContext)
  const [loginMessage, setLoginMessage] = useState('')

  function onSubmit(e) {
    e.preventDefault();
    if (!username && !password) {
      setLoginMessage(`Please enter username and password`)
    } else if (!username) {
      setLoginMessage(`Please enter username`)
    } else if (!password) {
      setLoginMessage(`Please enter password`)
    } else if (username && password) {
      handleLogin(username, password, userDatabase);
    }

    if (!handleLogin(username, password, userDatabase)) {
      setLoginMessage(`wrong username or password`)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username' />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password' />
      <input type='submit' value='Login' />
      <div>
        {loginMessage}
      </div>
    </form>
  )
}

function Dashboard({ user, userEmail }) {
  const { logout } = useContext(AuthContext)

  function onSubmit(e) {
    e.preventDefault();
    logout();
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>Name: {user}</p>
      <p>Email: {userEmail}</p>
      <form onSubmit={onSubmit}>
        <input type='submit' value='Logout' />
      </form>
    </div>
  )
}