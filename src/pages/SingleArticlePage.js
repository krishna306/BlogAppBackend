import React from "react";
import { useGetOnePostQuery } from "../services/appApi";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
function SingleArticlePage() {
  const { id } = useParams();
  const { isLoading, data: article,isError } = useGetOnePostQuery(id);
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
      </div>
    );
  }

  return(
    <Container >
        <Row>
            <Col md = {8} style ={{margin:"0 auto"}}>
                <img src = {article.image} style ={{width:"100%",maxHeight:"400px",objectFit:"cover"}} />
                <h1>{article.title}</h1>
                <p>By {article.creator.email}</p>
                <div dangerouslySetInnerHTML={{__html:article.content}} ></div>
            </Col>
            <Col md = {4}>
            </Col>
        </Row>
    </Container>
  );
}

export default SingleArticlePage;
