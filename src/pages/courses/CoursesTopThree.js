import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import CourseCardFullDetails from '../../components/CourseCardFullDetails'

function CoursesTopThree() {
  const [topCourses, setTopCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`/courses/top_three`)
      .then((response) => {
        setTopCourses(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching top three courses:", error);
      });
  }, []);

  return (
    <Row className='mt-5 p-2'>
      <Col>
      <h1> Top Rated Courses </h1>
      
     <Row className='justify-content-between'>
     {
        topCourses.map((course  )=> <CourseCardFullDetails key={course.id} {...course}/>)
      }
     </Row>
      
      </Col>
     
    </Row>
  )
}

export default CoursesTopThree
