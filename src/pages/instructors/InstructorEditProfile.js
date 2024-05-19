import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Assets";
import appStyles from "../../App.module.css";
import styles from "../../styles/CourseCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";
import {
  Form,
  Button,
  Row,
  Image,
  Container,
  Col,
  Alert,
} from "react-bootstrap";

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

    // Log FormData entries for debugging
    for (let [key, value] of submissionData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await axiosReq.put(`/instructors/${id}`, submissionData);
      setShowAlert(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.TopMargin}>
      {loading ? (
        <Asset spinner />
      ) : (
        <Container>
          <h2 className="mt-5">Edit Your Profile</h2>
          <Form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
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
              <Form.Control.Feedback type="invalid">
                Please provide a job title.
              </Form.Control.Feedback>

              <Row className="mt-3">
                <Col lg={6}>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid URL.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid URL.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a bio.
                    </Form.Control.Feedback>
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
                  <Container className={`${appStyles.Content} d-flex justify-content-around`}>
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Blue}`}
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                    <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                      Update
                    </Button>
                  </Container>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Container>
      )}

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Profile Updated successfully!
        </Alert>
      )}
    </div>
  );
}

export default InstructorEditProfile;
