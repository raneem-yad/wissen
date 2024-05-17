import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import CourseCardFullDetails from "../../components/CourseCardFullDetails";
import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";
import styles from "../../styles/CourseCreateEditForm.module.css";
import { Container, Form, Row } from "react-bootstrap";
import Asset from "../../components/Assets";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function CourseSearch(message, filter = "") {
  const [courses, setCourses] = useState({ results: [] });
  const [hasLoad, setHasLoad] = useState(false);
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let sortQuery = "";
        if (sortOption === "name_asc") {
          sortQuery = "sort_by=name&ascending=true";
        } else if (sortOption === "name_desc") {
          sortQuery = "sort_by=name&ascending=false";
        } else if (sortOption === "date_asc") {
          sortQuery = "sort_by=created_at&ascending=true";
        } else if (sortOption === "date_desc") {
          sortQuery = "sort_by=created_at&ascending=false";
        }
        const { data } = await axiosReq.get(
          `/courses/?search=${query}&${sortQuery}`
        );
        setCourses(data);
        setHasLoad(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoad(false);
    const timer = setTimeout(() => {
      fetchCourses();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query, sortOption]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Container>
      {/* searching Part  */}
      <div
        className={`p-3 d-flex flex-column flex-lg-row align-items-lg-center ${styles.SearchContainer}`}
      >
        <div
          className={`d-flex align-items-center mb-3 mb-lg-0 ${styles.SearchWrapper}`}
        >
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={styles.SearchInput}
              placeholder="Search Courses"
            />
          </Form>
        </div>
        <div className={`d-flex align-items-center ${styles.SortingContainer}`}>
          <label htmlFor="sortOptions" className={styles.SortLabel}>
            Sort by:
          </label>
          <select
            id="sortOptions"
            className={styles.SortSelect}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="name_asc">Alphabetical (A-Z)</option>
            <option value="name_desc">Alphabetical (Z-A)</option>
            <option value="date_asc">Posted Date Ascending</option>
            <option value="date_desc">Posted Date Descending</option>
          </select>
        </div>
      </div>

      {/* render all the courses  */}

      {hasLoad ? (
        <>
        <Row className="jusyify-content-center">
          {courses.results.length ? (
            <InfiniteScroll className="row jusyify-content-center"
              children={courses.results.map((course) => (
                
                  <CourseCardFullDetails
                    className={`m-3`}
                    {...course}
                    key={course.id}
                    setCourses={setCourses}
                  />
               
              ))}
              dataLength={courses.results.length}
              loader={<Asset spinner />}
              hasMore={!!courses.next}
              next={() => fetchMoreData(courses, setCourses)}
            />
          ) : (
            // no results
            <>
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message="No courses found."></Asset>
              </Container>
            </>
          )}
           </Row>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default CourseSearch;
