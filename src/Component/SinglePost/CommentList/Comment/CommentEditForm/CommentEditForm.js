import "./CommentEditForm.css";
import { Button, Form } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CommentEditForm({ postId, content, commentId }) {
  //textarea auto height logic
  const textRef = useRef();
  const [textAreaInput, setTextAreaInput] = useState(content);

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
    const formData = new FormData(document.querySelector("#commentEditForm"));

    axios
      .put(
        `${process.env.REACT_APP_API_URL}:8080/member/post/${postId}/${commentId}`,
        formData,
        {}
      )
      .then((m) => {
        window.location.reload();
      })
      .catch((r) => {
        if (r.response.request.status === 401) {
          alert("Unauthorized user attempt");
          navigate("/");
        } else {
          alert(r.response.data.message);
        }
      });
  };

  return (
    <div>
      <Form
        className="commentEditForm"
        onSubmit={handleSubmit}
        id="commentEditForm"
      >
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            maxLength={1000}
            name="content"
            value={textAreaInput}
            onChange={textareaOnChange}
            ref={textRef}
            required
          ></Form.Control>
        </Form.Group>

        <Button className="postformbtn mb-1" variant="secondary" type="submit">
          edit
        </Button>
      </Form>
    </div>
  );
}

export default CommentEditForm;
