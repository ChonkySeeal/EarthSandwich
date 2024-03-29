import "./CommentList.css";
import CommentForm from "./CommentForm/CommentForm";
import Comment from "./Comment/Comment";
import { useEffect, useState } from "react";
import axios from "axios";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}:8080/board/post/${postId}/comment`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, [postId]);

  return (
    <div className="mt-3 commentContainer">
      <CommentForm postId={postId} />
      <div className="mt-3">
        {Array.isArray(comments)
          ? comments.map((comment) => {
              return (
                <Comment key={comment.id} comment={comment} postId={postId} />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default CommentList;
