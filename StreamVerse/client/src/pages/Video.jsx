import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
// import ReactLinkify from "react-linkify";
// import Card from "../components/Card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
  // margin: 0px 50px;
`;
const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  height: max-content;
  display: flex;
  gap: 6px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
  margin-left: auto;
`;

// const Button = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   cursor: pointer;
// `;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  border-radius: 25px;
  padding: 6px 12px;
  &:hover {
    color: orange;
    background-color: #303030;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  gap: 20px;
  // justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  margin-top: 10px;
  padding: 15px 15px;
  font-size: 14px;
  max-height: ${({ expanded }) => (expanded ? "none" : "60px")};
  overflow: hidden;
  white-space: pre-wrap;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.soft};
`;

// const ShowMore = styled.span`
//   color: ${({ theme }) => theme.text};
//   font-size: 13px;
//   font-weight: 550;
//   cursor: pointer;
//   margin-top: 5px;
// `;

// const Subscribe = styled.button`
//   background-color: #cc1a00;
//   font-weight: 500;
//   color: white;
//   border: none;
//   border-radius: 3px;
//   height: max-content;
//   padding: 10px 20px;
//   cursor: pointer;
// `;

const Subscribe = styled.button`
  width: 100px;
  height: max-content;
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 18px;
  &:hover {
    background-color: #cc0000;
  }
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  // const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [error, setError] = useState(null);
  // const [expanded, setExpanded] = useState(false);

  const path = useLocation().pathname.split("/")[2];
  // console.log(path);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        // setVideo(videoRes.data);
        // console.log(videoRes);
        // console.log(channelRes);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error("Error: fetching video and channel data", err);
        setError("in Video.jsx : Error fetching data" || err.message);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser?._id));
    } catch (err) {
      console.error("Error in Liking video:", err);
    }
  };
  const handleDislike = async () => {
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser?._id));
    } catch (err) {
      console.error("Error in Disliking video:", err);
    }
  };

  const handleSub = async () => {
    try {
      currentUser?.subscribedUsers?.includes(channel._id)
        ? await axios.put(`/users/unsubs/${channel._id}`)
        : await axios.put(`/users/subs/${channel._id}`);
      dispatch(subscription(channel._id));
    } catch (err) {
      console.error("Error in Subscribing/Unsubscribing:", err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentVideo || !channel) {
    return <div>Loading...</div>;
  }

  //TODO: DELETE VIDEO FUNCTIONALITY

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>

          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <DownloadOutlinedIcon /> Download
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Channel>
        <Description>
          {currentVideo.desc}
          ........................................................................
          <br />
          videoDescription videoDescription videoDescription videoDescription
          <br />
          videoDescription videoDescription videoDescription videoDescription
          <br />
          videoDescription videoDescription videoDescription videoDescription...
        </Description>
        {/* <ReactLinkify>
          <Description expanded={expanded}>{currentVideo.desc}</Description>
        </ReactLinkify>
        <ShowMore onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Show More"}
        </ShowMore> */}
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;
