import React from "react";
import slide1 from "../assets/slider/slide3.jpg";
import slide2 from "../assets/slider/slide2.jpg";
import slide3 from "../assets/slider/slide6.jpg";
import Carousel from 'react-bootstrap/Carousel';
import styles from "../styles/Hero.module.css";

function HomeHero() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.Slider}`}
          src={slide1}
          alt="First slide"
        />
        <Carousel.Caption>
          <div className={styles.overlay}>
            <h3 className={styles.captionText}>Welcome to Wissen</h3>
            <p className={styles.captionText}>Discover a world of knowledge with Wissen, your premier destination for online learning. Explore a diverse range of courses across various subjects and take your skills to the next level.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
          className={`d-block w-100 ${styles.Slider}`}
          src={slide2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <div className={styles.overlay}>
            <h3 className={styles.captionText}>Learn from Experts</h3>
            <p className={styles.captionText}>At Wissen, our courses are taught by industry experts, academics, and professionals who bring real-world experience and insights to their teaching. Get access to high-quality educational content and learn from the best in the field.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.Slider}`}
          src={slide3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <div className={styles.overlay}>
            <h3 className={styles.captionText}>Flexible Learning Options</h3>
            <p className={styles.captionText}>
              Study at your own pace, anytime, anywhere with Wissen. Whether you're a beginner or an expert, our platform offers flexible learning options to fit your schedule and learning style. Join our community of learners and start your learning journey today!
            </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeHero;
