import "./PostForm.css";
import { Button, Form, Image } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import Map from "./Map/Map";

function PostForm() {
  //textarea auto height logic
  const textRef = useRef();
  const [textAreaInput, setTextAreaInput] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "150px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [textAreaInput]);

  const textareaOnChange = (e) => {
    setTextAreaInput(e.target.value);
  };

  const navigate = useNavigate();

  //send request
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    if (coord[0][0] === 0 && coord[0][1] === 0) {
      alert("coordinate is required");
      return;
    }

    const formData = new FormData(document.querySelector("#submitForm"));

    formData.append("picture", file);
    formData.append("latitude", Math.round(coord[0][0] * 100));
    formData.append("longitude", Math.round(coord[0][1] * 100));
    formData.append("linkedPost", postId ? postId : 0);

    axios
      .post("http://localhost:8080/member/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        alert("post success");
        navigate("/");
      })
      .catch((r) => {
        if (r.response.request.status === 401) {
          alert("Unauthorized user attempt");
          navigate("/");
        } else {
          alert("post fail");
        }
      });
  };

  //preview image logic and file selection logic

  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);

  let previewImage;
  if (image.length !== 0) {
    previewImage = (
      <Image
        className="my-2"
        src={image}
        name="imageFile"
        thumbnail={true}
        alt="preview image"
      />
    );
  }

  const imageChanged = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      const options = {
        maxSizeMB: 0.05,
        useWebWorker: true,
        fileType: "image/jpeg",
      };

      try {
        const compressImg = await imageCompression(e.target.files[0], options);
        setFile(compressImg);
      } catch (error) {
        alert("Upload image only");
      }
    }
  };

  //coordinate setter
  const [coord, setCoord] = useState([
    [0, 0],
    [0, 0],
  ]);

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
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Text(Optional)"
            maxLength={1000}
            name="content"
            value={textAreaInput}
            onChange={textareaOnChange}
            ref={textRef}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="file" onChange={imageChanged} required />
        </Form.Group>
        {previewImage}
        <div>
          <Button className="postformbtn" variant="secondary" type="submit">
            Post
          </Button>
        </div>
      </Form>

      <Map setCoord={setCoord} coord={coord} />
    </div>
  );
}

export default PostForm;
