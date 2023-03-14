import "./PostList.css";
import { Card, Button, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import showRelativeDate from "../../Module/RelativeDate";

function PostList() {
  const [postlists, setPostlists] = useState([]);
  const [totalPageNumber, setTotalPageNumber] = useState([]);
  let { pageNumber } = useParams();
  if (pageNumber == null) pageNumber = 0;
  pageNumber = Number(pageNumber);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}:8080/board/postlist/${pageNumber}`)
      .then((response) => {
        setPostlists(response.data.postLists);
        setTotalPageNumber(response.data.totalPageNumber);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, [pageNumber]);

  const navigate = useNavigate();

  //button logic
  const buttonClickHandler = (id) => {
    navigate(`/member/post/${id}`);
  };

  //post logic

  const postClickHandler = (id) => {
    navigate(`/board/post/${id}`);
  };

  return (
    <div className="postListContainer">
      <div className="d-md-flex flex-wrap mb-5">
        {Array.isArray(postlists) &&
          postlists.map((post) => {
            if (post.linkedPost) {
              return (
                <div
                  className="postContainer m-5"
                  key={`${post.id}${post.linkedPost.id}`}
                  onClick={() => postClickHandler(post.id)}
                >
                  <Card
                    className="postCard"
                    style={{ width: "18rem", margin: "auto" }}
                  >
                    <Card.Body>
                      <Card.Title className="cardTitle">
                        {post.title}
                      </Card.Title>
                      <Card.Title className="cardDate">
                        {showRelativeDate(post.date) +
                          " by " +
                          `u/${post.writer}`}
                      </Card.Title>
                    </Card.Body>
                    <Card.Img variant="top" src={post.picture} />
                  </Card>
                  <Card
                    key={post.linkedPost.id}
                    className="postCard"
                    style={{ width: "18rem", margin: "auto" }}
                  >
                    <Card.Img variant="bottom" src={post.linkedPost.picture} />
                    <Card.Body>
                      <Card.Title>{post.linkedPost.title}</Card.Title>
                      <Card.Title className="cardDate">
                        {showRelativeDate(post.linkedPost.date) +
                          " by " +
                          `u/${post.linkedPost.writer}`}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              );
            } else {
              const customBread = L.icon({
                iconUrl: require("../../res/images/whitebreadpng.png"),
                iconSize: [30, 30],
                iconAnchor: [15, 15],
              });

              const coordinate = [
                (post.latitude / 100) * -1,
                post.longitude / 100 <= 0
                  ? post.longitude / 100 + 180
                  : post.longitude / 100 - 180,
              ];

              return (
                <div className="postContainer m-5" key={post.id}>
                  <Card
                    className="postCard"
                    style={{ width: "18rem", margin: "auto" }}
                  >
                    <Card.Img
                      variant="top"
                      src={post.picture}
                      onClick={() => postClickHandler(post.id)}
                    />
                    <Card.Body>
                      <Card.Title className="cardTitle">
                        {post.title}
                      </Card.Title>
                      <Card.Title className="cardDate">
                        {showRelativeDate(post.date)}
                      </Card.Title>
                      <Button
                        className="postListbtn"
                        variant="primary"
                        onClick={() => {
                          buttonClickHandler(post.id);
                        }}
                      >{`Make EarthSandWich With u/${post.writer}`}</Button>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: "18rem", margin: "auto" }}>
                    <Card.Body>
                      <Card.Title>Preferred Coordinate & Cities</Card.Title>
                    </Card.Body>

                    <MapContainer
                      className=" leaflet-container-postlist card-img-top"
                      center={coordinate}
                      zoom={3}
                      scrollWheelZoom={false}
                      dragging={false}
                    >
                      <Marker icon={customBread} position={coordinate}></Marker>
                      <Marker
                        position={[
                          post.cities[0].latitude / 100,
                          post.cities[0].longitude / 100,
                        ]}
                      >
                        <Popup>
                          {`${post.cities[0].city}-${post.cities[0].country}`}
                        </Popup>
                      </Marker>
                      <Marker
                        position={[
                          post.cities[1].latitude / 100,
                          post.cities[1].longitude / 100,
                        ]}
                      >
                        <Popup>
                          {`${post.cities[1].city}-${post.cities[1].country}`}
                        </Popup>
                      </Marker>
                      <Marker
                        position={[
                          post.cities[2].latitude / 100,
                          post.cities[2].longitude / 100,
                        ]}
                      >
                        <Popup>
                          {`${post.cities[2].city}-${post.cities[2].country}`}
                        </Popup>
                      </Marker>
                      <Marker
                        position={[
                          post.cities[3].latitude / 100,
                          post.cities[3].longitude / 100,
                        ]}
                      >
                        <Popup>
                          {`${post.cities[3].city}-${post.cities[3].country}`}
                        </Popup>
                      </Marker>
                      <Marker
                        position={[
                          post.cities[4].latitude / 100,
                          post.cities[4].longitude / 100,
                        ]}
                      >
                        <Popup>
                          {`${post.cities[4].city}-${post.cities[4].country}`}
                        </Popup>
                      </Marker>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />
                    </MapContainer>
                  </Card>
                </div>
              );
            }
          })}
      </div>
      {Array.isArray(postlists) && (
        <Pagination className="justify-content-center">
          <Pagination.First
            onClick={() => {
              navigate(`/0`);
            }}
          />

          <Pagination.Ellipsis />

          {pageNumber - 2 >= 0 ? (
            <Pagination.Item
              onClick={() => {
                navigate(`/${pageNumber - 2}`);
              }}
            >
              {pageNumber - 2}
            </Pagination.Item>
          ) : null}
          {pageNumber - 1 >= 0 ? (
            <Pagination.Item
              onClick={() => {
                navigate(`/${pageNumber - 1}`);
              }}
            >
              {pageNumber - 1}
            </Pagination.Item>
          ) : null}
          <Pagination.Item active>{pageNumber}</Pagination.Item>
          <Pagination.Item
            onClick={() => {
              navigate(`/${pageNumber + 1}`);
            }}
            disabled={pageNumber + 1 > totalPageNumber}
          >
            {pageNumber + 1}
          </Pagination.Item>
          <Pagination.Item
            onClick={() => {
              navigate(`/${pageNumber + 2}`);
            }}
            disabled={pageNumber + 2 > totalPageNumber}
          >
            {pageNumber + 2}
          </Pagination.Item>

          <Pagination.Ellipsis />

          <Pagination.Last
            onClick={() => {
              navigate(`/${totalPageNumber}`);
            }}
          />
        </Pagination>
      )}
    </div>
  );
}

export default PostList;
