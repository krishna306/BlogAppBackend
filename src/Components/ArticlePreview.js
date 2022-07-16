import React from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import nature from "../images/nature-image-for-website.webp";
import { useDeletePostMutation } from "../services/appApi";
function ArticlePreview({ article, currentUserPost }) {
  const { title, content, image, _id } = article;
  const [deleteArticle,{isLoading}] = useDeletePostMutation();
  function handleDelete() {
    deleteArticle(_id);
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={image || nature}
        style={{ maxHeight: 200, objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <div
            dangerouslySetInnerHTML={{
              __html: content?.substring(0, 400) + "...",
            }}
          />
        </Card.Text>
        <ButtonGroup>
          <LinkContainer to={`/articles/${_id}`}>
            <Button variant="info">View...</Button>
          </LinkContainer>
          {currentUserPost && (
            <>
              <LinkContainer to={`/articles/${_id}/edit`}>
                <Button variant="outline-primary">Edit</Button>
              </LinkContainer>

              <Button variant="outline-danger" onClick={handleDelete}>
                {isLoading ?"Deleting...":"Delete"}
              </Button>
            </>
          )}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default ArticlePreview;
