import "./EditPost.css";
import { Button, Form } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  //editing post logic
  const { postId } = useParams();
  const textRef = useRef();
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const valueChanged = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (postId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}:8080/board/post/${postId}`)
        .then((response) => {
          setInputs((values) => ({ ...values, title: response.data.title }));
          setInputs((values) => ({
            ...values,
            content: response.data.content,
          }));
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    } else {
      alert("invalid access");
      navigate("/");
    }
  }, [postId, navigate]);

  //textarea auto height logic

  useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "150px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [inputs.content]);

  //send put request
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    const formData = new FormData(document.querySelector("#submitForm"));

    axios
      .put(
        `${process.env.REACT_APP_API_URL}:8080/member/post/${postId}`,
        formData
      )
      .then(() => {
        alert("Edit success");
        navigate(`/board/post/${postId}`);
      })
      .catch((r) => {
        if (r.response.request.status === 401) {
          alert("Unauthorized user attempt");
          navigate("/");
        } else {
          console.log(r);
        }
      });
  };

  return (
    <div>
      <Form className="postform" onSubmit={handleSubmit} id="submitForm">
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Title"
            maxLength={100}
            name="title"
            required
            value={inputs.title}
            onChange={valueChanged}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Text(Optional)"
            maxLength={1000}
            name="content"
            value={inputs.content}
            onChange={valueChanged}
            ref={textRef}
          ></Form.Control>
        </Form.Group>
        <Button className="postformbtn" variant="secondary" type="submit">
          Edit
        </Button>
      </Form>
    </div>
  );
}

export default EditPost;
