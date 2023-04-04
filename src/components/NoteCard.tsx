import React from "react";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SimplifiedNote } from "../types/FormTypes";
import styles from "./NoteList.module.css";

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              className="justify-content-center flex-wrap "
              gap={1}
              direction="horizontal"
            >
              {tags.map((tag) => (
                <Badge className="text-truncates" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
