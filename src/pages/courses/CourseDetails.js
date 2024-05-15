import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import StarRating from "../../components/StarRating";
import styles from "../../styles/CourseDetails.module.css";

const CourseDetails = (props) => {
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
  } = props;
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };
  return (
    <>
      {/* Top Section of the Course Details  */}
      <Col className={`py-2 p-3 p-lg-2 ${styles.Info}`} lg={7}>
        {course_name && <h1>{course_name}</h1>}
        {description && <p> {description}</p>}
        {/* staticts part  */}
        
          {/* rating */}
          <StarRating
            to_rate={true}
            rating_value={rating_value}
            rating_count={rating_count}/>
     
        {/* instructor and data about it */}
        {teacher && (
          <p>
            <strong>Created By: </strong>
            {teacher}
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
            {tags_details.map((item, index) => " #"+item )}
          </p>
        )}
      </Col>
      <Col lg={5} className="p-2">
        <Card >
          <Card.Img variant="top" src={image} />
          
          <Card.Header className="text-center"><h2>Enroll</h2></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item >
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
    </>
  );
};

export default CourseDetails;
