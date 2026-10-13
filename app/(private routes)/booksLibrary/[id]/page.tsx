import BookPreviewClient from "../../@modal/(.)booksLibrary/[id]/BookPreview.client";

type Props = {
    params: Promise<{ id: string }>
}

const BookPage = async ({ params }: Props) => {
    const { id } = await params;

    return <BookPreviewClient id={id} />
}

export default BookPage
