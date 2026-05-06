import { getMathRandom } from "@/utils/helpers";
import subDays from "date-fns/subDays";
import format from "date-fns/format";

export const users = [
  {
    id: 1,
    name: "Alice Blue",
    firstname: "Alice",
    lastname: "Blue",
    email: "aliceblue@example.com",
    avatar: `/static/doc-images/lists/ali.jpg`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "success",
      icon: "check_circle",
    },
  },
  {
    id: 2,
    name: "Jack Johnson",
    firstname: "Jack",
    lastname: "Johnson",
    email: "jack@example.com",
    avatar: `/static/doc-images/lists/men1.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Network Engineer",
  },
  {
    id: 3,
    name: "Bruce Canta",
    firstname: "Bruce",
    lastname: "Canta",
    email: "bruce@example.com",
    avatar: `/static/doc-images/lists/jack.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "warning",
      icon: "access_time",
    },
    designation: "Network Engineer",
  },
  {
    id: 4,
    name: "Camelia Lopez",
    firstname: "Camelia",
    lastname: "Lopez",
    email: "camelia@example.com",
    avatar: `/static/doc-images/lists/julieta.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "grey",
      icon: "not_interested",
    },
    designation: "Network Engineer",
  },
  {
    id: 5,
    name: "Denis Richard",
    firstname: "Denis",
    lastname: "Richard",
    email: "denis@example.com",
    avatar: `/static/doc-images/lists/2.jpg`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "secondary",
      icon: "stars",
    },
    designation: "Network Engineer",
  },
  {
    id: 6,
    name: "Mia Willson",
    firstname: "Mia",
    lastname: "Willson",
    email: "mia@example.com",
    avatar: `/static/doc-images/lists/lily.png`,
    mood: "Vuse - Powerful VuejS admin template.",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Network Engineer",
  },
  {
    id: 7,
    name: "Florence J. Brown",
    firstname: "Florence",
    lastname: "Brown",
    email: "florence@example.com",
    avatar: `/static/doc-images/lists/g1.jpg`,
    mood: "Good content isn't about good storytelling",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Sales Manager",
  },
  {
    id: 8,
    name: "Regina E. Hernandez",
    firstname: "Regina",
    lastname: "Hernandez",
    email: "regina@example.com",
    avatar: `/static/doc-images/lists/g2.jpg`,
    mood: "Design is intelligence made visible",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Designer Lead",
  },
  {
    id: 9,
    name: "Mary Beveridge",
    firstname: "Mary",
    lastname: "Beveridge",
    email: "mary@example.com",
    avatar: `/static/doc-images/lists/g3.jpg`,
    mood:
      "In most cases, being a good boss means hiring talented people and then getting out of their way",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "HR Manager",
  },
  {
    id: 10,
    name: "Gulnaz Vorobyova",
    firstname: "Gulnaz",
    lastname: "Vorobyova",
    email: "gulnaz@example.com",
    avatar: `/static/doc-images/lists/g4.jpg`,
    mood: "#wakeup#eat#code#chill",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Frontend Engineer",
  },
  {
    id: 11,
    name: "Aline Correia",
    firstname: "Aline",
    lastname: "Correia",
    email: "aline@example.com",
    avatar: `/static/doc-images/lists/g5.jpg`,
    mood: "#wakeup#eat#code#chill",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Project Mananager",
  },
  {
    id: 12,
    name: "Jane T. Keys",
    firstname: "Jane",
    lastname: "Keys",
    email: "jane@example.com",
    avatar: `/static/doc-images/lists/g6.jpg`,
    mood: "#wakeup#eat#code#chill",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Software Engineer",
  },
  {
    id: 13,
    name: "Timothy Macredie",
    firstname: "Timothy",
    lastname: "Macredie",
    email: "timothy@example.com",
    avatar: `/static/doc-images/lists/m1.jpg`,
    mood: "#wakeup#eat#code#chill",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Photographer",
  },
  {
    id: 14,
    name: "Beau Liversidge",
    firstname: "Beau",
    lastname: "Liversidge",
    email: "beau@example.com",
    avatar: `/static/doc-images/lists/m2.jpg`,
    mood: "#wakeup#eat#code#chill",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Designer",
  },
  {
    id: 15,
    name: "Davi Martins Dias",
    firstname: "Davi",
    lastname: "Dias",
    email: "davi@example.com",
    avatar: `/static/doc-images/lists/m3.jpg`,
    mood: "#wakeup#eat#code#chill",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Marketing Lead",
  },
  {
    id: 16,
    name: "John Mowbray",
    firstname: "John",
    lastname: "Mowbray",
    email: "john@example.com",
    avatar: `/static/doc-images/lists/m4.jpg`,
    mood: "#wakeup#eat#code#chill",
    status: {
      color: "success",
      icon: "check_circle",
    },
    designation: "Technical Lead",
  },
];

export const authUser = users[0];

export const conversation = [
  {
    id: 1,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "We are planning to move with GrapQL API with Board section. What do you think on it",
    created_at: 1528104070,
    read: true,
  },
  {
    id: 2,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "I mean for scrum board. A part from this, I have design some layouts in Sketch for it. Did you get chance to see those?",
    created_at: 1528104071,
    read: true,
  },
  {
    id: 3,
    group_id: 1,
    user_id: 1,
    user: authUser,
    message: `Yeah, that's really sounds good. I loved it. Can you please connet with Mia for further implementation?`,
    created_at: 1528104072,
    read: true,
  },
  {
    id: 4,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "I am scheduling a meeting with Team today at 5:00PM. Hope you are available.",
    created_at: 1528104073,
    read: true,
  },
  {
    id: 5,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "I also need your assistance for GraphQL API structuring. Are you gonna make APIs in Laravel for it?",
    created_at: 1528104074,
    read: true,
  },
  {
    id: 6,
    group_id: 2,
    user_id: 3,
    user: users[2],
    message: `I have started reviewing <b>MaterialCSS</b> framework. It seems that they have improved the Framework.`,
    created_at: 1528104074,
    read: true,
  },
  {
    id: 7,
    group_id: 2,
    user_id: 3,
    user: users[2],
    message:
      "How do you plan for Forge Admin new version, we need to talk about his.",
    created_at: 1528104075,
    read: true,
  },
  {
    id: 8,
    group_id: 2,
    user_id: 3,
    user: authUser,
    message:
      "Sure, we can arrage a meeting tomorrow in the morning. I have planned a few things. I will share you details tomorrow. Will it be fine?",
    created_at: 1528104076,
    read: true,
  },
  {
    id: 9,
    group_id: 3,
    user_id: 3,
    user: users[3],
    message: `We are planning some activities in this weekends. So you can provide your inputs.`,
    created_at: 1528104075,
    read: true,
  },
  {
    id: 10,
    group_id: 3,
    user_id: 3,
    user: users[3],
    message: `let's play Table-Tennis in the evening, after that we can discuss about the weekends suggestions. What do you say?`,
    created_at: 1528104076,
    read: true,
  },
  {
    id: 11,
    group_id: 4,
    user_id: 4,
    user: users[4],
    message: `we have received a mail from Envato regarding new Taxation policy. Once you get chance to have look into that.`,
    created_at: 1528104076,
    read: true,
  },
  {
    id: 12,
    group_id: 5,
    user_id: 5,
    user: users[5],
    message: `Forge Admin needs some improvements in designs. We have very nice features, but old design is factor of less sales.`,
    created_at: 1528104076,
    read: true,
  },
  {
    id: 13,
    group_id: 5,
    user_id: 5,
    user: users[5],
    message: `We need to think about this.`,
    created_at: 1528104077,
    read: true,
  },
  {
    id: 14,
    group_id: 5,
    user_id: 5,
    user: users[5],
    message: `As I know - Bruce is reviewing the details for MaterialCSS. Let me know once you planned a meeting.`,
    created_at: 1528104078,
    read: true,
  },
  {
    id: 15,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "We are planning to move with GrapQL API with Board section. What do you think on it",
    created_at: 1528104070,
    read: true,
  },
  {
    id: 16,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "We are planning to move with GrapQL API with Board section. What do you think on it",
    created_at: 1528104070,
    read: true,
  },
  {
    id: 17,
    group_id: 1,
    user_id: 2,
    user: users[1],
    message:
      "We are planning to move with GrapQL API with Board section. What do you think on it",
    created_at: 1528104070,
    read: true,
  },
];

export const groups = [
  {
    id: 1,
    user: {
      ...users[1],
      last_message: "Jan 20 , 2018",
    },
    unread: 2,
  },
  {
    id: 2,
    user: {
      ...users[2],
      last_message: "Jan 20 , 2018",
    },
    unread: 0,
  },
  {
    id: 3,
    user: {
      ...users[3],
      last_message: "Jan 20 , 2018",
    },
    unread: 2,
  },
  {
    id: 4,
    user: {
      ...users[4],
      last_message: "Jan 20 , 2018",
    },
    unread: 0,
  },
  {
    id: 5,
    user: {
      ...users[5],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 6,
    user: {
      ...users[7],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 7,
    user: {
      ...users[8],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 8,
    user: {
      ...users[9],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 9,
    user: {
      ...users[10],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 10,
    user: {
      ...users[11],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 11,
    user: {
      ...users[12],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 12,
    user: {
      ...users[13],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 13,
    user: {
      ...users[14],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
  {
    id: 14,
    user: {
      ...users[15],
      last_message: "Jan 20 , 2018",
    },
    unread: 3,
  },
];

export const contacts = users.map((user) => {
  return {
    ...user,
    nickname: null,
    phone: getMathRandom(9),
    company: null,
    birthdate: null,
    address: null,
    notes: null,
    is_favourite: Math.random() >= 0.5,
    is_frequent: Math.random() >= 0.5,
    selected: false,
  };
});
export const defaultUserPic = "/static/default/user.svg";

export const posts = [
  {
    id: 1,
    user: users[7],
    publishedON: format(subDays(new Date(), 10), "MMM dd, yyyy HH:mm"),
    favorite: true,
    img: {
      src: "https://picsum.photos/500/300?image=501",
      lazy: "https://picsum.photos/10/6?image=501",
    },
    counts: {
      likes: 477,
      comments: 84,
    },
    content:
      "19 things you don't want to hear about sports fan clubs. What experts are saying about match predictions. Why live tennis scores beat peanut butter on pancakes. If you read one article about sport crickets read this one. 18 problems with betting offers. The complete beginner's guide to sporting indexes. Why mom was right about sport crickets. 18 ways baseball cards can find you the love of your life. Why the world would end without sports bras. The complete beginner's guide to olympic national parks.",
    comments: [
      {
        id: 1,
        user: users[8],
        content:
          "Why olympic national parks are on crack about olympic national parks. The 20 worst songs about betting offers. Why your watch live sport never works out the way you plan.",
        createdAt: format(subDays(new Date(), 7), "MMM dd, yyyy HH:mm"),
      },
      {
        id: 2,
        user: users[9],
        content:
          "11 facts about sports fan stores that will impress your friends. 6 insane (but true) things about football schedules. How football schedules can help you predict the future. ",
        createdAt: format(subDays(new Date(), 8), "MMM dd, yyyy HH:mm"),
      },
    ],
  },
  {
    id: 2,
    user: users[8],
    publishedON: format(subDays(new Date(), 10), "MMM dd, yyyy HH:mm"),
    favorite: true,
    img: {
      src: "https://picsum.photos/500/300?image=1011",
      lazy: "https://picsum.photos/10/6?image=1011",
    },
    counts: {
      likes: 119,
      comments: 44,
    },
    content:
      "19 things you don't want to hear about sports fan clubs. What experts are saying about match predictions. Why live tennis scores beat peanut butter on pancakes. If you read one article about sport crickets read this one. 18 problems with betting offers. The complete beginner's guide to sporting indexes. Why mom was right about sport crickets. 18 ways baseball cards can find you the love of your life. Why the world would end without sports bras. The complete beginner's guide to olympic national parks.",
    comments: [
      {
        id: 1,
        user: users[8],
        content:
          "Why olympic national parks are on crack about olympic national parks. The 20 worst songs about betting offers. Why your watch live sport never works out the way you plan.",
        createdAt: format(subDays(new Date(), 7), "MMM dd, yyyy HH:mm"),
      },
      {
        id: 2,
        user: users[9],
        content:
          "11 facts about sports fan stores that will impress your friends. 6 insane (but true) things about football schedules. How football schedules can help you predict the future. ",
        createdAt: format(subDays(new Date(), 8), "MMM dd, yyyy HH:mm"),
      },
    ],
  },
  {
    id: 3,
    user: users[9],
    publishedON: format(subDays(new Date(), 10), "MMM dd, yyyy HH:mm"),
    favorite: true,
    counts: {
      likes: 89,
      comments: 56,
    },
    content:
      "19 things you don't want to hear about sports fan clubs. What experts are saying about match predictions. Why live tennis scores beat peanut butter on pancakes. If you read one article about sport crickets read this one. 18 problems with betting offers. The complete beginner's guide to sporting indexes. Why mom was right about sport crickets. 18 ways baseball cards can find you the love of your life. Why the world would end without sports bras. The complete beginner's guide to olympic national parks.",
    comments: [
      {
        id: 1,
        user: users[8],
        content:
          "Why olympic national parks are on crack about olympic national parks. The 20 worst songs about betting offers. Why your watch live sport never works out the way you plan.",
        createdAt: format(subDays(new Date(), 7), "MMM dd, yyyy HH:mm"),
      },
    ],
  },
];

export const pages = [
  {
    title: "Envato",
    subtitle:
      "Join millions and bring your ideas and projects to life with Envato",
    media: "/static/pages/envato.png",
    leftMedia: true,
    mediaSize: 100,
  },
  {
    title: "Netflix",
    subtitle: "Watch Netflix movies & TV shows online",
    media: "/static/pages/netflix.jpg",
    leftMedia: true,
    mediaSize: 100,
  },
  {
    title: "Scotch.IO",
    media: "/static/pages/scotch-io.png",
    subtitle: "fun and practical web development tutorials",
    leftMedia: true,
    mediaSize: 100,
  },
];

export const testimonials = [
  {
    title: users[11].name,
    media: users[11].avatar,
    subtitle:
      "Tempor irure reprehenderit voluptate et exercitation deserunt id veniam occaecat non aute consectetur consectetur aliquip. Consectetur fugiat Lorem adipisicing adipisicing excepteur. Nulla cupidatat amet amet minim ea voluptate sint exercitation nostrud. Fugiat esse irure tempor proident sit est. Ad duis minim proident do ipsum non ea minim consequat magna. Enim amet in excepteur aliquip consequat adipisicing. Deserunt irure consectetur nulla duis non culpa id deserunt non nulla esse.",
    mediaSize: 120,
    leftMedia: true,
  },
  {
    title: users[8].name,
    media: users[8].avatar,
    subtitle:
      "Tempor irure reprehenderit voluptate et exercitation deserunt id veniam occaecat non aute consectetur consectetur aliquip. Consectetur fugiat Lorem adipisicing adipisicing excepteur. Nulla cupidatat amet amet minim ea voluptate sint exercitation nostrud. Fugiat esse irure tempor proident sit est. Ad duis minim proident do ipsum non ea minim consequat magna. Enim amet in excepteur aliquip consequat adipisicing. Deserunt irure consectetur nulla duis non culpa id deserunt non nulla esse.",
    mediaSize: 120,
    leftMedia: false,
  },
  {
    title: users[12].name,
    media: users[12].avatar,
    subtitle:
      "Tempor irure reprehenderit voluptate et exercitation deserunt id veniam occaecat non aute consectetur consectetur aliquip. Consectetur fugiat Lorem adipisicing adipisicing excepteur. Nulla cupidatat amet amet minim ea voluptate sint exercitation nostrud. Fugiat esse irure tempor proident sit est. Ad duis minim proident do ipsum non ea minim consequat magna. Enim amet in excepteur aliquip consequat adipisicing. Deserunt irure consectetur nulla duis non culpa id deserunt non nulla esse.",
    mediaSize: 120,
    leftMedia: true,
  },
];
