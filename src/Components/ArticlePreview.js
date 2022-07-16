import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import nature from "../images/nature-image-for-website.webp"
function ArticlePreview({ article }) {
  const { title, content, image, _id } = article;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={image || nature }
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
        <LinkContainer to ={`/articles/${_id}`}>
          <Button variant="primary">View...</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default ArticlePreview;