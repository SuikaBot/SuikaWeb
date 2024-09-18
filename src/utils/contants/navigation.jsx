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
        icon: "fa-solid fa-user-group",
        path: "#",
        sub_menu: [
          {
            name: "Feedbacks",
            icon: "fa-solid fa-circle",
            path: "/sb/feedbacks",
          },
          {
            name: "Traktir Leaderboard",
            icon: "fa-solid fa-circle",
            path: "/sb/traktir-leaderboard",
          },
        ],
      },
    ],
  },
  {
    label: "Testing ajah (1)",
    items: [
      {
        name: "Testing (1.1)",
        icon: "fa-solid fa-user-group",
        path: "#",
        sub_menu: [
          {
            name: "SubNav Testing (1.1.1)",
            icon: "fa-solid fa-circle",
            path: "/sb/subnavtesting111",
          },
          {
            name: "SubNav Testing (1.1.2)",
            icon: "fa-solid fa-circle",
            path: "/sb/subnavtesting112",
          },
          {
            name: "SubNav Testing (1.1.3)",
            icon: "fa-solid fa-circle",
            path: "/sb/subnavtesting113",
          },
        ],
      },
      {
        name: "Testing (1.2)",
        icon: "fa-solid fa-user-group",
        path: "#",
        sub_menu: [
          {
            name: "SubNav Testing (1.2.1)",
            icon: "fa-solid fa-circle",
            path: "/sb/subnavtesting121",
          },
        ],
      },
    ],
  },
  {
    label: "Testing ajah (2)",
    items: [
      {
        name: "Testing (2)",
        icon: "fa-solid fa-user-group",
        path: "#",
        sub_menu: [
          {
            name: "SubNav Testing (1)",
            icon: "fa-solid fa-circle",
            path: "/sb/subnavtesting2.1",
          },
          {
            name: "SubNav Testing (2)",
            icon: "fa-solid fa-circle",
            path: "/sb/subnavtesting2.2",
          },
        ],
      },
    ],
  },
  {
    label: "Testing ajah (3)",
    items: [
      {
        name: "Testing (3.1)",
        icon: "fa-solid fa-user-group",
        path: "/sb/subnavtesting3.1",
      },
    ],
  },
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
    name: "Nomor Bot",
    link: "list-bot",
  },
];

export { dashboardNav, homeNav };
