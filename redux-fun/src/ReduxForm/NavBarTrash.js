import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
//import { Link, useMatch, useResolvedPath } from "react-router-dom"


const NavBar=() => {
  return (
  

    <>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">RadicalStart</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" activeClassName="active-link">Home</NavLink>
            <NavLink to="/register" activeClassName="active-link">register</NavLink>
           </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
          }
  

// export default ColorSchemesExample;



//     <Container>
//        <Navbar bg="light" expand="lg">
//       <Container fluid>
//         <Navbar.Brand href="/">RadicalStart</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll>
//             <Link to="/" > <Navbar.Brand>Home</Navbar.Brand></Link>
//             <Link to="/register" > <Navbar.Brand>Register</Navbar.Brand></Link>
//         </Nav>
//             </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </Container>
//   );
// }

export default NavBar;