import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Container = styled.div`
  margin-top: 10px;
`;

const TotalComments = styled.div`
  margin: 20px 0px;
  font-weight: 550;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.textSoft};
  // margin: 10px 0px;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: -2px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  padding-bottom: 5px;
  margin-left: 5px;
  font-size: 14px;
`;

const CommentButton = styled.div`
  display: flex;
  float: right;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  border-radius: 25px;
  margin-top: -2px;
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 550;
  &:hover {
    color: white;
    background-color: blue;
  }
`;

// const Hr = styled.hr`
//   margin: 15px 0px;
//   border: 0.5px solid ${({ theme }) => theme.soft};
// `;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      <TotalComments> 50,345 Comments </TotalComments>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment here..." />
      </NewComment>
      <CommentButton>Comment</CommentButton>
      {/* <Hr /> */}
      {comments.map((comment) => (
        <Comment key={comment?._id} comment={comment} />
      ))}
      {/* <Comment /> */}
    </Container>
  );
};

export default Comments;
