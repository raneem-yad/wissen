import styles from '../App.module.css';
import logo from "../assets/logo_with_title.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-left">
            <img src={logo} alt="Logo" className={styles.Logo} />
          </Col>
          <Col xs={12} md={6} className="text-center text-md-right">
            <p className="mb-0">&copy; {new Date().getFullYear()} Wissen. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer