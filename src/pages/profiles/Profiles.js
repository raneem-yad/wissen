import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/CourseCreateEditForm.module.css";
import InstructorProfile from "../instructors/InstructorProfile";
import LearnerProfile from "../learners/LearnerProfile";
import Asset from "../../components/Assets";

function Profiles() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/users/${id}`);
        setProfile(data);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <div className={styles.TopMargin}>
      {loaded ? (
        profile.role === "learner" ? (
          <LearnerProfile {...profile.profile} />
        ) : (
          <InstructorProfile {...profile.profile} />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
}

export default Profiles;
