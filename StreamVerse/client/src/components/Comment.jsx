import React from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
// import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  font-size: 13px;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 550;
  margin-bottom: -5px;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Buttons = styled.div`
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 5px;
  margin: -10px -4px;
  border-radius: 50px;
  &:hover {
    color: orange;
    background-color: #303030;
  }
`;

const Comment = ({ comment }) => {
  // const { currentComment } = useSelector((state) => state.user);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date> {format(comment.createdAt)} </Date>
        </Name>
        <Text>{comment.comment}</Text>
        <Buttons>
          <Button title="Like">
            <ThumbUpOffAltIcon />
          </Button>
          65k
          <Button title="Dislike">
            <ThumbDownOffAltIcon />
          </Button>
          <Button title="Reply"> Reply </Button>
        </Buttons>
      </Details>
    </Container>
  );
};

export default Comment;
