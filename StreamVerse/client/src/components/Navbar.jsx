import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsSharp";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  @media (max-width: 768px) {
    padding: 0px 0px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

const Center = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  position: absolute;
  left: 38%;
  transform: translateX(-50%);
  @media (max-width: 1200px) {
    position: static;
    transform: none;
    flex: 1;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const Search = styled.div`
  width: 100%;
  margin-right: 20px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.textSoft};
  border-radius: 25px;
  color: ${({ theme }) => theme.text};
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
  margin-right: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.soft};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Mic = styled.div`
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  margin-left: -10px;
  padding: 3px 3px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Notify = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Video = styled.div`
  display: flex;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid orange;
  color: orange;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    // color: ${({ theme }) => theme.text};
    // border: 1px solid ${({ theme }) => theme.text};
  }
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${q}`);
    }
  };

  const handleLogout = async (e) => {
    dispatch(logout(currentUser));
    navigate("/signin");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left></Left>
          <Center>
            <Search>
              <Input
                placeholder="Search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SearchOutlinedIcon
                onClick={() => navigate(`/search?q=${q}`)}
                cursor="pointer"
              />
            </Search>
            <Mic>
              <MicOutlinedIcon />
            </Mic>
          </Center>
          <Right>
            {currentUser ? (
              <User>
                <Notify>
                  <NotificationsOutlinedIcon />
                </Notify>
                <Video>
                  <VideoCallOutlinedIcon
                    onClick={() => setOpen(true)}
                    // onMouseOver={() => setOpen(true)}
                  />
                </Video>
                <Avatar cursor="pointer" src={currentUser?.img}></Avatar>
                {currentUser?.name}
                <Button onClick={handleLogout}>Log out</Button>
              </User>
            ) : (
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            )}
          </Right>
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
