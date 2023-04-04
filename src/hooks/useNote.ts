import { useOutletContext } from "react-router-dom";
import { Note } from "../types/FormTypes";

export function useNote(){
    return useOutletContext<Note>()
}