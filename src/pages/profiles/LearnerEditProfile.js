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

function LearnerEditProfile() {
  const { id } = useParams();
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    full_name:"",
    image: "",
    owner:"",
    owner_username:""
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/learners/${id}/`);
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
    submissionData.append("bio", formData.bio);
    submissionData.append("full_name", formData.full_name);
    submissionData.append("owner", formData.owner);

    if (imageFile) {
      submissionData.append("image", imageFile);
    }

    // Log FormData entries for debugging
    for (let [key, value] of submissionData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await axiosReq.put(`/learners/${id}`, submissionData);
      setShowAlert(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.TopMargin}>
      <Container>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Profile Updated successfully!
        </Alert>
      )}
      </Container>
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
              <Form.Group className="w-100">
              <Form.Group controlId="jobTitle">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: David Schwarz"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Control
                  as="textarea"
                  rows={7}
                  placeholder="Enter bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

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
              <Container
                className={`${appStyles.Content} d-flex justify-content-around`}
              >
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
            </Row>
          </Form>
        </Container>
      )}

      
    </div>
  );
}

export default LearnerEditProfile;
