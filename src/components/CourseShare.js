import React, { useState } from 'react';
import  Modal  from 'react-bootstrap/Modal';
import  Button  from 'react-bootstrap/Button';
import styles from '../styles/CourseDetails.module.css'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

const CourseShareModal = ({ show, handleClose, url, title, description }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share this course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.CourseShareButtons}>
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={url} title={title} summary={description}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseShareModal;
