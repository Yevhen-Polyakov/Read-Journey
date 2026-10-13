import { Books } from "@/types/books"
import { create } from "zustand";

type BookModalStore ={
    selectedBooks: Books | null;
    openBooks: (books: Books)=> void
    closeBook: ()=> void;
}

export const useBookModalStore = create<BookModalStore>()((set) =>(
    {
        selectedBooks: null,

        openBooks: (book)=> {
            set({selectedBooks: book})
        },

        closeBook: ()=> {
            set({ selectedBooks: null})
        }

    }))