import React from "react";
import { useGetAllUserPostQuery } from "../services/appApi";
import { Spinner,Container,Row,Col } from "react-bootstrap";
import ArticlePreview from "../Components/ArticlePreview";
function MyArticle() {
  const { data: userArticles, isError, isLoading } = useGetAllUserPostQuery();
  if (isError) {
    return (
      <div>
        <h1 className="text-center py-4">An error has occured</h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
        <h1 className="text-center py-5">Loading...</h1>
      </div>
    );
  }
  if (userArticles.length === 0) {
    return (
      <div>
        <h1 className="text-center py-4">You don't have articles yet</h1>
      </div>
    );
  }
  return (
    <Container>
      <h1 className="text-center ">My Articles</h1>
      <Row>
        <Col md = {9} className="d-flex justify-content-center flex-wrap gap-4">
          {userArticles.map((article,idx)=>(
            <ArticlePreview article={article} currentUserPost ={true} key={idx} />
          ))}
        </Col>
        <Col md = {3}>
        </Col>
      </Row>
    </Container>
  );
}

export default MyArticle;
