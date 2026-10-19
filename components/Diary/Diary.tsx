'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import type { BookProgress, LibraryBook } from '@/types/books'
import { deleteReading } from '@/lib/api/clientApi'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import css from './Diary.module.css'

type Props = {
    bookId: string;
    totalPages: number;
    progress: BookProgress[];
}

const formatDuration = (start: string, finish: string) => {
    const milliseconds = Date.parse(finish) - Date.parse(start)
    if (!Number.isFinite(milliseconds) || milliseconds <= 0) return '—'

    const minutes = Math.round(milliseconds / 60000)
    if (minutes < 1) return '< 1 min'

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return hours ? `${hours} h ${remainingMinutes} min` : `${remainingMinutes} min`
}

const Diary = ({ bookId, totalPages, progress }: Props) => {
    const queryClient = useQueryClient()
    const completedSessions = progress
        .map((session, index) => ({ session, index }))
        .filter(({ session }) => session.status !== 'active' && Boolean(session.finishReading))
        .reverse()

    const deleteMutation = useMutation({
        mutationFn: (readingId: string) => deleteReading(bookId, readingId),
        onSuccess: async (updatedBook) => {
            queryClient.setQueryData<LibraryBook>(['book', bookId], updatedBook)
            await queryClient.invalidateQueries({ queryKey: ['own'] })
            toast.success('Reading session deleted')
        },
        onError: (error) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.error ?? 'Failed to delete reading session'
                : 'Something went wrong'
            toast.error(message)
        },
    })

    return (
        <section className={css.diary}>
            <div className={css.headerText}>
                <h3 className={css.title}>Diary</h3>
                <div className={css.wrapIcon} aria-hidden="true">
                    <Icon variant='hourGlass'/>
                    <Icon  variant='pie-chart'/>
                </div>
            </div>

            {completedSessions.length === 0 ? (
                <p className={css.empty}>Completed reading sessions will appear here.</p>
            ) : (
                <ul className={css.list}>
                    {completedSessions.map(({ session, index }, sessionIndex) => {
                        const pagesRead = Math.max(session.finishPage - session.startPage, 0)
                        const percent = Math.min(100, pagesRead / Math.max(totalPages, 1) * 100)
                        const readingId = session._id ?? session.id ?? session.readingId

                        return (
                            <li className={css.item} key={readingId ?? `${session.startReading}-${index}`}>
                                <div className={css.dateProgress}>
                                    <span className={css.iconSquare} aria-hidden="true">
                                        <Icon variant='square'/>
                                    </span>
                                    <div className={css.infoProgress}>
                                        <time className={`${css.date} ${sessionIndex === 0 ? css.latestDate : ''}`} dateTime={session.finishReading}>
                                            {new Date(session.finishReading).toLocaleDateString('ru-RU', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </time>

                                        <div className={css.procentReading}>
                                            <span className={css.procent}>{percent.toFixed(1)}%</span>
                                            <span className={css.time}>{formatDuration(session.startReading, session.finishReading)}</span>
                                        </div>
                                        
                                    </div>

                                    <div className={css.pageTime}>
                                        <span className={css.page}>{pagesRead} pages</span>
                                        
                                        <div className={css.graphicWrap}>
                                            <div className={css.buttonWrap}>
                                                <Icon variant='graphic'/>
                                                <Button
                                                    type='button'
                                                    aria-label={`Delete reading session from ${session.finishReading}`}
                                                    disabled={!readingId || deleteMutation.isPending}
                                                    onClick={() => readingId && deleteMutation.mutate(readingId)}>
                                                        <Icon variant='trash'/>
                                                </Button>
                                            </div>
                                            
                                            <span className={css.pagesHour}>{session.speed} pages per hour</span>
                                        </div>
                                        
                                        
                                    </div>
                                    
                                </div>

                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

export default Diary