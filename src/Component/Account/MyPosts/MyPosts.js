import "./MyPosts.css";
import { useEffect, useState } from "react";
import { Pagination, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function MyPosts({ writer }) {
  const navigate = useNavigate();
  const [postlists, setPostlists] = useState([]);
  const [totalPageNumber, setTotalPageNumber] = useState([]);
  let { pageNumber } = useParams();
  if (pageNumber == null) pageNumber = 0;
  pageNumber = Number(pageNumber);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/postlist/user/${writer}/${pageNumber}`)
      .then((response) => {
        setPostlists(response.data.postLists);
        setTotalPageNumber(response.data.totalPageNumber);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pageNumber, writer]);

  return (
    <div className="myPostsContainer p-2">
      <h2 className="m-3">{`u/${writer} posts`}</h2>
      <div className="r-flex">
        {postlists.length > 0 &&
          postlists.map((post) => {
            return (
              <div
                onClick={() => {
                  navigate(`/board/post/${post.id}`);
                }}
                className="searchContainer m-3 d-flex "
                key={post.id}
              >
                <Image thumbnail src={post.picture} />
                <div className="searchUserInfo mx-2">
                  <h3>{post.title}</h3>
                  <p>{`submitted ${moment(
                    post.date,
                    "YYYYMMDD"
                  ).fromNow()}`}</p>
                </div>
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

export default MyPosts;
