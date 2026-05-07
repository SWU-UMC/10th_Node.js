export const previewReviewResponseDTO = (data: any[] ) => {
    return {
    reviewData: data, 
    cursorId: data.length > 0 ? data[data.length - 1].id : null};
}