import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import CourseCardFullDetails from '../../components/CourseCardFullDetails';

function CourseByCatgories() {
    const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    axios.get(`/categories`)
      .then(response => {
        setCategories(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch courses based on selected category
    axios.get(`/courses/by_category/${selectedCategory}`)
      .then(response => {
        setCourses(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-3 justify-content-between">
        {/* <div className="col" xs={1}> */}
          <h4>
            <Badge variant="secondary" onClick={() => handleCategoryClick(0)} style={{ cursor: 'pointer' }}>
              All
            </Badge>
          </h4>
        {/* </div> */}
        {categories.map(category => (
        //   <div className="col" key={category.id}>
            <h4>
              <Badge variant="secondary" onClick={() => handleCategoryClick(category.id)} style={{ cursor: 'pointer' }}>
                {category.name}
              </Badge>
            </h4>
        //   </div>
        ))}
      </div>
      <div className="row justify-content-between">
        {courses.map(course => (
            <CourseCardFullDetails key={course.id} {...course}/>
        ))}
      </div>
    </div>
  );
}

export default CourseByCatgories
