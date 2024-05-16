import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import InstructorCard from '../../components/InstructorCard';

function InstructorTopSix() {
    const [topInstrcutors, setTopInstrcutors] = useState([]);
  useEffect(() => {
    console.log(`getting top three instructors_top-instructors_list `)
    



    axios
      .get(`/instructors/top-instructors/`)
      .then((response) => {
        setTopInstrcutors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top three courses:", error);
      });
  }, []);
  return (
    <Row className='mt-5 p-2'>
      <Col>
      <h1> Top Rated Instructors </h1>
     <Row className='justify-content-between g-2'>
     {
        topInstrcutors.map((instrutor  )=> <InstructorCard key={instrutor.id} {...instrutor}/>)
      }
     </Row>
      
      </Col>
     
    </Row>
  )
}

export default InstructorTopSix
