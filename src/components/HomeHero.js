import React from "react";
import slide1 from "../assets/slider/slide1.jpg";
import slide2 from "../assets/slider/slide2.jpg";
import slide3 from "../assets/slider/slide3.jpg";
import Carousel from 'react-bootstrap/Carousel';

function HomeHero() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Wissen</h3>
          <p>Discover a world of knowledge with Wissen, your premier destination for online learning. Explore a diverse range of courses across various subjects and take your skills to the next level.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Learn from Experts</h3>
          <p>At Wissen, our courses are taught by industry experts, academics, and professionals who bring real-world experience and insights to their teaching. Get access to high-quality educational content and learn from the best in the field.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Flexible Learning Options</h3>
          <p>
          Study at your own pace, anytime, anywhere with Wissen. Whether you're a beginner or an expert, our platform offers flexible learning options to fit your schedule and learning style. Join our community of learners and start your learning journey today!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeHero;
