import React from "react";
import { useGetOnePostQuery } from "../services/appApi";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
function SingleArticlePage() {
  const { id } = useParams();
  const { isLoading, data: article, isError } = useGetOnePostQuery(id);
  if (isError) {
    return (
      <div>
        <h1 className="text-center py-4">An error has occured</h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" role="status" />
        <br />
        <h2 className="py-2">Loading...</h2>
      </div>
    );
  }

  return (
    <Container>
      <Row style={{width:"80%",marginLeft:"10%"}} className="">
        <Col  style={{ margin: "0 auto" }}>
          <img
            src={article.image}
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
          />
          <h1>{article.title}</h1>
          <p>By {article.creator.email}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </Col>
      </Row>
    </Container>
  );
}

export default SingleArticlePage;
