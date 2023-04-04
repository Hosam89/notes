import { type } from "os";

export type Note = {
  id: string;
} & NoteData;


export type NoteProps ={
  onDeleteNote :(id:string )=> void
}


export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};


export type SimplifiedNote ={
  tags : Tag[],
  title : string,
  id : string
}

export type NoteListProps ={
  availableTags : Tag[],
  notes : SimplifiedNote[],
  deleteTag : (id : string) => void,
  updateTag : (id :string, label: string) => void
}


export type NoteLayoutPrps ={
  notes : Note[]
}

export type EditNoteProps = {
  onSubmit: (id: string ,data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};


export type EditTagProps ={
 availableTags: Tag[];
 show : boolean,
 handleClose : ()=> void,
   deleteTag : (id : string) => void,
  updateTag : (id :string, label: string) => void
}