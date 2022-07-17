import { Button } from "react-bootstrap";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function MainArticle({ article }) {
  const { title, image, content, _id } = article;
  return (
    <Row className="pb-4">
      <Col md={6} className="main-article__image-container">
        <img
          src={image}
          style={{ widtth: "100%", maxHeight: 300, objectFit: "cover" }}
        />
      </Col>
      <Col md={6}>
        <h2>{title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: content?.substring(0, 400) + "...",
          }}
        />
        <LinkContainer to={`/articles/${_id}`}>
          <Button variant="info">Read More</Button>
        </LinkContainer>
      </Col>
    </Row>
  );
}

export default MainArticle;
