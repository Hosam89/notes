import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { NoteLayoutPrps } from "../types/FormTypes";

const NoteLayout = ({ notes }: NoteLayoutPrps) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);
  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};

export default NoteLayout;
