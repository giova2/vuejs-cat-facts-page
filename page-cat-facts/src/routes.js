import Facts from "./components/Facts.vue";
import Fact from "./components/Fact.vue";
import * as env from "./environment.js";

export default [
  {
    path: `${
      process.env.NODE_ENV === "production" ? "/vuejs-cat-facts-page/" : "/"
    }`,
    name: "facts",
    component: Facts
  },
  {
    path: `${
      process.env.NODE_ENV === "production"
        ? "/vuejs-cat-facts-page/fact/:id"
        : "/fact/:id"
    }`,
    name: "fact",
    component: Fact
  },
  {
    // will match everything
    path: "*",
    component: Facts
  }
];
