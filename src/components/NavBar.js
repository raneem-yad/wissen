import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo_with_title.png";
import defaultLogo from "../assets/default_profile.jpg";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };
  const loggedInIcons = (
    <>
      {currentUser?.profile_type === "instructor" ? (
        <NavLink to="/courses/create">
          <i className="fa-solid fa-square-plus"></i>Add Course
        </NavLink>
      ) : (
        <></>
      )}
      <NavLink onClick={handleSignOut} to="/">
        <i className="fas fa-sign-out-alt"></i> Log out
      </NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar
          src={currentUser?.profile_image || defaultLogo}
          text="Profile"
          height={40}
        />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );
  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              to="/"
              // exact
              // className={styles.NavLink}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink
              to="/courses"
              // exact
              // className={styles.NavLink}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <i className="fa-solid fa-book-open-reader"></i>courses
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
