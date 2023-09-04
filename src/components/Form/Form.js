import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { Typography, Input, Button, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import FileBase from 'react-file-base64';
import { useToasts } from 'react-toast-notifications'; // Import the useToasts hook

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const { TextArea } = Input;

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    email: '',
    phone: '',
    address: '',
    schoolName: '',
    schoolAddress: '',
    schoolPhone: '',
    schoolEmail: '',
    selectedFile: '',
  });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const { addToast } = useToasts(); // Initialize useToasts hook outside of the function

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: '',
      email: '',
      phone: '',
      address: '',
      schoolName: '',
      schoolAddress: '',
      schoolPhone: '',
      schoolEmail: '',
      selectedFile: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Custom validation
    if (
      !postData.creator ||
      !postData.email ||
      !postData.phone ||
      !postData.address ||
      !postData.schoolName ||
      !postData.schoolAddress ||
      !postData.schoolPhone ||
      !postData.schoolEmail
    ) {
      addToast('All fields are required', { appearance: 'error' });
      return;
    }
  
    if (!validateEmail(postData.email)) {
      addToast('Please enter a valid email', { appearance: 'error' });
      return;
    }
  
    if (!validatePhone(postData.phone) || !validatePhone(postData.schoolPhone)) {
      addToast('Please enter a valid phone number', { appearance: 'error' });
      return;
    }
  
    if (!validateEmail(postData.schoolEmail)) {
      addToast('Please enter a valid school email', { appearance: 'error' });
      return;
    }
  
    if (!isBase64Image(postData.selectedFile)) {
      addToast('Please select a valid image', { appearance: 'error' });
      return;
    }
  
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
      addToast('Post created successfully', { appearance: 'success' });
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
      addToast('Post updated successfully', { appearance: 'success' });
    }
  };
  
  // Function to check if a string is a base64 image
  const isBase64Image = (str) => {
    // Check if the string starts with a data URI header for an image
    return /^data:image\/(jpeg|jpg|png);base64,/.test(str);
  };
  

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Phone number validation function
  const validatePhone = (phone) => {
    const re = /^\d{10}$/; // This regex will match exactly 10 digits
    return re.test(phone);
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography.Title level={4}>{currentId ? `Editing "${post.creator}"` : 'Upload details'}</Typography.Title>
        <Input
          name="creator"
          placeholder="Enter your name"
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          style={{ marginBottom: '16px' }}
          required
          className={classes.placeholderBold} // Add the required attribute
        />
        <Input
          name="email"
          placeholder="Enter your Email"
          value={postData.email}
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
          style={{ marginBottom: '16px' }}
          required
          className={classes.placeholderBold} // Add the required attribute
        />
        <Input
          name="phone"
          placeholder="Enter phone no."
          value={postData.phone}
          onChange={(e) => setPostData({ ...postData, phone: e.target.value })}
          style={{ marginBottom: '16px' }}
          required 
          className={classes.placeholderBold}// Add the required attribute
        />
        <Input
          name="address"
          placeholder="Address"
          value={postData.address}
          onChange={(e) => setPostData({ ...postData, address: e.target.value })}
          style={{ marginBottom: '16px' }}
          required 
          className={classes.placeholderBold}// Add the required attribute
        />
        <Input
          name="schoolName"
          placeholder="School Name"
          value={postData.schoolName}
          onChange={(e) => setPostData({ ...postData, schoolName: e.target.value })}
          style={{ marginBottom: '16px' }}
          required 
          className={classes.placeholderBold}// Add the required attribute
        />
        <Input
          name="schoolAddress"
          placeholder="School Address"
          value={postData.schoolAddress}
          onChange={(e) => setPostData({ ...postData, schoolAddress: e.target.value })}
          style={{ marginBottom: '16px' }}
          required 
          className={classes.placeholderBold}// Add the required attribute
        />
        <Input
          name="schoolPhone"
          placeholder="School Phone"
          value={postData.schoolPhone}
          onChange={(e) => setPostData({ ...postData, schoolPhone: e.target.value })}
          style={{ marginBottom: '16px' }}
          required
          className={classes.placeholderBold} // Add the required attribute
        />
        <Input
          name="schoolEmail"
          placeholder="School Email"
          value={postData.schoolEmail}
          onChange={(e) => setPostData({ ...postData, schoolEmail: e.target.value })}
          style={{ marginBottom: '16px' }}
          required 
          className={classes.placeholderBold}// Add the required attribute
        />
        <div className={classes.fileInput}>
        <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
          </div>
        <Upload
          accept=".jpg,.jpeg,.png"
          maxCount={1}
          listType="picture"
          fileList={postData.selectedFile ? [{ uid: '1', url: postData.selectedFile }] : []}
          beforeUpload={() => false}
          onRemove={() => setPostData({ ...postData, selectedFile: '' })}
          style={{ marginBottom: '16px' }}
        >
          
        </Upload>
        <Button type="primary" size="large" htmlType="submit" block>
          Submit
        </Button>
        <Button type="danger" size="small" onClick={clear} block>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;


