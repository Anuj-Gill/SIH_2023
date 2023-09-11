export function sortByCreatedAtDate(arr, orderBy) {
  switch (orderBy) {
    case "asc":
    default:
      return arr.sort((a, b) => (a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0));
    case "desc":
      return arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0));
  }
}

export function sortByDeadlineDate(arr, orderBy) {
  switch (orderBy) {
    case "asc":
    default:
      return arr.sort((a, b) => (a.deadline > b.deadline ? 1 : b.deadline > a.deadline ? -1 : 0));
    case "desc":
      return arr.sort((a, b) => (a.deadline < b.deadline ? 1 : b.deadline < a.deadline ? -1 : 0));
  }
}
