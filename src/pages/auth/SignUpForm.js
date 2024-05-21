import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import SignUp from "../../assets/auth/signup.png";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";


const SignUpForm = () => {

  const [signUpData, setSignUpData] = useState({
    username: "",
    full_name :"", 
    email:"",
    password1: "",
    password2: "",
    is_instructor: false,
  });
  useRedirect('loggedIn')
  const { username, full_name, email,  password1, password2 , is_instructor  } = signUpData;

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setSignUpData({
      ...signUpData,
      [name]:type === 'checkbox' ? checked : value,

    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      setLoading(false); 
      navigate("/signin", { replace: true });
    } catch (err) {
      // console.log(err)
      setErrors(err.response?.data);
      setLoading(false);
    }
  };

  return (
    <Row className={`${styles.Row} justify-content-center mt-5`}>
      <Col className="my-auto py-2 p-md-2" md={5}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="full_name">
              <Form.Label className="d-none">full_name</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Full Name"
                name="full_name"
                value={full_name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.full_name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="email">
              <Form.Label className="d-none">email</Form.Label>
              <Form.Control
                className={styles.Input}
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="checkbox">
                <Form.Check type="checkbox" 
                  label="Register as an instructor" 
                  name="is_instructor" 
                  checked={is_instructor}
                  onChange={handleChange} />
              </Form.Group>



            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit" disabled={loading} >
              {loading ? "Loading..." : "Sign up"}
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={5}
        className={`my-auto d-none d-md-block p-2`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={SignUp}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;