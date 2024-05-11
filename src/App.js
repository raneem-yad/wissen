import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import { Routes , Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from './pages/auth/LogInForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Routes>
          <Route  path="/" element={() => <h1>Home page</h1>} />
          <Route  path="/signin" element={<SignInForm/>} />
          <Route  path="/signup" element={ <SignUpForm/>} />
          <Route element={() => <p>Page not found!</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
