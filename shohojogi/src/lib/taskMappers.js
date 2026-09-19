// Helpers for turning API task documents into the shapes the UI components render.

export const timeAgo = (value) => {
  const posted = new Date(value)

  if (Number.isNaN(posted.getTime())) return 'recently'

  const minutes = Math.floor((Date.now() - posted.getTime()) / 60000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)

  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)

  return `${days} day${days === 1 ? '' : 's'} ago`
}

export const formatDate = (value) => {
  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
}

// Map an API task onto the shape JobList/JobCard already render.
export const toJob = (task) => ({
  id: task._id,
  title: task.taskName,
  type: task.location,
  postedAgo: timeAgo(task.createdAt),
  description: task.details,
  budget: task.budget,
  deadline: formatDate(task.deadline),
  tags: task.tags ?? [],
})

// Map an API task onto the shape the TaskView components render.
// Fields the backend has no column for yet (category, duration, applicants,
// poster stats) come back null/empty so nothing crashes on .map or .charAt.
export const toTaskView = (task) => ({
  id: task._id,
  title: task.taskName,
  description: task.details,
  location: task.location,
  budget: task.budget,
  postedDate: formatDate(task.createdAt),
  deadline: formatDate(task.deadline),
  status: task.status === 'approved' ? 'Open' : task.status,
  tags: task.tags ?? [],
  requirements: task.requirements ?? [],
  image: task.taskImage?.url ?? null,
  category: null,
  duration: null,
  applicants: null,
  applicantsList: [],
  poster: {
    name: task.postedBy?.name ?? 'Unknown',
    verified: false,
    memberSince: null,
    tasksPosted: null,
    rating: null,
  },
})
