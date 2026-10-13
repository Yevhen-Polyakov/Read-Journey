import BookPreviewClient from "./BookPreview.client";

type Props = {
    params: Promise<{ id: string }>
}

const BookPreview = async ({ params }: Props) => {
    const { id } = await params;

    return <BookPreviewClient id={id} />
}

export default BookPreview
