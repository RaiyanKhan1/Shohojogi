// Mock task data — replace with a real API call once the backend is ready.
const task = {
  title: "Grocery shopping",
  category: "Grocery shopping",
  status: "Open",
  postedDate: "20 Aug 2026",
  deadline: "24 Aug 2026",
  budget: 550,
  duration: "Under 2 hrs",
  location: "Uttara, Dhaka",
  applicants: 4,
  tags: ["Cash on delivery", "ID check required", "Live location shared"],
  description:
    "Need someone to pick up groceries from Shwapno Uttara for the week. I'll share the exact list over chat once you accept. Please check expiry dates on dairy and pick firm, fresh vegetables. Payment on delivery.",
  requirements: [
    "Available this weekend",
    "Own bicycle or rickshaw fare covered separately",
    "Can share live location while shopping",
  ],
  poster: {
    name: "Rafiul Islam",
    verified: true,
    memberSince: "Jan 2025",
    tasksPosted: 12,
    rating: 4.8,
  },
  applicantsList: [
    { name: "Shakib", rating: 4.9, note: "Available now, usually responds in a few hours" },
    { name: "Nusrat", rating: 4.7, note: "Can start this evening" },
    { name: "Tanvir", rating: 4.6, note: "Free after 6 PM" },
  ],
};

export default task;