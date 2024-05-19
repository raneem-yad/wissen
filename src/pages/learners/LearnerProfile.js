import React from 'react'
import { Container ,Row , Col} from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Profile.module.css";
import { Link } from "react-router-dom";
import defaultLogo from "../../assets/default_profile.jpg";
import Avatar from "../../components/Avatar";
import CourseCardFullDetails from '../../components/CourseCardFullDetails';

const LearnerProfile = (props) =>  {
    const {
        id ,
    owner ,
    owner_username, 
    full_name ,
    bio ,
    image ,
    profile_id,
    created_date ,
    updated_date,
    enrolled_courses_count ,
    enrolled_courses 
} = props;
const currentUser = useCurrentUser();
const is_owner = currentUser.username === owner_username;
return (
    <Container className={`${styles.ProfileSection}`}>
        {/* top section of the instructor profile  */}
      <Row className="align-items-center">
        {/* left side  {general Informations} */}
        <Col md={6} className="p-3">
          <h1>{owner_username}</h1>

          {/* statistics */}
        
          

          <Row className="pl-3">
            <p>
              <strong>
                <i className="fa-regular fa-clock"></i> Joined Date:{" "}
              </strong>
              {created_date}
            </p>
          </Row>
         
          {bio && <Row className="pl-3">
            <p>
              <strong>
                <i className="fa-solid fa-user-tie"></i>
              </strong>
              About Me : {bio}
            </p>
          </Row>}
        </Col>
        {/* right side {image - links} */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={image || defaultLogo} height={180} />
          </Link>
          {is_owner && <Row className="m-3">
            <Col>
            <Link to={`/learner/${id}/edit`}>
              <i className={`fa fa-edit  ${styles.iHover}`} />
              </Link>
            </Col>
            
          </Row>}
        </Col>
      </Row>


      {/* courses section in the instructor  */}
      <hr/>
      <h3>My Learning ({enrolled_courses_count})</h3>
      <div className="row justify-content-between">
        
        { enrolled_courses.length ? enrolled_courses.map(course => (
            <CourseCardFullDetails key={course.id} {...course}/>
        )): <p className='p-3'>Enroll in Course to track your Progress here!</p>}
      </div>
    </Container>
  );
}

export default LearnerProfile
