<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Cat Facts</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <!-- envuelvo el contenido que quiero paginar con el objeto paginador (vue-paginate) -->
        <paginate ref="paginator" name="facts" :list="facts" :per="3">
          <!-- recorremos los valores y mostramos la información dato valor por valor -->
          <transition-group
            class="fade-container"
            name="fade"
            mode="in-out"
            tag="div"
          >
            <div v-if="facts.length === 0" class="loading" key="loading">
              <img :src="loading_img" />
            </div>
            <div
              v-if="facts.length !== 0"
              class="card mb-2 bg-light cat-fact"
              v-for="fact in paginated('facts')"
              v-bind:key="fact._id"
            >
              <router-link
                :to="{ name: 'fact', params: { id: fact._id, info: fact } }"
              >
                <div class="card-body">
                  <h5 class="card-title">{{ fact.type }}</h5>
                  <p class="card-text">{{ fact.text }}</p>
                  <!-- <span>Votes: {{ fact.upvotes }}</span> -->
                </div>
              </router-link>
            </div>
          </transition-group>
        </paginate>

        <paginate-links
          for="facts"
          :show-step-links="true"
          :simple="{
            prev: 'Prev',
            next: 'Next'
          }"
        ></paginate-links>
      </div>
    </div>
  </div>
</template>

<script>
import * as env from "../environment.js";
export default {
  data() {
    return {
      facts: [],
      paginate: ["facts"],
      loading_img: `${env[process.env.NODE_ENV].VUE_APP_BASE_URL}${
        env[process.env.NODE_ENV].VUE_APP_LOADING_IMG
      }`
    };
  },

  created() {
    this.getFacts();
  },

  methods: {
    //obtengo los datos de la API y se los asigno a una variable de Vuejs
    getFacts() {
      let vm = this;
      fetch("https://cat-fact.herokuapp.com/facts")
        .then(response => response.json())
        .then(data => (vm.facts = data ? data : []));
    }
  }
};
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
.loading img {
  width: 10vmin;
  animation: zoom 1s infinite alternate-reverse;
}
@keyframes zoom {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
.card.cat-fact {
  height: 25vmin;
  text-align: center;
}
.card a {
  height: 100%;
  transition: all 200ms ease-in;
}
.card a:hover {
  background: #64bf92;
  text-decoration: none;
}
.paginate-links {
  width: 100%;
  list-style: none;
  text-align: center;
  display: flex;
}
.paginate-links li {
  display: flex;
  width: 48%;
  font-size: 2vmax;
  background-color: #64bf92;
  color: white;
  padding: 0.5rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  cursor: pointer;
  border-radius: 3px;
}
.paginate-links li a {
  width: 100%;
}
.paginate-result {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.fade-container {
  height: 80vmin;
}

.fade-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1) 0.3s;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter {
  filter: blur(3px) opacity(0);
}
.fade-leave-to {
  filter: blur(3px) opacity(0);
}
.fade-enter-to,
.fade-leave {
  filter: blur(0px) opacity(1);
}
</style>
