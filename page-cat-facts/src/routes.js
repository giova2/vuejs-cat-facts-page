import Facts from "./components/Facts.vue";
import Fact from "./components/Fact.vue";

export default [
  {
    path: process.env.BASE_URL + "/",
    name: "facts",
    component: Facts
  },
  {
    path: `${process.env.BASE_URL}/fact/:id`,
    name: "fact",
    component: Fact
  },
  {
    // will match everything
    path: "*",
    component: Facts
  }
];
