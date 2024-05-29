import axios from "axios";
import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { async } from "@firebase/util";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  // margin-top: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid orange;
  border-radius: 10px;
  gap: 10px;
  padding: 20px 50px;
  // margin-top: -50px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-style: italic;
  // text-decoration: underline;
`;

// const SubTitle = styled.h4`
//   font-size: 20px;
//   font-weight: 300;
// `;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  padding: 10px 25px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 25px;
  border: none;
  padding: 8px 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  &:hover {
    color: orange;
    background-color: #303030;
  }
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Hr = styled.hr`
  width: 100%;
  padding: 0px 20px;
  margin: 5px 0px;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
      // console.log(res.data);
    } catch (err) {
      dispatch(loginFailure());
      console.error("Login failed", err.message);
      // res.status(200).json("User Not Found");
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    await signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            // console.log(res);
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
        if (error.response) {
          console.error("Google Sign-In failed", error.response.data);
        } else {
          console.error("Google Sign-In failed", error.message);
        }
      });
  };

  // const signInWithGoogle = async () => {
  //   dispatch(loginStart());
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const res = await axios.post("/auth/google", {
  //       name: result.user.displayName,
  //       email: result.user.email,
  //       img: result.user.photoURL,
  //     });
  //     dispatch(loginSuccess(res.data));
  //     navigate("/");
  //   } catch (error) {
  //     dispatch(loginFailure());
  //     if (error.response) {
  //   console.error("Google Sign-In failed", error.response.data);
  // } else {
  //   console.error("Google Sign-In failed", error.message);
  // }
  //   }
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.error("Signup failed", err.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title> Sign in </Title>
        {/* <SubTitle> to continue with StreamVerse </SubTitle> */}
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}> Sign in </Button>
        <Button onClick={signInWithGoogle}> Sign in with Google </Button>

        <Hr />
        <Title> Sign up </Title>
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}> Sign up </Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
