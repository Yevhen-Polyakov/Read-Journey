'use client'

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import AddReading from "@/components/AddReading/AddReading"
import Dashboard from "@/components/Dashboard/Dashboard"
import Loader from "@/components/Loader/Loader"
import MyBook from "@/components/MyBook/MyBook"
import Statistics from "@/components/Statistics/Statistics"
import { getBookById } from "@/lib/api/clientApi"
import type { LibraryBook } from "@/types/books"
import Details from "@/components/Details/Details"
import Diary from "@/components/Diary/Diary"
import Progress from "@/components/Progress/Progress"
import Modal from "@/components/Modal/Modal"
import BookIsRead from "@/components/BookIsRead/BookIsRead"

type Props = {
    bookId?: string;
}

const ReadingContent = ({ bookId }: { bookId: string }) => {
    const queryClient = useQueryClient()
    const [isReadModalDismissed, setIsReadModalDismissed] = useState(false)

    const { data: book, isLoading } = useQuery({
        queryKey: ['book', bookId],
        queryFn: () => getBookById(bookId),
    })

    if (isLoading) return <Loader />
    if (!book) return null

    const activeSession = book.progress.find(item => item.status === 'active')
    const isReading = Boolean(activeSession)
    const isBookRead = book.status === 'done' || book.progress.some(
        item => item.status !== 'active' && item.finishPage >= book.totalPages
    )

    const handleStarted = async (updated: LibraryBook) => {
        queryClient.setQueryData(['book', bookId], updated)
        await queryClient.invalidateQueries({ queryKey: ['own'] })
    }

    return (
        <>
            <Dashboard>
                <AddReading bookId={bookId} totalPages={book.totalPages} isReading={isReading} minPage={activeSession?.startPage} onSubmit={handleStarted} />
                {book.progress.length === 0 ? (
                    <Details>
                        <Progress />
                    </Details>
                ) : isReading ? (
                    <Details>
                        <Statistics totalPages={book.totalPages} progress={book.progress} />
                    </Details>
                ) : (
                    <Details>
                        <Diary
                            bookId={bookId}
                            totalPages={book.totalPages}
                            progress={book.progress}
                        />
                    </Details>
                    )}
            </Dashboard>
            {isBookRead && !isReadModalDismissed && (
                <Modal variant="theBook" onClose={() => setIsReadModalDismissed(true)}>
                    <BookIsRead/>
                </Modal>
            )}

            <MyBook book={book} isReading={isReading} />
        </>
    )
}

const ReadingClient = ({ bookId }: Props) => {
    return (
        <div>
            {bookId
                ? <ReadingContent bookId={bookId} />
                : <Dashboard><p>Select a book in your library to start reading.</p></Dashboard>}
        </div>
    )
}

export default ReadingClient
