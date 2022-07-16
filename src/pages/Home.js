import React from "react";
import MainArticle from "../Components/MainArticle";
import ArticlePreview from "../Components/ArticlePreview";
import { Container, Spinner, Row, Col, ListGroup } from "react-bootstrap";
import { useGetAllPostQuery } from "../services/appApi";
import { LinkContainer } from "react-router-bootstrap";
function Home() {
  const { data: articles, isLoading, isError } = useGetAllPostQuery();
  const sidebarArticles = articles?.slice(0, 4) || [];
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
  return (
    <Container>
      <div>
        <h1 className="banner__title">The MERN Tech Blog</h1>
      </div>
      <Row>
        <MainArticle article={articles[articles.length - 1]} />
        <Col md={9} className="blog-main d-flex pb-4 flex-wrap gap-4">
          {articles.map((article, idx) => (
            <ArticlePreview article={article} currentUserPost={false} key={idx} />
          ))}
        </Col>
        <Col md={3} className="blog-sidebar py-4">
          <ListGroup variant="flush">
            <h2>Latest Articles</h2>
            {sidebarArticles.map((article, idx) => (
              <LinkContainer to={`/articles/${article._id}`} key={idx}>
                <ListGroup.Item>{article.title}</ListGroup.Item>
              </LinkContainer>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
