import React, { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { EditTagModal, NoteCard } from "../components/components";
import { NoteListProps, Tag } from "../types/FormTypes";

const NoteList = ({
  availableTags,
  notes,
  deleteTag,
  updateTag,
}: NoteListProps) => {
  const [selectedTage, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [showEditTags, setShowEditTags] = useState(false);
  const filterdNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTage.length === 0 ||
          selectedTage.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTage, notes]);
  return (
    <>
      <Row className="aling-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary"> Create </Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setShowEditTags(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTage.map((tag) => {
                  return { label: tag.label, vlaue: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, vlaue: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.vlaue };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filterdNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagModal
        availableTags={availableTags}
        show={showEditTags}
        handleClose={() => setShowEditTags(false)}
        deleteTag={deleteTag}
        updateTag={updateTag}
      />
    </>
  );
};

export default NoteList;
