export type Project = {
  title: string;
  url?: string;
  width?: string;
  linkUrl?: string;
  technologyUsed?: string[];
};

export const projects: Project[] = [
  {
    // url: "/static/myprescryptive.png?auto=format&fit=crop&w=400",
    title: "myPrescryptive",
    width: "40%",
    linkUrl: "https://my.prescryptive.com",
  },
  {
    // url: "https://plus.unsplash.com/premium_photo-1683309556192-d024cd55a9ee?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Add To Trello Chrome Extension",
    width: "20%",
    linkUrl:
      "https://github.com/andywgarcia/create-trello-item-from-page-extension",
  },
  {
    // url: "/static/wisedoc.png",
    title: "Wisedoc",
    width: "40%",
    linkUrl: "https://wisedoc.net/",
  },

  {
    url: "/static/ifedmypet.png",
    title: "iFedMyPet",
    width: "38%",
    linkUrl: "https://ifedmypet.com/",
  },
  {
    url: "/static/marshmallow.jpg",
    title: "Marshmallow",
    width: "38%",
    linkUrl: "https://tinyurl.com/andywgarcia",
  },
  {
    // url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400",
    title: "Tap Wars",
    width: "24%",
    linkUrl: "https://github.com/andywgarcia/TapWars",
  },
  {
    // url: "https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400",
    title: "Disneyland Table Notifier",
    width: "40%",
  },
  {
    // url: "https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400",
    title: "Pokemon Go Plus",
    width: "20%",
    linkUrl: "https://github.com/andywgarcia/pgpemu",
  },
  {
    // url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
    title: "Underwater Drone",
    width: "40%",
  },
];

export default projects;
