import React from "react";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../hooks/useNote";
import { NoteProps } from "../types/FormTypes";

const Note = ({ onDeleteNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack className="flex-wrap " gap={1} direction="horizontal">
              {note.tags.map((tag) => (
                <Badge className="text-truncates" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary"> Edit </Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDeleteNote(note.id);
                navigate("/");
              }}
            >
              Delete
            </Button>
            <Link to="..">
              <Button variant="outline-danger">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default Note;
