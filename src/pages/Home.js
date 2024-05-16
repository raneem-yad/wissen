import React from 'react'
import { Container } from 'react-bootstrap'
import CourseCardFullDetails from '../components/CourseCardFullDetails'
import HomeHero from '../components/HomeHero'
import CourseByCatgories from './courses/CourseByCatgories'
import CoursesTopThree from './courses/CoursesTopThree'

const Home = () => {
  return (
    <>
    {/* slider */}
    <HomeHero/>
     
    <Container>
      {/* top three courses  */}
      <CoursesTopThree/>
       {/* tag courses  */}
      <CourseByCatgories/>
    </Container>
    

     {/* top instructors */}
    </>
  )
}

export default Home