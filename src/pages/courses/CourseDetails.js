import axios from "axios";
import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/CourseDetails.module.css";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Rating } from "react-simple-star-rating";
import { MoreDropdown } from "../../components/MoreDropdown";
import ConfirmationModal from "../../components/ConfirmationModal";
import CourseShareModal from "../../components/CourseShare";
import AlertMessage from "../../components/AlertMessage";

const CourseDetails = (props) => {
  const [videos, setVideos] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(props.is_learner_enrolled_in_course)
  const [rating, setRating] = useState(props.rating_value);
  const [ratingCount, setRatingCount] = useState(props.rating_count);
  const [showModal, setShowModal] = useState(false);
  const [showShareButtonModal, setShowShareButtonModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [loading, setLoading] = useState(false);

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
    teacher_profile_id,
    teacher_image,
    posted_date,
    updated_date,
    coursePage,
    setCourses,
  } = props;
  const url = window.location.href;

  useEffect(() => {
    axios
      .get(`/courses/${id}/videos/`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course vidoes:", error);
      });

    setRating(rating_value);
    setRatingCount(rating_count);
  }, [id]);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === teacher;
  const navigate = useNavigate();
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };
  const handleRating = async (newRating) => {
    setLoading(true);
    try {
      console.log(
        `data is id ${id} and rating ${newRating} and count ${ratingCount}`
      );
      const response = await axiosReq.post("/rating/", {
        course: id,
        rating: newRating,
      });

      if (response.status === 201) {
        setLoading(false);
        console.log(
          "rating successfully with " + newRating + "and count " + ratingCount
        );

        // Fetch updated course data
        const updatedCourseResponse = await axios.get(`/courses/${id}/`);
        const updatedCourseData = updatedCourseResponse.data;

        console.log(
          "after rating successfully with " +
            updatedCourseData.rating_value +
            "and count " +
            updatedCourseData.rating_count
        );
        setRating(updatedCourseData.rating_value);
        setRatingCount(updatedCourseData.rating_count);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting rating:", error);
      setAlertMessage(error.response?.data.detail);
      setShowAlert(error.response?true:false);
      setAlertVariant("danger")
      setRating(rating_value);
      setRatingCount(rating_count);
    }
  };

  const handleEnrollment = async()=>{
    try {
      const response = await axiosReq.post(`/courses/${id}/enroll/`);

      if (response.status === 200) {
        console.log(
          "enrolled successfully"
        );
        setIsEnrolled(true);
        setAlertMessage("Congrats! You have been Enrolled in Course Successfully ^_^ More Information will be sent to you later!");
        setShowAlert(true);
        setAlertVariant("success")
      }
    } catch (error) {
      setAlertMessage(error.response?.data.detail);
      setShowAlert(error.response? true : false);
      setAlertVariant("danger")
    }
  }

  const handleEdit = () => navigate(`/courses/${id}/edit`);
  const handleDelete = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShareButtonShow = () => setShowShareButtonModal(true);
  const handleShareButtonClose = () => setShowShareButtonModal(false);

  const handleConfirm = async () => {
    try {
      console.log(`I'm trying to delete it`);
      await axiosRes.delete(`/courses/${id}/`);
      navigate(-1);
    } catch (err) {
      console.log(err);
      setAlertMessage("Error Deleting the course! Try again later!");
      setShowAlert(true);
      setAlertVariant("danger")
    }
  };

  return (
    <>
      {/* Top Section of the Course Details  */}
      <Col className={`py-2 p-3 p-lg-2 ${styles.Info}`} lg={7}>
        {showAlert && (
          <AlertMessage
            variant={alertVariant}
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
        {course_name && (
          <h1>
            {course_name}{" "}
            {is_owner && coursePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </h1>
        )}
        {description && <p> {description}</p>}
        {/* staticts part  */}

        {/* rating */}
        {!loading && (is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't rate your own Course</Tooltip>}
          >
            <div>
              <Rating
                onClick={handleRating}
                initialValue={rating}
                readonly={true}
              />
            </div>
          </OverlayTrigger>
        ) : currentUser ? (
          <Rating
            onClick={handleRating}
            initialValue={rating}
            readonly={false}
          />
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You have to login first</Tooltip>}
          >
            <Rating
              onClick={handleRating}
              initialValue={rating_value}
              readonly={true}
            />
          </OverlayTrigger>
        ))}
        {!loading && ratingCount && <p className="text-muted">Rated by {ratingCount}</p>}
        {/* instructor and data about it */}
        {teacher && (
          <p>
            <strong>Created By: </strong>
            <Link to={`/profiles/${teacher_profile_id}`}>
              <Avatar src={teacher_image} height={30} /> {teacher}
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
            {tags_details.map((item, index) => (
              <Link to={`tags/${tags[index]}`} key={tags[index]}>
                {" "}
                <span>#{item}</span>
              </Link>
            ))}
          </p>
        )}
      </Col>
      <Col lg={5} className="p-2">
        <Card className={styles.CustomCard}>
          <Card.Img variant="top" src={image} />
          {!isEnrolled && (
            <Card.Header className={`text-center ${styles.CustomCardHeader}`} onClick={handleEnrollment}>
              <h2>Enroll</h2>
            </Card.Header>
          )}
          <ListGroup variant="flush">
            <ListGroup.Item className={styles.ListGroupItem}>
              {/* share icon */}
              <p
                className={`text-center d-flex flex-row justify-content-around  ${styles.InteractionIcons}`}
              >
                <i
                  onClick={handleShareButtonShow}
                  className="fa-regular fa-share-from-square"
                ></i>
                <CourseShareModal
                  show={showShareButtonModal}
                  handleClose={handleShareButtonClose}
                  url={url}
                  title={course_name}
                  description={description}
                />

                <p className="d-inline-block mb-0">
                  <i className="fa-regular fa-comment"></i> {comments_count}{" "}
                  reviewer
                </p>

                <p className="d-inline-block mb-0">
                  <i className="fa-solid fa-graduation-cap"></i>{" "}
                  {students_count} Learner
                </p>

                {/* students */}
              </p>
            </ListGroup.Item>
            {course_requirements && (
              <ListGroup.Item>
                <h3>Prerequisites</h3>

                <p
                  dangerouslySetInnerHTML={createMarkup(course_requirements)}
                ></p>
              </ListGroup.Item>
            )}
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
      {videos.length && (
        <Row className="w-100 p-2">
          <Col>
            <h2 className="my-4">Course Content</h2>
            <ListGroup variant="flush">
              {videos.map((video) => {
                const videoItem = (
                  <ListGroup.Item
                    key={video.id}
                    action
                    onClick={() => {}}
                    className="d-flex flex-row justify-content-between align-items-center"
                  >
                    <span>
                      <i className="fa-regular fa-file-video"></i> {video.title}
                    </span>
                    <span>{video.duration}s</span>
                  </ListGroup.Item>
                );

                if (is_learner_enrolled_in_course) {
                  return videoItem;
                } else if (currentUser) {
                  return (
                    <OverlayTrigger
                      key={video.id}
                      placement="top"
                      overlay={
                        <Tooltip>
                          You aren't enrolled in this course yet
                        </Tooltip>
                      }
                    >
                      {videoItem}
                    </OverlayTrigger>
                  );
                } else {
                  return (
                    <OverlayTrigger
                      key={video.id}
                      placement="top"
                      overlay={
                        <Tooltip>
                          You have to create an account to see course content
                        </Tooltip>
                      }
                    >
                      {videoItem}
                    </OverlayTrigger>
                  );
                }
              })}
            </ListGroup>
          </Col>
        </Row>
      )}
      {/* confirmation modal  */}
      <ConfirmationModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        message="Are you sure you want to delete this course?"
      />
    </>
  );
};

export default CourseDetails;
