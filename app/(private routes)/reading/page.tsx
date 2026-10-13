import ReadingClient from "./Reading.client"

type Props = {
    searchParams: Promise<{ bookId?: string }>
}

const Reading = async ({ searchParams }: Props) => {
    const { bookId } = await searchParams

    return (
        <div>
            <ReadingClient bookId={bookId} />
        </div>
    )
}

export default Reading
