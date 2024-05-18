import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../styles/CustomButton.module.css';

const CustomButton = ({ link, text, Icon }) => {
    const handleClick = () => {
        window.open(link, '_blank');
    };

    return (
        <Button className={styles.CustomButton} onClick={handleClick}>
            {Icon} {text}
        </Button>
    );
};

export default CustomButton;
