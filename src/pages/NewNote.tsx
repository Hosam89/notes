import { NoteForm } from "../components/components";
import { NewNoteProps } from "../types/FormTypes";

const NewNote = ({ onSubmit }: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
};

export default NewNote;
