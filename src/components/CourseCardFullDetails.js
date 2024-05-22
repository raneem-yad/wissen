import React from "react";
import Badge  from "react-bootstrap/Badge";
import Button  from "react-bootstrap/Button";
import Row  from "react-bootstrap/Row";
import Card  from "react-bootstrap/Card";

import styles from "../styles/CourseDetails.module.css";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import btnStyles from "../styles/Button.module.css";
import { Rating } from "react-simple-star-rating";

function CourseCardFullDetails(props) {
  const {
    id,
    course_name,
    summery,
    tags_details,
    tags,
    rating_value,
    image,
    teacher,
    teacher_profile_id,
    teacher_image,
    updated_date,
  } = props;

  return (
    <Card
      className={`${styles.CustomCard} my-3 mx-2`}
      style={{ width: "20rem" }}
    >
      <Link to={`/courses/${id}`}>
        <Card.Img variant="top" src={image} alt={course_name} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/courses/${id}`}>
            <h2>{course_name}</h2>
          </Link>
        </Card.Title>
        <Row
          className={`align-items-center justify-content-between   ${styles.InteractionIcons}`}
        >
          {/* instructor profile  */}
          <div>
            <Link to={`/profiles/${teacher_profile_id}`}>
              <Avatar src={teacher_image} height={35} /> {teacher}
            </Link>
          </div>
          {/* updated date */}
          <div>
            <i className="fa-regular fa-clock"></i>
            {updated_date}
          </div>
        </Row>
        <Card.Text className="py-2">
          {tags_details &&
            tags_details.map((item, index) => (
              <Link to={`tags/${tags[index]}`} key={tags[index]}>
                <Badge pill variant="warning">
                  #{item}
                </Badge>{" "}
              </Link>
            ))}

          <br />
          {summery}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        className={`d-flex justify-content-between ${styles.CustomCardFooter}`}
      >
        <Link to={`/courses/${id}`}>
          <Button className={`${btnStyles.Button} ${btnStyles.Bright}`}>
            Learn More
          </Button>
        </Link>
        <Rating size={25} initialValue={rating_value} readonly={true} />
      </Card.Footer>
    </Card>
  );
}

export default CourseCardFullDetails;
