'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import { getBookById } from "@/lib/api/clientApi";
import Image from "next/image";
import css from './BookPreviewClient.module.css'
import Link from "next/link";

const BookPreviewClient = ({ id }: { id: string }) => {
    const router = useRouter();
    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['book', id],
        queryFn: () => getBookById(id),
        refetchOnMount: false,
    });

    return (
        <Modal variant='previewBook' onClose={() => router.back()}>
            {isLoading && <Loader />}
            {isError && <p>Something went wrong</p>}
            {book && (
                <div className={css.card}>
                    {book.imageUrl && (
                        <Image
                            className={css.img}
                            src={book.imageUrl}
                            width={140}
                            height={213}
                            alt={book.title}
                            priority
                        />
                    )}

                    <div className={css.textWrap}>
                        <h1 className={css.title}>{book.title.charAt(0).toUpperCase() + book.title.slice(1, 33).toLowerCase()}</h1>
                        <p className={css.name}>{book.author}</p>
                        <span className={css.span}>{book.totalPages} page</span>
                    </div>

                    <Link className={css.link} href={`/reading?bookId=${book._id}`}>Start reading</Link>
                    
                </div>
            )}
        </Modal>
    );
};

export default BookPreviewClient;
