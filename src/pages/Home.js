import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeHero from "../components/HomeHero";
import CourseByCatgories from "./courses/CourseByCatgories";
import CoursesTopThree from "./courses/CoursesTopThree";
import InstructorTopSix from "./instructors/InstructorTopSix";
import styles from '../App.module.css';
import logo from "../assets/logo_with_title.png";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-left">
            <img src={logo} alt="Logo" className={styles.Logo} />
          </Col>
          <Col xs={12} md={6} className="text-center text-md-right">
            <p className="mb-0">&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};


const Home = () => {
  return (
    <>
      {/* slider */}
      <HomeHero />

      {/* top three courses  */}
      <Container>
        <CoursesTopThree />
      </Container>
      {/* tag courses  */}
      <CourseByCatgories />
      {/* top instructors */}
      <Container>
        <InstructorTopSix />
      </Container>

      {/* footer section  */}
      <Footer/>
    </>
  );
};

export default Home;
