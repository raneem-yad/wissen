import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/CourseCreateEditForm.module.css";
import InstructorProfile from '../instructors/InstructorProfile';
import LearnerProfile from '../learners/LearnerProfile';

function Profiles() {
    const { id } = useParams();
    const [profile, setProfile] = useState({});
    const currentUser = useCurrentUser();
    const profileType = currentUser?.profile_type;

    useEffect(() => {
        const handleMount = async () => {
            try {
                const endpoint = profileType === "learner" ? `/learners/${id}` : `/instructors/${id}`;
                const { data } = await axiosReq.get(endpoint);
                setProfile(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id, profileType]);

    return (
        <div className={styles.TopMargin}>
            
            {profileType === "learner" ? (
                <LearnerProfile  {...profile} />
            ) : (
                <InstructorProfile {...profile} />
            )}
        </div>
    );
}

export default Profiles;
