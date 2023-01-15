import "./MyComments.css";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function MyComments({ writer }) {
  const navigate = useNavigate();
  const [commentlist, setCommentlist] = useState([]);
  const [totalPageNumber, setTotalPageNumber] = useState([]);
  let { pageNumber } = useParams();
  if (pageNumber == null) pageNumber = 0;
  pageNumber = Number(pageNumber);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/board/commentlist/user/${writer}/${pageNumber}`
      )
      .then((response) => {
        setCommentlist(response.data.commentList);
        setTotalPageNumber(response.data.totalPageNumber);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pageNumber, writer]);

  return (
    <div className="myCommentsContainer p-2">
      <h2 className="m-3">{`u/${writer} comments`}</h2>
      <div className="r-flex">
        {commentlist.length > 0 &&
          commentlist.map((comment) => {
            return (
              <div
                className="d-flex justify-content-between myCommentDiv"
                key={comment.id}
                onClick={() => {
                  navigate(`/board/post/${comment.postId}`);
                }}
              >
                <p className="commentContent">{comment.content}</p>
                <p>{`submitted ${moment(
                  comment.date,
                  "YYYYMMDD"
                ).fromNow()}`}</p>
              </div>
            );
          })}
      </div>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => {
            navigate(`/user/account/posts/0`);
          }}
        />

        <Pagination.Ellipsis />

        {pageNumber - 2 >= 0 ? (
          <Pagination.Item
            onClick={() => {
              navigate(`/user/account/posts/${pageNumber - 2}`);
            }}
          >
            {pageNumber - 2}
          </Pagination.Item>
        ) : null}
        {pageNumber - 1 >= 0 ? (
          <Pagination.Item
            onClick={() => {
              navigate(`/user/account/posts/${pageNumber - 1}`);
            }}
          >
            {pageNumber - 1}
          </Pagination.Item>
        ) : null}
        <Pagination.Item active>{pageNumber}</Pagination.Item>
        <Pagination.Item
          onClick={() => {
            navigate(`/user/account/posts/${pageNumber + 1}`);
          }}
          disabled={pageNumber + 1 > totalPageNumber}
        >
          {pageNumber + 1}
        </Pagination.Item>
        <Pagination.Item
          onClick={() => {
            navigate(`/user/account/posts/${pageNumber + 2}`);
          }}
          disabled={pageNumber + 2 > totalPageNumber}
        >
          {pageNumber + 2}
        </Pagination.Item>

        <Pagination.Ellipsis />

        <Pagination.Last
          onClick={() => {
            navigate(`/user/account/posts/${totalPageNumber}`);
          }}
        />
      </Pagination>
    </div>
  );
}

export default MyComments;
