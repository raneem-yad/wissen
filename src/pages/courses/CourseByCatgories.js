import axios from 'axios';
import React, { useEffect, useState } from 'react'
import  Badge  from 'react-bootstrap/Badge';
import  Container  from 'react-bootstrap/Container';
import Asset from '../../components/Assets';
import CourseCardFullDetails from '../../components/CourseCardFullDetails';
import styles from "../../styles/Categories.module.css";

function CourseByCatgories() {
    const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from the backend API
    axios.get(`/categories`)
      .then(response => {
        setCategories(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch courses based on selected category
    setLoading(true);
    axios.get(`/courses/by_category/${selectedCategory}`)
      .then(response => {
        setCourses(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={`${styles.GreyBackground} mt-5`} >
      <Container  >
      {loading ? (<Asset spinner/>) : <>
      <div className="row mb-3 justify-content-center">
        {/* <div className="col" xs={1}> */}
          <h4 className='m-2'>
            <Badge variant="secondary" onClick={() => handleCategoryClick(0)} style={{ cursor: 'pointer' }}>
              All
            </Badge>
          </h4>
        {/* </div> */}
        {categories.map(category => (
        //   <div className="col" key={category.id}>
            <h4 key={category.id} className='m-2'>
              <Badge  variant="secondary" onClick={() => handleCategoryClick(category.id)} style={{ cursor: 'pointer' }}>
                {category.name}
              </Badge>
            </h4>
        //   </div>
        ))}
      </div>
      <div className="row justify-content-center">
        {courses.map(course => (
            <CourseCardFullDetails key={course.id} {...course}/>
        ))}
      </div>
      </>}
    </Container>
    </div>
  );
}

export default CourseByCatgories
