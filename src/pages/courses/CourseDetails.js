import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {useCurrentUser} from "../../contexts/CurrentUserContext"
import StarRating from "../../components/StarRating";
import styles from "../../styles/CourseDetails.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
const CourseDetails = (props) => {
  const [videos, setVideos] = useState([]);
  
  const {
    id,
    course_name,
    category_name,
    category_id,
    summery,
    level_label,
    description,
    course_requirements,
    learning_goals,
    tags_details,
    tags, 
    students,
    students_count,
    student_id,
    is_learner_enrolled_in_course,
    rating_value,
    rating_count,
    comments,
    comments_count,
    image,
    teacher,
    is_course_owner,
    teacher_id,
    teacher_image,
    posted_date,
    updated_date,
    coursePage,
  } = props;

  useEffect(() => {
    axios
    .get(`/courses/${id}/videos/`)
    .then((response) => {
      setVideos(response.data);
    })
    .catch((error) => {
      console.error("Error fetching course vidoes:", error);
    });

  }, [id]);

  
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === teacher
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };
  return (
    <>
      {/* Top Section of the Course Details  */}
      <Col className={`py-2 p-3 p-lg-2 ${styles.Info}`} lg={7}>
        {course_name && <h1>{course_name} {is_owner && coursePage && "..."}</h1>}
        {description && <p> {description}</p>}
        {/* staticts part  */}
        
          {/* rating */}
          {is_owner ? (
  <OverlayTrigger placement="top" overlay={<Tooltip>You can't rate your own Course</Tooltip>}>
    <span>
    <StarRating
    to_rate={false}
    rating_value={rating_value}
    rating_count={rating_count}
  />
    </span>
  </OverlayTrigger>
) : currentUser ? (
  <StarRating
    to_rate={true}
    rating_value={rating_value}
    rating_count={rating_count}
  />
) : (
  <StarRating
    to_rate={false}
    rating_value={rating_value}
    rating_count={rating_count}
  />
)}
     
        {/* instructor and data about it */}
        {teacher && (
          <p>
            <strong>Created By: </strong>
            <Link to={`profiles/${teacher_id}`}>
              <Avatar src={teacher_image} height={30}/> {teacher}
            </Link>
          </p>
        )}
        {updated_date && (
          <p>
            <strong>Last Update: </strong>
            {updated_date}
          </p>
        )}
        {tags_details && (
          <p>
            <strong>Tags: </strong>
            {tags_details.map((item, index) => <Link to={`tags/${tags[index]}`}> #{item}</Link> )}
          </p>
        )}
      </Col>
      <Col lg={5} className="p-2">
        <Card className={styles.CustomCard}>
          <Card.Img variant="top" src={image} />
          
          <Card.Header className={`text-center ${styles.CustomCardHeader}`}><h2>Enroll</h2></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item  className={styles.ListGroupItem}>
                {/* share icon */}
                <p className={`text-center d-flex flex-row justify-content-between  ${styles.InteractionIcons}`}>
                <i className="fa-regular fa-share-from-square"></i>
                {3 > 0 && <p className="d-inline-block mb-0"><i className="fa-regular fa-comment"></i> {comments_count} reviewer</p>}
                {3 > 0 && <p className="d-inline-block mb-0"><i class="fa-solid fa-graduation-cap"></i> {students_count} Learner</p>}
          {/* students */}
          &nbsp;&nbsp;&nbsp;
          
                </p>
              </ListGroup.Item>
              {course_requirements && <ListGroup.Item>
                <h3>
                Prerequisites
                </h3>

                <p dangerouslySetInnerHTML={createMarkup(course_requirements)}></p>
              </ListGroup.Item>}
              
            </ListGroup>
         
        </Card>
      </Col>

      {/* learning goals section  */}
      
      <Row className={styles.LearningGoals}>
        <Col>
        <h2 className="d-block">Learning Goals </h2>
        <div dangerouslySetInnerHTML={createMarkup(learning_goals)}></div>
        </Col>
      </Row>

      {/* Viedo Content */}
      <Row className="w-100 p-2">
                <Col >
                <h2 className="my-4">Course Content</h2>
            <ListGroup variant="flush" >
              
              {videos.map((video)=>{
                return <ListGroup.Item key={video.id} action onClick={()=>{}} className=" d-flex flex-row justify-content-between align-items-center">
                <span><i className="fa-regular fa-file-video"></i> {video.title}</span> 
                <span>{video.duration}s</span>
                </ListGroup.Item>
              })}

         </ListGroup></Col>
      </Row>
    </>
  );
};

export default CourseDetails;
