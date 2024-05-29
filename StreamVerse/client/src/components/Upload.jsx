import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  // height: calc(100vh - 80px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 500px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  top: 100px;
  bottom: -100px;
  border: 1px solid orange;
  z-index: 2000;
  border-radius: 10px;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: orange;
  border: 1px solid orange;
  padding: 1px 5px;
  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Title = styled.h1`
  text-align: center;
  color: orange;
  position: relative;
  top: -30px;
  // text-decoration: underline;
  // border: 1px solid orange;
  // border-radius: 20px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  font-weight: 500;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  font-weight: 500;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  margin: auto;
  padding: 8px 100px;
  font-size: 16px;
  font-weight: 550;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};

  &:hover {
    background-color: green;
    color: orange;
    // border: 1px solid orange;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: orange;
  // text-decoration: underline;
`;

const Privacy = styled.div`
  font-size: 12px;
  position: relative;
  bottom: -15px;
  color: ${({ theme }) => theme.textSoft};
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [tags, setTags] = useState([]);
  const [inputs, setInputs] = useState({});
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  // useEffect to listen for clicks outside the wrapper
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setOpen]);

  return (
    <Container>
      <Wrapper ref={wrapperRef}>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>... Upload New Video ...</Title>
        <Label>Video File:</Label>
        {videoPerc > 0 ? (
          "Uploading: " + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title..."
          name="title"
          onChange={handleChange}
          f
        />
        <Desc
          placeholder="Description..."
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Type comma separated video tags..."
          onChance={handleTags}
        />
        <Label>Image/Thumbnail:</Label>
        {imgPerc > 0 ? (
          "Uploading: " + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
        <Privacy>
          By submitting your videos to StreamVerse, you acknowledge that you
          agree to StreamVerse's Terms of Service and Community Guidelines.
          Please be sure not to violate others' copyright or privacy rights.
          Learn more here.
        </Privacy>
      </Wrapper>
    </Container>
  );
};

export default Upload;
