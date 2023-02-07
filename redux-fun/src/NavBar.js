import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './NavStyle.css';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        My Website
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/incdec">Increment/Decrement</CustomLink>
        <CustomLink to="/todo">ToDoList</CustomLink>
        <CustomLink to="/register">Register</CustomLink>
        <CustomLink to="/reduxform">ReduxForm</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children}) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })


  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} >
        {children}
      </Link>
    </li>
  )
}