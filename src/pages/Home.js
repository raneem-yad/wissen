import React from 'react'
import { Container } from 'react-bootstrap'
import CourseCardFullDetails from '../components/CourseCardFullDetails'
import HomeHero from '../components/HomeHero'
import CoursesTopThree from './courses/CoursesTopThree'

const Home = () => {
  return (
    <>
    {/* slider */}
    <HomeHero/>
     {/* top three courses  */}
    <Container>
      <CoursesTopThree/>
    </Container>
     {/* tag courses  */}

     {/* top instructors */}
    </>
  )
}

export default Home