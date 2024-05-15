import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import styles from "../../styles/CourseCreateEditForm.module.css";
import CourseDetails from "./CourseDetails";

function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: course }] = await Promise.all([
          axiosReq.get(`/courses/${id}`),
        ]);
        setCourse({ results: [course] });
        console.log(course);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row className={`h-100 ${styles.CourseTopSection}`}>
        <CourseDetails {...course.results[0]} setCourses={setCourse} coursePage  />
      </Row>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <p>Popular profiles for mobile</p>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          Popular profiles for desktop
        </Col>
        <Container className={appStyles.Content}>Comments</Container>
      </Row>
    </Container>
  );
}

export default CoursePage;
