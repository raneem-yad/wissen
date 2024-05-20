import React from "react";
import { Container } from "react-bootstrap";
import HomeHero from "../components/HomeHero";
import CourseByCatgories from "./courses/CourseByCatgories";
import CoursesTopThree from "./courses/CoursesTopThree";
import InstructorTopSix from "./instructors/InstructorTopSix";

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
    </>
  );
};

export default Home;
