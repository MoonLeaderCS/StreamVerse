import React from "react";
import styled from "styled-components";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import StreamVerse from "../images/logo1.png";
// import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
// import TheatersIcon from "@mui/icons-material/Theaters";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Container = styled.div`
  height: 100vh;
  flex: 1.3;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    position: relative;
    height: auto;
  }
`;

// const Wrapper = styled.div`
//   padding: 18px 19px;
// `;

const LogoWrapper = styled.div`
  position: fixed;
  width: inherit;
  background-color: ${({ theme }) => theme.bgLighter};
  z-index: 1000;
`;

const Wrapper = styled.div`
  padding: 18px 19px;
  margin-top: 40px;
  overflow-y: auto;
  height: calc(100vh - 80px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// const Logo = styled.div``;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  font-size: 21px;
  margin-top: 4px;
  margin-left: 22px;
  // color: orange;
`;

const Country = styled.sup`
  font-size: 11px;
  font-weight: bold;
  margin-top: -16px;
  margin-left: -2px;
  color: ${({ theme }) => theme.textSoft};
`;

const Img = styled.img`
  height: 35px;
  padding-bottom: 5px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 4px 20px;
  cursor: pointer;
  &:hover {
    color: orange;
    background-color: #303030;
    border-radius: 10px;
    margin-left: -14.5px;
    margin-right: -14.5px;
    padding-left: 35px;
    padding-right: 35px;
  }
  ${({ active }) =>
    active &&
    `
    color: orange;
    background-color: #505050;
    border-radius: 10px;
    margin-left: -14px;
    margin-right: -14px;
    padding-left: 15px;
    padding-right: 15px;
  `}
`;

// const Active = styled.div`
//   color: orange;
//   background-color: #505050;
//   border-radius: 10px;
//   margin-left: -14px;
//   margin-right: -14px;
//   padding-left: 15px;
//   padding-right: 15px;
// `;

const Hr = styled.div`
  margin: 10px -12px;
  border-bottom: 1.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 10px;
  margin-left: 15px;
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid orange;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: -35px;
  padding: 4px 16px;
  background-color: transparent;
  color: orange;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    // color: ${({ theme }) => theme.text};
    // border: 1px solid ${({ theme }) => theme.text};
  }
`;

const Copyright = styled.div`
  margin-top: 20px;
  font-size: 12px;
  line-height: 1.5;
  word-spacing: 2.5px;
  letter-spacing: 0.5px;
  color: #a5a5a5;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
  &:hover {
    color: #c8c8c8;
    color: ${({ theme }) => theme.text};
  }
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  // const [menuOpen, setMenuOpen] = useState(false);
  // const location = useLocation();

  return (
    <Container>
      <LogoWrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={StreamVerse} />
            StreamVerse
            <Country> IN </Country>
          </Logo>
        </Link>
      </LogoWrapper>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          {/* <Logo>
            <Img src={StreamVerse} />
            StreamVerse
            <Country> IN </Country>
          </Logo> */}
          {/* <Active> */}
          <Item>
            <HomeIcon /> Home{" "}
          </Item>
          {/* </Active> */}
          <Item>
            {" "}
            <VideoLibraryIcon /> Shorts{" "}
          </Item>
        </Link>

        <Link
          to="/subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsIcon /> Subscriptions{" "}
          </Item>
        </Link>

        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <TrendingUpIcon /> Trending{" "}
          </Item>
        </Link>

        <Hr />
        {!currentUser && (
          <>
            {" "}
            <Login>
              Login to like videos, comment, and subscribe.
              <Link
                to="signin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button>
                  <AccountCircleOutlinedIcon />
                  Login
                </Button>
              </Link>
            </Login>
            <Hr />{" "}
          </>
        )}
        <Title> Best of StreamVerse </Title>
        {/* <Link
          to="/video/test"
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <Item>
          <LiveTvIcon /> Live{" "}
        </Item>
        {/* </Link> */}
        <Item>
          <MusicNoteIcon /> Music{" "}
        </Item>
        <Item>
          <MovieIcon /> Movies{" "}
        </Item>
        <Item>
          <NewspaperIcon /> News{" "}
        </Item>
        <Item>
          <SportsEsportsIcon /> Gaming{" "}
        </Item>
        <Item>
          <EmojiEventsIcon /> Sports{" "}
        </Item>
        <Item>
          <LightbulbIcon /> Learning{" "}
        </Item>
        <Hr />
        <Item>
          <WatchLaterIcon /> Watch Later{" "}
        </Item>
        <Item>
          <HistoryIcon /> History{" "}
        </Item>
        <Hr />
        <Item>
          <SettingsIcon /> Settings{" "}
        </Item>
        <Item>
          <HelpIcon /> Help{" "}
        </Item>
        <Item>
          <FeedbackIcon /> Feedback{" "}
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Hr />

        <Copyright>
          About Press Contact us Creators Advertise Developers
          <br />
          <br />
          Terms Privacy Policy & Safety How StreamVerse works Test new features
          <br />
          <br />© 2024 StreamVerse LLC
        </Copyright>
      </Wrapper>
    </Container>
  );
};

export default Menu;
