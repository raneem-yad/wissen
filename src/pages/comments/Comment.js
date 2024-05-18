import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import ConfirmationModal from "../../components/ConfirmationModal";
import { MoreDropdown } from "../../components/MoreDropdown";
import { CurrentUserContext, useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Comment.module.css";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
  const { profile_id, profile_image, owner, updated_at, content, id, setCourses, setComments } = props;
  const is_owner = currentUser?.username === owner;


  const handleEdit = () => {
    navigate(`/courses/${id}/edit`);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    try {
      console.log(`I'm trying to delete it`);
      await axiosRes.delete(`/comments/${id}/`);
      setCourses(prevCourse => ({
        results:[{
          ...prevCourse.results[0],
          comments_count:prevCourse.results[0].comments_count -1
        }]
      }))
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment)=>comment.id!== id),
      }));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm id={id}
            profile_id={profile_id}
            content={content}
            profileImage={profile_image}
            setComments={setComments}
            setShowEditForm={setShowEditForm} />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
      <ConfirmationModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        message="Are you sure you want to delete this Comment?"
      />
    </>
  );
};

export default Comment;