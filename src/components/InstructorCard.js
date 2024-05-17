import React from 'react'
import { Badge, Col, Media, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import styles from "../styles/Instructor.module.css"
import Avatar from './Avatar';

function InstructorCard(props) {
    const {
        id ,
    owner,
    expertise ,
    job_title ,
    rating_value ,
    rating_count ,
    course_count ,
    image, 
    bio,
    learner_count ,
    website_link ,
    linkedin_link ,
    is_owner ,
    created_date ,
    updated_date ,
    } = props;
  return (
    <Col lg={5} className={`${styles.InstructorCard} m-2`}>
        
        <Media className='p-2'>
        <Col>
        <Link to={`profiles/${id}`} >
        <Avatar src={image} height={64}  className=" align-self-center mr-3"/>
        </Link>
        <h5>{owner}</h5>
        <h6>{job_title}</h6>
        {expertise && 
        
        expertise.map((item, index) => (
          <Link to={`expertise/${item.id}`}><Badge pill variant="warning"> #{item.name} </Badge>{' '}</Link>
        )
     
    )}
        </Col>
  <Media.Body>
    
   
    {/* statics  */}
    <Row className='p-2  align-items-center'>
    <div><Rating
        size={25}
        initialValue={rating_value}
        readonly={true}
       
      />rated by {rating_count}</div>
      <div>
      <i className="fa-solid fa-graduation-cap"></i>{learner_count} Learners
      </div>
      <div>
      <i className="fa-solid fa-chalkboard-user"></i>{course_count} Courses
      </div>
    </Row>
    
    <p>
      {bio}
    </p>
  </Media.Body>
</Media>
    </Col>
  )
}

export default InstructorCard
