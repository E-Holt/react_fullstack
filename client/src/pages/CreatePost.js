import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

  const initialValues ={
    title: "",
    postText: "",
    username: ""
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must have a title"),
    postText: Yup.string().min(1).max(500).required(),
    username:Yup.string().min(3).max(15).required()
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate('/');
    });
  };

  let navigate = useNavigate();

  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span"/>
          <Field autoComplete= "off" id="inputCreatePost" name="title" placeholder="Title" />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span"/>
          <Field autoComplete= "off" id="inputCreatePost" name="postText" placeholder="Your post here" />
          <label>Username: </label>
          <ErrorMessage name="username" component="span"/>
          <Field autoComplete= "off" id="inputCreatePost" name="username" placeholder="Username" />
          <button type="submit">Create post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost