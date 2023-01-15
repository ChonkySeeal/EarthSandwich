import "./Comment.css";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import CommentEditForm from "./CommentEditForm/CommentEditForm";
import { Link } from "react-router-dom";

function Comment({ comment, postId }) {
  const [showForm, setshowForm] = useState(false);

  const deleteHandler = (commentId) => {
    if (window.confirm("delete comment?")) {
      axios.defaults.withCredentials = true;
      axios
        .delete(`http://localhost:8080/member/post/${postId}/${commentId}`)
        .then(() => {
          window.location.reload();
        })
        .catch((r) => {
          if (r.response.request.status === 401) {
            alert("Unauthorized user attempt");
          } else {
            console.log(r);
          }
        });
    }
  };

  let conditionalButton =
    document.cookie.substring(12) === comment.writer ? (
      <div className="commentEditButtonDiv d-flex">
        <p
          className="commentEditButton mx-2"
          onClick={() => {
            setshowForm(!showForm);
          }}
        >
          Edit
        </p>
        <p
          className="commentEditButton mx-2"
          onClick={() => {
            deleteHandler(comment.id);
          }}
        >
          Delete
        </p>
        <p className="commentDate">
          {moment(comment.date, "YYYYMMDD").fromNow()}
        </p>
      </div>
    ) : (
      <p className="commentDate">
        {moment(comment.date, "YYYYMMDD").fromNow()}
      </p>
    );

  return (
    <div className="commentDiv" key={comment.id}>
      <div className="d-flex justify-content-between">
        <p className="commentWriter">
          <Link to={`/user/${comment.writer}`}>{`u/${comment.writer}`}</Link>
        </p>
        {conditionalButton}
      </div>

      {showForm ? (
        <CommentEditForm
          postId={postId}
          content={comment.content}
          commentId={comment.id}
        />
      ) : (
        <p>{comment.content}</p>
      )}
    </div>
  );
}

export default Comment;
