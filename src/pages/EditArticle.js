import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useUpdatePostMutation } from "../services/appApi";
import "./NewArticle.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import draftToHtml from "draftjs-to-html";
function EditArticle() {
  const { id } = useParams();
  const posts = useSelector((state) => state.post);
  const postToEdit = posts.find((post) => post._id == id);
  const [updateArticle, { isLoading, isSuccess }] = useUpdatePostMutation();
  const [title, setTitle] = useState(postToEdit.title);
  const [url] = useState(postToEdit.image);
  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(postToEdit.content)
  );

  const editorDataState = EditorState.createWithContent(contentDataState);

  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(editorDataState);

  function handleUpdate(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const content = draftToHtml(rawContentState);
    if(!title || !content){
      return alert("Title and content required");
    }
    else {
      updateArticle({id,title,content}).then((res)=> console.log(res));
    }
  }
  function handleEditorChange(state) {
    setEditorState(state);
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center py-4">Updating your article...</h1>
      </div>
    );
  }
  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return (
      <div>
        <h1 className="py-4 text-center">Article updated with success</h1>
      </div>
    );
  }
  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handleUpdate}>
            <h1 className="text-center">Edit Article</h1>
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
            <Form.Select className="mb-4">
              <option>Select Category</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="web-design">Web Design</option>
              <option value="programming">Programming</option>
              <option value="ai">Artificial Intelligence</option>
            </Form.Select>
            <Button variant="primary" type="submit">
              Update Article
            </Button>
          </Form>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={url}
            style={{ width: "100%", minHeight: "80vh", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditArticle;
