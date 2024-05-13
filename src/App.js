import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import { Routes , Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from './pages/auth/SignInForm';
import { createContext } from 'react';
import PostCreateForm from './pages/courses/CourseCreateForm';
import Home from './pages/Home';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
function App() {

  return (
    <div className={styles.App}>
      <NavBar/>
      {/* <Container className={styles.Main}> */}
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/signin" element={<SignInForm/>} />
          <Route  path="/signup" element={ <SignUpForm/>} />
          {/* courses links */}
          <Route  path="/courses/create" element={ <PostCreateForm/>} />
          <Route element={<p>Page not found!</p>} />
        </Routes>
      {/* </Container> */}
    </div>
  );
}

export default App;
