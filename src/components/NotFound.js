import React from "react";
import { Container } from "react-bootstrap";
import  Row  from "react-bootstrap/Row";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Assets";

const NotFound = () => {
  return (
   <Container>
     <Row className={`${styles.NotFound} justify-content-center` }>
      <Asset
        src={NoResults}
        message={`Sorry, the page you're looking for doesn't exist`}
      />
    </Row>
   </Container>
  );
};

export default NotFound;