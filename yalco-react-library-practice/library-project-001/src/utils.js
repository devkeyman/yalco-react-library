export const renderStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

export const getBookEmoji = (index) => {
  return ['📕','📗','📙','📘','📔'][Number(index) % 5]
}

export const genres = [
  'Fiction', 'Non-fiction', 'Fantasy',
'Dystopian', 'Philosophy', 'Romance', 'Programming'
]