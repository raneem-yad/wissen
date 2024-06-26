import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import styles from "../../styles/CourseCreateEditForm.module.css";
import CourseDetails from "./CourseDetails";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Assets";
import { fetchMoreData } from "../../utils/utils";

function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: course }] = await Promise.all([
          axiosReq.get(`/courses/${id}`),
        ]);
        setCourse({ results: [course] });
      } catch (err) {
        // console.log(err);
      }
    };
    axiosReq
      .get(`/comments/?course=${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => {
        // console.error("Error fetching comments", error);
      });

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row className={`h-100 ${styles.CourseTopSection}`}>
        <CourseDetails
          {...course.results[0]}
          setCourses={setCourse}
          coursePage
        />
      </Row>
      <Row>
        <Container className={`${appStyles.Content} my-5`}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={currentUser.profile_image}
              course={id}
              setCourses={setCourse}
              setComments={setComments}
            />
          ) : comments.results?.length ? (
            "Comments"
          ) : null}

          {comments.results?.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setCourses={setCourse}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet! Sign in to be the first person!</span>
          )}
        </Container>
      </Row>
    </Container>
  );
}

export default CoursePage;
