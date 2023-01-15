import "./CommentForm.css";
import { Button, Form } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CommentForm({ postId }) {
  //textarea auto height logic
  const textRef = useRef();
  const [textAreaInput, setTextAreaInput] = useState("");

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
    const formData = new FormData(document.querySelector("#commentSubmitForm"));

    axios
      .post(`http://localhost:8080/member/post/${postId}/comment`, formData, {})
      .then((m) => {
        window.location.reload();
      })
      .catch((r) => {
        if (r.response.request.status === 401) {
          alert("Unauthorized user attempt");
          navigate("/");
        } else {
          alert("fail to save comment");
        }
      });
  };

  return (
    <div>
      <Form
        className="commentForm"
        onSubmit={handleSubmit}
        id="commentSubmitForm"
      >
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            placeholder="DO NOT POST ANY PERSONAL INFORMATION, EMAIL ADDRESSES, NAMES, PHONE NUMBERS"
            maxLength={1000}
            name="content"
            value={textAreaInput}
            onChange={textareaOnChange}
            ref={textRef}
            required
            disabled={!document.cookie.substring(12)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={!document.cookie.substring(12)}
          className="postformbtn"
          variant="secondary"
          type="submit"
        >
          save
        </Button>
      </Form>
    </div>
  );
}

export default CommentForm;
