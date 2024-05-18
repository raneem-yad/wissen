import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Image, Dropdown, DropdownButton, Alert, Container } from "react-bootstrap";

import Upload from "../../assets/upload.png";
import styles from "../../styles/CourseCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function CourseCreateForm() {
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const imageInput = useRef(null);

  const navigate= useNavigate();
  useEffect(() => {
    // Fetch course categories from backend when the component mounts
    axios
      .get("/categories/")
      .then((response) => {
        setCategories(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching course categories:", error);
      });

    // Fetch tags from backend when the component mounts
    axios
      .get("/tags/")
      .then((response) => {
        setTags(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching course categories:", error);
      });
  }, []);

  const [postData, setPostData] = useState({
    title: "",
    summary: "",
    level: 0,
    selectedCategory: "",
    selectedTags: [],
    description:"",
    course_requirement: "",
    learning_goals: "",
    image: "",
  });
  const {
    title,
    summary,
    level,
    selectedCategory,
    selectedTags,
    description,
    course_requirement,
    learning_goals,
    image,
  } = postData;

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDropChange = (eventKey) => {
    setPostData({
      ...postData,
      level: eventKey,
    });
  };

  const handleCategorySelect = (category) => {
    console.log(`Selected category: ${category}`); // Debugging line
    setPostData({
      ...postData,
      selectedCategory: category,
    });
  };

  const handleTagSelect = (tagId) => {
    const index = selectedTags.indexOf(tagId);
    let updatedTags = [...selectedTags];
    // user select the tag and -1 not found
    if (index === -1) {
      updatedTags.push(tagId); // Add tagId if not present
    } else {
      updatedTags = updatedTags.filter((id) => id !== tagId); // Remove tagId if present
    }
    setPostData({
      ...postData,
      selectedTags: updatedTags,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation for selectedCategory
    if (!selectedCategory) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedCategory: ["Category is required."]
      }));
      return; // Prevent form submission
    }

    const tagsArray = selectedTags.map(tag => parseInt(tag));
    const formData = new FormData();

    formData.append("course_name", title);
    formData.append("summery", summary);
    formData.append("level", level);
    formData.append("category", selectedCategory);
    tagsArray.forEach(tag => formData.append("tags", tag));
    formData.append("description", description);
    formData.append("course_requirements", course_requirement);
    formData.append("learning_goals", learning_goals);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/courses/", formData);
      navigate(`/courses/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const actionsButtons = (
    <>
    <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => window.history.back()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
      </>
  );


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control
          type="text"
          name="summary"
          value={summary}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.summary?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
            title={selectedCategory === "" ? "Select Category" : categories.find((cat) => cat.id == selectedCategory)?.name}
            onSelect={handleCategorySelect}
          >
            {categories.map((category) => (
              <Dropdown.Item key={category.id} eventKey={category.id}>
                {category.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
      </Form.Group>
      {errors?.selectedCategory?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
      {/* <Form.Group>
        {tags.length > 0 && (
          <DropdownButton
            title={
              selectedTag === ""
                ? "Select Tag"
                : tags.find((tag) => tag.id == selectedTag)?.name
            }
            onSelect={handleTagSelect}
          >
            {tags.map((tag) => (
              <Dropdown.Item key={tag.id} eventKey={tag.id}>
                {tag.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
      </Form.Group> */}

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

      <Form.Group>
        <Form.Label>Full Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Course Requirements</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="course_requirement"
          value={course_requirement}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.course_requirement?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Learning Goals</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="learning_goals"
          value={learning_goals}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.learning_goals?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      
    </div>
  );

  return (
   <div className={styles.TopMargin}>
     <Form onSubmit={handleSubmit}>
      {/* old style along side between each others */}
      {/* <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
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
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row> */}
      <Row>
          <Container className={appStyles.Content}>{textFields}</Container>
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
          <Container className={appStyles.Content}>{actionsButtons}</Container>
      </Row>
    </Form>
   </div>
  );
}

export default CourseCreateForm;
