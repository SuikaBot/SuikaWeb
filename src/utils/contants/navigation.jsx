const dashboardNav = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Dashboard",
        icon: "fa-solid fa-gauge-high",
        path: "/sb/dashboard",
      },
    ],
  },
  {
    label: "Users Management",
    items: [
      {
        name: "Manage Users",
        icon: "fa-solid fa-users",
        path: "/sb/manage-users",
      },
    ],
  },
  {
    label: "Web Management",
    items: [
      {
        name: "Bot Status",
        icon: "fa-brands fa-whatsapp",
        path: "/sb/bot-status",
      },
      {
        name: "Content",
        icon: "fa-solid fa-folder-tree",
        path: "#",
        sub_menu: [
          {
            name: "Feedbacks",
            icon: "fa-regular fa-comments",
            path: "/sb/feedbacks",
          },
          {
            name: "Traktir Leaderboard",
            icon: "fa-solid fa-piggy-bank",
            path: "/sb/traktir-leaderboard",
          },
        ],
      },
    ],
  },
  {
    label: "Bot's Management",
    items: [
      {
        name: "SuikaBot",
        icon: "fa-solid fa-user-group",
        path: "#",
        sub_menu: [
          {
            name: "Restart Bot",
            icon: "fa-solid fa-circle",
            path: "/sb/subnavtesting111",
          },
        ],
      },
    ],
  },
  // {
  //   label: "Testing ajah (3)",
  //   items: [
  //     {
  //       name: "Testing (3.1)",
  //       icon: "fa-solid fa-user-group",
  //       path: "/sb/subnavtesting3.1",
  //     },
  //   ],
  // },
];

const homeNav = [
  {
    name: "Utama",
    link: "home",
  },
  {
    name: "Tentang",
    link: "about",
  },
  {
    name: "Kata Mereka",
    link: "kata-mereka",
  },
  {
    name: "Leaderboard",
    link: "traktir-leaderboard",
  },
  {
    name: "Nomor Bot",
    link: "list-bot",
  },
];

export { dashboardNav, homeNav };
