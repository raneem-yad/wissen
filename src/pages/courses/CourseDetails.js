import React from "react";
import { Col, Row } from "react-bootstrap";
import StarRating from "../../components/StarRating";

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
  return (
    <>
        {/* Top Section of the Course Details  */}
        <Col className="py-2 p-0 p-lg-2" lg={8}>
            {course_name && <h1>{course_name}</h1>}
            {description && <p> {description}</p>}
            {/* staticts part  */}
            <Row>
                <StarRating to_rate={true} />
            </Row>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
            Popular profiles for desktop
        </Col>
    </>
  );
};

export default CourseDetails;
