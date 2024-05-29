import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  // gap: 0px;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  // apiURL : https://jsonplaceholder.typicode.com/users
  // apiURL : http://localhost:5000/api/videos/random

  // Method1 : using Promises
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/videos/${type}`)
  //     .then((res) => setVideos(res.data))
  //     .catch((error) => setError("Error : fetching videos/data" || error.message));
  // }, [type]);

  // Method2 : using async-await
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        setError("Error : fetching videos/data" || error.message);
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {error ? (
        <div> Home.jsx : {error}</div>
      ) : (
        videos.map((video) => <Card key={video._id} video={video} />)
      )}
      {/* <Card /> */}
    </Container>
  );
};

export default Home;
