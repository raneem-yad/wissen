import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Assets";
import appStyles from "../../App.module.css";
import styles from "../../styles/CourseCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function InstructorEditProfile() {
  const { id } = useParams();
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    job_title: "",
    bio: "",
    website_link: "",
    linkedin_link: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/instructors/${id}`);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    handleMount();
  }, [id]);

  useEffect(() => {
    if (showAlert) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showAlert]);


  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      URL.revokeObjectURL(formData.image);
      setFormData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
      setImageFile(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("job_title", formData.job_title);
    submissionData.append("bio", formData.bio);
    submissionData.append("website_link", formData.website_link);
    submissionData.append("linkedin_link", formData.linkedin_link);

    if (imageFile) {
      submissionData.append("image", imageFile);
    }

    try {
      const { data } = await axiosReq.put(`/instructors/${id}/`, submissionData);
      setShowAlert(true);
      setCurrentUser((prevData) => ({ ...prevData, profile_image: data.image }));
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  return (
    <div className={styles.TopMargin}>
      {showAlert && (
        <Container>
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Profile Updated successfully!
          </Alert>
        </Container>
      )}
      {loading ? (
        <Asset spinner />
      ) : (
        <Container>
          <h2 className="mt-5">Edit Your Profile</h2>
          <Form
            noValidate
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <Row className="mt-3">
              <Col lg={6}>
                <Form.Group controlId="jobTitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter job title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="websiteLink">
                  <Form.Label>Website Link</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter website link"
                    name="website_link"
                    value={formData.website_link}
                    onChange={handleChange}
                    pattern="https?://.+"
                  />
                </Form.Group>

                <Form.Group controlId="linkedinLink">
                  <Form.Label>LinkedIn Link</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter LinkedIn link"
                    name="linkedin_link"
                    value={formData.linkedin_link}
                    onChange={handleChange}
                    pattern="https?://.+"
                  />
                </Form.Group>

                <Form.Group controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Container
                  className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                >
                  <Form.Group className="text-center">
                    {formData.image ? (
                      <>
                        <figure>
                          <Image
                            className={appStyles.Image}
                            src={formData.image}
                            rounded
                          />
                        </figure>
                        <div>
                          <Form.Label
                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                            htmlFor="image-upload"
                          >
                            Change the image
                          </Form.Label>
                        </div>
                      </>
                    ) : (
                      <Form.Label
                        className="d-flex justify-content-center"
                        htmlFor="image-upload"
                      >
                        <Asset
                          src={Upload}
                          message="Click or tap to upload an image"
                        />
                      </Form.Label>
                    )}
                    <Form.File
                      id="image-upload"
                      accept="image/*"
                      onChange={handleChangeImage}
                      ref={imageInput}
                    />
                  </Form.Group>
                </Container>
              </Col>
            </Row>
            <Container className={`m-4 d-flex justify-content-end`}>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                Update
              </Button>
            </Container>
          </Form>
        </Container>
      )}
    </div>
  );
}

export default InstructorEditProfile;
