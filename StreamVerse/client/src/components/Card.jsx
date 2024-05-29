import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: ${({ theme }) => theme.textSoft};
  border-radius: 10px;
  flex: 1;
  overflow: hidden;
  transition: border-radius 0.5s ease, transform 0.5s ease;
  &:hover {
    border-radius: 0px;
    transform: scale(1.01);
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-top: -5px;
  display: ${(props) => props.type === "sm" && "none"};
  background-color: ${({ theme }) => theme.textSoft};
`;

const Texts = styled.div`
  margin-top: -6px;
  // color: ${({ theme }) => theme.text};
  // font-weight: 500;
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  // font-style: bold;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  // margin: -8px 0px;
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/users/find/${video.userId}`);
        // console.log(res.data);
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching channel : ", error.message);
        setError("Card.jsx : Error : fetching Channel" || error.message);
      }
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title || "Unknown Video Title"}</Title>
            <ChannelName>
              {" "}
              {channel.name}{" "}
            </ChannelName>
            <Info>
              {" "}
              {video.views} views • {format(video.createdAt)}{" "}
            </Info>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
