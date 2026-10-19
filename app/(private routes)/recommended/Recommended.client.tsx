'use client'

import BookWindow from '@/components/BooksWindow/BooksWindow';
import css from './Recommended.module.css'
import BookInfo from "@/components/BookInfo/BookInfo";
import Dashboard from "@/components/Dashboard/Dashboard";
import Filters from "@/components/Filters/Filters";
import Modal from "@/components/Modal/Modal";
import Recommended from "@/components/Recommended/Recommended"
import StartWorkout from '@/components/StartWorkout/StartWorkout';
import GoodJob from '@/components/GoodJob/GoodJob';
import { getBooks } from "@/lib/api/clientApi"
import { useBookModalStore } from "@/lib/store/bookModalStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";

const getLimit = () => {
    if (window.innerWidth >= 1280) {
        return 10;
    }

    if (window.innerWidth >= 768) {
        return 8;
    }

    return 2;
};

const RecommendedClient = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2)
    const [showGoodJob, setShowGoodJob] = useState(false)
    const selectedBook = useBookModalStore((state) => state.selectedBooks)
    const closeBook = useBookModalStore((state) => state.closeBook)

    const handleModalClose = () => {
        setShowGoodJob(false)
        closeBook()
    }

    useEffect(()=> {
        const updateLimit = () => {
            const newLimit = getLimit()

            setLimit(prevLimit => {
                if(prevLimit !== newLimit){
                    setPage(1)
                }
                return newLimit
            })
        }

        updateLimit()

        window.addEventListener("resize", updateLimit)

        return ()=> {
            window.removeEventListener("resize", updateLimit)
        }
    }, [])

    const { data, error, isLoading } = useQuery({
        queryKey: ['books', title, author, page, limit],
        queryFn: () => getBooks(title, author, page, limit),
        placeholderData: keepPreviousData,
    });

    const handleFilter = (data:{queryBook: string, queryAuthor: string}) => {
        setTitle(data.queryBook);
        setAuthor(data.queryAuthor);
        setPage(1);
    }

    const handleClear = (field: 'queryBook' | 'queryAuthor')=> {
       if( field === 'queryBook'){
        setTitle('')
       }

       if(field === 'queryAuthor') {
            setAuthor('')
       }

       setPage(1)
    }

    if (isLoading || error) {
        return null;
    }

    return data?.results?.length ? (
        <div className={css.wrap}>
            <Dashboard>
                <Filters onSubmit={handleFilter} onClear={handleClear}/>
                <StartWorkout/>
                <BookWindow/>
            </Dashboard>
            
            <Recommended 
                results={data.results}
                data={data}
                page={page}
                onPageChange={setPage}
                />

            {selectedBook && (
                <Modal variant={showGoodJob ? "goodJob" : "goodModal"} onClose={handleModalClose}>
                    {showGoodJob ? (
                        <GoodJob />
                    ) : (
                        <BookInfo data={selectedBook} onSuccess={() => setShowGoodJob(true)} />
                    )}
                </Modal>
            )}
        </div>
    ) : null;
};

export default RecommendedClient