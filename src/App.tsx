import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { EditNote, NewNote, Note, NoteList } from "./pages/pages";
import { NoteData, RawNote, Tag } from "./types/FormTypes";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { NoteLayout } from "./layout/layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNote) => {
      return [
        ...prevNote,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNote) => {
      return prevNote.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };
  const onDeleteNote = (id: string) => {
    setNotes((prevNote) => {
      return prevNote.filter((note) => note.id !== id);
    });
  };

  const updateTag = (id: string, label: string) => {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = (id: string) => {
    setTags((prevTag) => {
      return prevTag.filter((tag) => tag.id !== id);
    });
  };
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<h1>Hi</h1>} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
