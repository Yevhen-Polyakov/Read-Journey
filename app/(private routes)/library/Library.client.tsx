'use client'

import Dashboard from "@/components/Dashboard/Dashboard"
import FiltersMyLibrary from "@/components/AddBook/AddBook"
import { getBooks } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RecommendedBooks from "@/components/RecommendedBooks/RecommendedBooks";
import MyLibrary from "@/components/MyLibrary/MyLibrary";
import css from './libraryClient.module.css'

const LibraryClient = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [totalPages, setTotalPages]= useState(0)

    const [page, setPage] = useState(1)

      const { data, error, isLoading } = useQuery({
        queryKey: ['books', title, author, page, totalPages],
        queryFn: () => getBooks(title, author, page, 8, totalPages),
        
    });

    const handleFilter = (data:{queryBook: string, queryAuthor: string, totalPages?:number | null}) => {
        setTitle(data.queryBook);
        setAuthor(data.queryAuthor);
        setTotalPages(data.totalPages ?? 0);
        setPage(1)
    }

    const handleClear = (field: 'queryBook' | 'queryAuthor' | 'totalPages')=> {
       if( field === 'queryBook'){
        setTitle('')
       }

       if(field === 'queryAuthor') {
            setAuthor('')
       }

       if(field === 'totalPages') {
          setTotalPages(0)
       }

      setPage(1)
    }

    return (
        <div className={css.library}>
            <Dashboard>

                <FiltersMyLibrary onSubmit={handleFilter} onClear={handleClear} />
                {isLoading && <p>Loading books...</p>}
                {error && <p>Failed to load recommended books.</p>}
                {!isLoading && !error && (
                    <RecommendedBooks
                        results={data?.results ?? []}
                        page={page}/>
                )}
            </Dashboard>

            <MyLibrary/>
        </div>
    )
}

export default LibraryClient