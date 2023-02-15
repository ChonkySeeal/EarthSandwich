import "./SinglePost.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CommentList from "./CommentList/CommentList";
import showRelativeDate from "../../Module/RelativeDate";
import { useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

function SinglePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState("");

  const { postId } = useParams();

  //editing post logic
  const editPost = () => {
    navigate(`/board/edit/${post.id}`);
  };

  //deleting post logic
  const deletePost = () => {
    if (window.confirm("delete post?")) {
      axios.defaults.withCredentials = true;
      axios
        .delete(`${process.env.REACT_APP_API_URL}:8080/member/post/${postId}`)
        .then(() => {
          navigate("/");
        })
        .catch((r) => {
          if (r.response.request.status === 401) {
            alert("Unauthorized user attempt");
            navigate("/");
          } else {
            alert(r.response.data.message);
          }
        });
    }
  };

  //fetching single post
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}:8080/board/post/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [postId]);

  //edit and delete button
  let conditionalEditButton =
    document.cookie.substring(12) === post.writer && post.linkedPost == null ? (
      <div className="d-flex">
        <p onClick={editPost} className="editButton mx-3">
          Edit
        </p>
        <p onClick={deletePost} className="editButton">
          Delete
        </p>
      </div>
    ) : null;

  //post logic
  const postClickHandler = (id) => {
    navigate(`/member/post/${id}`);
  };

  const customBread = L.icon({
    iconUrl: require("../../res/images/whitebreadpng.png"),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <Container className="pb-4">
      {post.linkedPost ? (
        <div className="flex-row d-flex justify-content-between"></div>
      ) : null}
      <div className="titleDiv">
        <div className="d-flex justify-content-between">
          <h3>{post.title}</h3> {conditionalEditButton}
        </div>

        <div className="userInfoDiv  d-flex justify-content-between">
          <p>
            by <Link to={`/user/${post.writer}/0`}>{`u/${post.writer}`}</Link>{" "}
          </p>

          <p>{`submitted ${showRelativeDate(post.date)}`}</p>
        </div>
      </div>

      <div className="imgDiv">
        <img src={post.picture} alt="bread img" />
        {post.linkedPost ? (
          <MapContainer
            className="imgOverlay"
            center={[post.latitude / 100, post.longitude / 100]}
            zoom={3}
            scrollWheelZoom={false}
            dragging={false}
          >
            <Marker
              icon={customBread}
              position={[post.latitude / 100, post.longitude / 100]}
            ></Marker>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        ) : (
          <div
            className="imgOverlay"
            onClick={() => {
              postClickHandler(post.id);
            }}
          >
            <div className="imgOverlayText">{`Make EarthSandWich With u/${post.writer}`}</div>
          </div>
        )}
      </div>
      <div className="contentDiv">
        <p>{post.content}</p>
      </div>
      {post.linkedPost ? (
        <div>
          <div className="titleDiv">
            <div className="d-flex justify-content-between">
              <h3>{post.linkedPost.title}</h3>
            </div>

            <div className="userInfoDiv  d-flex justify-content-between">
              <p>
                by{" "}
                <Link
                  to={`/user/${post.linkedPost.writer}/0`}
                >{`u/${post.linkedPost.writer}`}</Link>{" "}
              </p>
              <p>{`submitted ${showRelativeDate(post.linkedPost.date)}`}</p>
            </div>
          </div>

          <div className="imgDiv">
            <img src={post.linkedPost.picture} alt="bread img" />
            <MapContainer
              className=" imgOverlay"
              center={[
                post.linkedPost.latitude / 100,
                post.linkedPost.longitude / 100,
              ]}
              zoom={3}
              scrollWheelZoom={false}
              dragging={false}
            >
              <Marker
                icon={customBread}
                position={[
                  post.linkedPost.latitude / 100,
                  post.linkedPost.longitude / 100,
                ]}
              ></Marker>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
          </div>
          <div className="contentDiv">
            <p>{post.linkedPost.content}</p>
          </div>
        </div>
      ) : null}
      <CommentList postId={postId} />
    </Container>
  );
}

export default SinglePost;
