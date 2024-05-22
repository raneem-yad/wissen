import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Image,
  Dropdown,
  DropdownButton,
  Alert,
  Container,
} from "react-bootstrap";
import styles from "../../styles/CourseCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";
import Asset from "../../components/Assets";
import { axiosReq } from "../../api/axiosDefaults";
import AlertMessage from "../../components/AlertMessage";

function CourseEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageInput = useRef(null);

  const [postData, setPostData] = useState({
    course_name: "",
    summery: "",
    level: 0,
    selectedCategory: "",
    selectedTags: [],
    description: "",
    course_requirements: "",
    learning_goals: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const {
    course_name,
    summery,
    level,
    selectedCategory,
    selectedTags,
    description,
    course_requirements,
    learning_goals,
    image,
  } = postData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/courses/${id}/`);
        const {
          course_name,
          summery,
          level,
          category,
          tags,
          description,
          course_requirements,
          learning_goals,
          image,
        } = data;

        setPostData({
          course_name,
          summery,
          level,
          selectedCategory: category,
          selectedTags: tags,
          description,
          course_requirements: course_requirements,
          learning_goals,
          image,
        });
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();

    axiosReq
      .get("/categories/")
      .then((response) => setCategories(response.data.results))
      .catch((error) => {
        // console.error("Error fetching course categories:", error)
      });

    axiosReq
      .get("/tags/")
      .then((response) => setTags(response.data.results))
      .catch((error) => {
        // console.error("Error fetching tags:", error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropChange = (eventKey) => {
    setPostData((prevData) => ({
      ...prevData,
      level: eventKey,
    }));
  };

  const handleCategorySelect = (category) => {
    setPostData((prevData) => ({
      ...prevData,
      selectedCategory: category,
    }));
  };

  const handleTagSelect = (tagId) => {
    setPostData((prevData) => ({
      ...prevData,
      selectedTags: prevData.selectedTags.includes(tagId)
        ? prevData.selectedTags.filter((id) => id !== tagId)
        : [...prevData.selectedTags, tagId],
    }));
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(event.target.files[0]),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCategory) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedCategory: ["Category is required."],
      }));
      return;
    }

    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      if (key === "selectedTags") {
        value.forEach((tag) => formData.append("tags", tag));
      } else if (key === "image") {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (key == "selectedCategory") {
        formData.append("category", value);
      } else {
        formData.append(key, value);
      }
    });

    if (imageInput.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/courses/${id}/`, formData);
      navigate(`/courses/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        if (err.response?.data?.detail) {
          setAlertMessage(err.response.data.detail);
          setShowAlert(true);
        }
      }
    }
  };

  const renderTextField = (label, name, value, type = "text") => (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {errors[name]?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </Form.Group>
  );

  const renderTextareaField = (label, name, value) => (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={6}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {errors[name]?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </Form.Group>
  );

  return (
    <div className={styles.TopMargin}>
      <Container>
        {showAlert && (
          <AlertMessage
            variant={alertVariant}
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
      </Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Container className={appStyles.Content}>
            {renderTextField("Course Name", "course_name", course_name)}
            {renderTextField("Summary", "summery", summery)}
            <DropdownButton
              title={
                level === ""
                  ? "Select Level"
                  : ["Beginner", "Intermediate", "Advanced"][level]
              }
              onSelect={handleDropChange}
            >
              <Dropdown.Item eventKey="0">Beginner</Dropdown.Item>
              <Dropdown.Item eventKey="1">Intermediate</Dropdown.Item>
              <Dropdown.Item eventKey="2">Advanced</Dropdown.Item>
            </DropdownButton>
            <p>
              Selected Level:{" "}
              {level === ""
                ? "None"
                : ["Beginner", "Intermediate", "Advanced"][level]}
            </p>
            <Form.Group>
              {categories.length > 0 && (
                <DropdownButton
                  title={
                    selectedCategory === ""
                      ? "Select Category"
                      : categories.find((cat) => cat.id == selectedCategory)
                          ?.name
                  }
                  onSelect={handleCategorySelect}
                >
                  {categories.map((category) => (
                    <Dropdown.Item key={category.id} eventKey={category.id}>
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              )}
              {errors?.selectedCategory?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags:</Form.Label>
              {tags.map((tag) => (
                <Form.Check
                  key={tag.id}
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  label={tag.name}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagSelect(tag.id)}
                />
              ))}
            </Form.Group>
            {renderTextareaField(
              "Full Description",
              "description",
              description
            )}
            {renderTextareaField(
              "Course Requirements",
              "course_requirements",
              course_requirements
            )}
            {renderTextareaField(
              "Learning Goals",
              "learning_goals",
              learning_goals
            )}
          </Container>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
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
          <Container className={appStyles.Content}>
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
    </div>
  );
}

export default CourseEditForm;
