import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useCreatePostMutation } from "../services/appApi";
import "./NewArticle.css";
import { useNavigate } from "react-router-dom";
import nature from "../images/313811274a28746379ebf4d4fcf7842b.jpg";
function NewArticle() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const [uploadingImage, setUplaodingImage] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function handleImageValidation(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      setImage(null);
      return alert("File is too big,please choose image 1MB or less");
    } else {
      setImage(file);
    }
  }
  async function uploadImage(e) {
    e.preventDefault();
    if (!image) {
      return;
    }
    setUrl("");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jmx0pqmy");
    setUplaodingImage(true);
    fetch("https://api.cloudinary.com/v1_1/df4105oag/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
        setUplaodingImage(false);
        setUrl(data.url);
      })
      .catch((error) => {
        setUplaodingImage(false);
        console.log(error);
      });
  }

  function handlePublish(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);
    if (!title || !image || !content) {
      return alert("Title, Content and Image are required");
    }
    createPost({ title, image: url, content });
  }
  function handleEditorChange(state) {
    setEditorState(state);
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center py-4">Creating your article...</h1>
      </div>
    );
  }
  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return (
      <div>
        <h1 className="py-4 text-center">Article created with success</h1>
      </div>
    );
  }
  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handlePublish}>
            <h1>New Article</h1>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Your title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper mb-4"
              editorClassName="editor"
              toolbarClassName="toolbar"
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
            <Form.Select>
              <option>Select Category</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="web-design">Web Design</option>
              <option value="programming">Programming</option>
              <option value="ai">Artificial Intelligence</option>
            </Form.Select>
            <div>
              {!url && (
                <p className="alert alert-info">
                  Please upload an Image before publishing your article
                </p>
              )}
            </div>
            <div className="my-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageValidation}
              />
              <Button onClick={uploadImage} disabled={uploadingImage || !image}>
                Upload
              </Button>
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={uploadingImage || !url}
            >
              Create Article
            </Button>
          </Form>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          {uploadingImage && (
            <div className="text-center">
              <Spinner animation="border" variant="primary" role="status" />
              <br />
              <p className="py-2">Uploading Image...</p>
            </div>
          )}
          <div>
            {!url && !uploadingImage && (
              <img
                src={nature}
                style={{ width: "100%", minHeight: "80vh", objectFit: "cover" }}
              />
            )}
          </div>
          {url && (
            <img
              src={url}
              style={{ width: "100%", minHeight: "80vh", objectFit: "cover" }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default NewArticle;
