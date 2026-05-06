import { users } from "@/data/dummyData";
const Projects = [
  {
    username: users[10].firstname,
    avatar: users[10].avatar,
    name: "Sketch File Template",
    deadline: "3 days later",
    progress: 85,
    color: "primary",
    members: [users[9], users[13], users[14]], // Max 3 users and show (+3) users
    membesCount: 3,
  },
  {
    username: users[5].firstname,
    avatar: users[5].avatar,
    name: "Layout Design",
    deadline: "1 weeks later",
    progress: 72,
    color: "secondary",
    members: [users[9], users[13], users[10]],
    membesCount: 4,
  },
  {
    username: users[14].firstname,
    avatar: users[14].avatar,
    name: "GraphQL API",
    deadline: "1 Month later",
    progress: 50,
    color: "info",
    members: [users[9], users[13]],
    membesCount: 2,
  },
  {
    username: users[13].firstname,
    avatar: users[13].avatar,
    name: "Lambda Testing",
    deadline: "2 Month later",
    progress: 30,
    color: "teal",
    members: [users[9], users[14], users[5]],
    membesCount: 10,
  },
  {
    username: users[9].firstname,
    avatar: users[9].avatar,
    name: "Project Deploy",
    deadline: "half year later",
    progress: 15,
    color: "error",
    members: [users[9]],
    membesCount: 1,
  },
];

const getProject = (limit) => {
  return limit ? Projects.slice(0, limit) : Projects;
};

export { Projects, getProject };
