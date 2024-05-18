import React, { useEffect, useState } from "react";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import CourseCardFullDetails from "../../components/CourseCardFullDetails";
import CustomButton from "../../components/CustomButton";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Profile.module.css";

const InstructorProfile = (props) => {
  const [rating, setRating] = useState(props.rating_value);
  const [ratingCount, setRatingCount] = useState(props.rating_count);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const {
    id,
    owner,
    expertise,
    job_title,
    rating_value,
    rating_count,
    course_count,
    learner_count,
    image,
    bio,
    website_link,
    linkedin_link,
    is_owner,
    created_date,
    updated_date,
  } = props;
  const currentUser = useCurrentUser();


  useEffect(() => {
    const handleMount = async ()=>{

        try {
            const {data} = await axiosReq.get(`/courses/by_instructor/${id}`);
            setInstructorCourses(data.results);
        } catch (error) {
            console.log(error);
        }
    }
    handleMount();
    setRating(rating_value);
    setRatingCount(rating_count);
  }, [id, rating_value, rating_count]);

  const handleRating = async (newRating) => {
    try {
      console.log(
        `data is id ${id} and rating ${newRating} and count ${ratingCount}`
      );

      const response = await axiosReq.post("/instructor-rating/", {
        teacher: id,
        rating: newRating,
      });

      if (response.status === 201) {
        console.log(
          "rating successfully with " + newRating + "and count " + ratingCount
        );

        // Fetch updated course data
        const updatedInstructorResponse = await axios.get(
          `/instructors/${id}/`
        );
        const updatedInstructorData = updatedInstructorResponse.data;

        console.log(
          "after rating successfully with " +
            updatedInstructorData.rating_value +
            "and count " +
            updatedInstructorData.rating_count
        );
        setRating(updatedInstructorData.rating_value);
        setRatingCount(updatedInstructorData.rating_count);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
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
            {is_owner ? (
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
            )}
            {ratingCount && (
              <p className="text-muted"> Rated by {ratingCount} People</p>
            )}
          </Row>

          <Row className="pl-3">
            <p>
              <strong>
                <i className="fa-solid fa-user-tie"></i>
              </strong>
              About Me : {bio}
            </p>
          </Row>
        </Col>
        {/* right side {image - links} */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Link to={`profiles/${id}`}>
            <Avatar src={image} height={180} />
          </Link>
          <Row className="m-3">
            <Col>
              <CustomButton
                link={linkedin_link}
                text="Linkedin"
                icon='<i className="fa-brands fa-linkedin"></i>'
              />
            </Col>
            <Col>
              <CustomButton
                link={website_link}
                text="Website"
                icon='<i className="fa-solid fa-window-maximize"></i>'
              />
            </Col>
          </Row>
          <Row className="m-3">
            <Col>
              <i className="fa fa-edit" />
            </Col>
            
          </Row>
        </Col>
      </Row>


      {/* courses section in the instructor  */}
      <hr/>
      <h3>Instructor Courses ({instructorCourses.length})</h3>
      <div className="row justify-content-between">
        
        { instructorCourses.map(course => (
            <CourseCardFullDetails key={course.id} {...course}/>
        ))}
      </div>
    </Container>
  );
};

export default InstructorProfile;
