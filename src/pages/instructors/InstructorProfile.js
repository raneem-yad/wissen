import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";

import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { axiosReq } from "../../api/axiosDefaults";
import defaultLogo from "../../assets/default_profile.jpg";
import Avatar from "../../components/Avatar";
import CourseCardFullDetails from "../../components/CourseCardFullDetails";
import CustomButton from "../../components/CustomButton";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Profile.module.css";

const InstructorProfile = (props) => {
  const [rating, setRating] = useState(props.rating_value);
  const [ratingCount, setRatingCount] = useState(props.rating_count);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    id,
    owner,
    expertise,
    job_title,
    rating_value,
    rating_count,
    course_count,
    learner_count,
    profile_id,
    image,
    bio,
    website_link,
    linkedin_link,
    created_date,
    updated_date,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser.username === owner
  

  useEffect(() => {
    const handleMountCourses = async ()=>{

        try {
            const {data} = await axiosReq.get(`/courses/by_instructor/${id}`);
            setInstructorCourses(data.results);
        } catch (error) {
            console.log(error);
        }
    }
    handleMountCourses();
    setRating(rating_value);
    setRatingCount(rating_count);
  }, [id, rating_value, rating_count]);

  const handleRating = async (newRating) => {
    setLoading(true);
    try {
      console.log(
        `data is id ${id} and rating ${newRating} and count ${ratingCount}`
      );

      const response = await axiosReq.post("/instructor-rating/", {
        teacher: id,
        rating: newRating,
      });

      if (response.status === 201) {
        setLoading(false);
        console.log(
          "rating successfully with " + newRating + "and count " + ratingCount
        );
        // Fetch updated course data
        const updatedInstructorResponse = await axiosReq.get(
          `/users/${props.user_id}/`
        );
        const updatedInstructorData = updatedInstructorResponse.data.profile;

        console.log(
          "after rating successfully with " +
            updatedInstructorData.rating_value +
            "and count " +
            updatedInstructorData.rating_count
        );
        setRating(updatedInstructorData.rating_value);
        setRatingCount(updatedInstructorData.rating_count);
        etAlertMessage(error.response?.data.detail);
        setShowAlert(true);
        setAlertVariant("success")
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
  return (
    <Container className={`${styles.ProfileSection}`}>
        {/* top section of the instructor profile  */}
      <Row className="align-items-center">
        {/* left side  {general Informations} */}
        <Col md={6} className="p-3">
          <h1>{owner}</h1>
          <h3>{job_title}</h3>

          {/* statistics */}
          <Row className="align-items-center pl-3">
            <p>
              <strong>
                <i className="fa-solid fa-graduation-cap"></i> Total Learners:{" "}
              </strong>
              {learner_count}
            </p>
          </Row>
          <Row className="pl-3">
            <p>
              <strong>
                <i className="fa-solid fa-chalkboard-user"></i>Total Courses:{" "}
              </strong>
              {course_count}{" "}
            </p>
          </Row>

          <Row className="pl-3">
            <p>
              <strong>
                <i className="fa-regular fa-clock"></i> Joined Date:{" "}
              </strong>
              {created_date}
            </p>
          </Row>
          <Row className="pl-3">
            {/* expertise */}
            {expertise?.length && (
              <p>
                <strong>
                  {" "}
                  <i class="fa-brands fa-square-font-awesome-stroke"></i>{" "}
                  Expertise:{" "}
                </strong>
                {expertise.map((item, index) => (
                  <Link to={`tags/${item.id}`} key={item.id}>
                    {" "}
                    <span>#{item.name}</span>
                  </Link>
                ))}
              </p>
            )}
          </Row>
          <Row className="pl-3">
            {!loading && (is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't rate yourself!</Tooltip>}
              >
                <div>
                  <Rating
                    onClick={handleRating}
                    initialValue={rating}
                    size={20}
                    readonly={true}
                  />
                </div>
              </OverlayTrigger>
            ) : currentUser ? (
              <Rating
                onClick={handleRating}
                initialValue={rating}
                size={20}
                readonly={false}
              />
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You have to login first!</Tooltip>}
              >
                <Rating
                  onClick={handleRating}
                  initialValue={rating_value}
                  size={20}
                  readonly={true}
                />
              </OverlayTrigger>
            ))}
            {!loading && ratingCount && (
              <p className="text-muted"> Rated by {ratingCount} People</p>
            )}
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
          <Row className="m-3">
            {linkedin_link && <Col>
              <CustomButton
                link={linkedin_link}
                text="Linkedin"
                icon='<i className="fa-brands fa-linkedin"></i>'
              />
            </Col>}
           {website_link && <Col>
              <CustomButton
                link={website_link}
                text="Website"
                icon='<i className="fa-solid fa-window-maximize"></i>'
              />
            </Col>}
          </Row>
          
          {is_owner && <Row className="m-3">
            <Col>
              <Link to={`/instructor/${id}/edit`}><i className={`fa fa-edit  ${styles.iHover}`} /></Link>
            </Col>
            
          </Row>}
        </Col>
      </Row>


      {/* courses section in the instructor  */}
      <hr/>
      <h3>Instructor Courses ({instructorCourses.length})</h3>
      <div className="row justify-content-between">
        {instructorCourses.length ? 
         (instructorCourses.map(course => (
            <CourseCardFullDetails key={course.id} {...course}/>
        ))):(<Row className="ml-3"><p>Create Course to your added Courses here</p></Row>)}
      </div>
    </Container>
  );
};

export default InstructorProfile;
