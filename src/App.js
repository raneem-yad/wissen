import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Routes , Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from './pages/auth/SignInForm';
import { createContext } from 'react';
import CourseCreateForm from './pages/courses/CourseCreateForm';
import Home from './pages/Home';
import CoursePage from './pages/courses/CoursePage';
import CourseSearch from './pages/courses/CourseSearch';
import CourseEditForm from './pages/courses/CourseEditForm';
import CoursesByTags from './pages/courses/CoursesByTags';
import Profiles from './pages/profiles/Profiles';
import InstructorEditProfile from './pages/instructors/InstructorEditProfile';
import LearnerEditProfile from './pages/profiles/LearnerEditProfile';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
function App() {

  return (
    <div className={styles.App}>
      <NavBar/>
      <div className={styles.Main}>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/signin" element={<SignInForm/>} />
          <Route  path="/signup" element={ <SignUpForm/>} />
          {/* courses links */}
          <Route  path="/courses/" element={ <CourseSearch/>} />
          <Route  path="/courses/create" element={ <CourseCreateForm/>} />
          <Route  path="/courses/:id" element={ <CoursePage message ="No results found. Adjust the search keyword."/>} />
          <Route  path="/courses/:id/edit" element={ <CourseEditForm/> } />
          <Route  path="/tags/:id" element={ <CoursesByTags/> } />
          <Route  path="/profiles/:id" element={ <Profiles/> } />
          <Route  path="/instructor/:id/edit" element={ <InstructorEditProfile/> } />
          <Route  path="/learner/:id/edit" element={ <LearnerEditProfile/> } />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      {/* footer section  */}
      <Footer/>
    </div>
  );
}

export default App;
