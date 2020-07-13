<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div :class="clase">
          <div class="card-body">
            <h5 class="card-title">Cat Fact</h5>
            <p class="card-text">{{ fact.type }}</p>
            <p class="card-text">{{ fact.text }}</p>
            <h6 class="card-subtitle mb-2">Votos: {{ $route.params.info.upvotes }}</h6>
            <h6 v-if="hasUser($route.params.info)" class="card-subtitle mb-2">
              Publicado por:
              {{ $route.params.info.user.name.first + ' ' +$route.params.info.user.name.last }}
            </h6>
          </div>
          <div class="card-footer">
            <span>Fecha de Creación: {{ fecha(fact.createdAt) }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4">
        <router-link :to="{ name: 'facts'}">
          <button type="button" class="btn btn-outline-primary">Volver</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
export default {
  props: ["info"],

  data() {
    return {
      fact: {},
      clase: "",
      classBackground: [
        "bg-primary",
        " bg-dark",
        "bg-secondary",
        "bg-success",
        "bg-danger",
        "bg-info"
      ],
      classBorder: [
        "border-primary",
        "border-dark",
        "border-secondary",
        "border-success",
        "border-danger",
        "border-info",
        "border-light"
      ]
    };
  },

  created() {
    this.getFact(this.$route.params.id);
    this.randomColor();
  },

  methods: {
    //agrega colores de background y bordes de forma aleatoria
    randomColor() {
      let lenBorder = this.classBorder.length;
      let lenBackgrounds = this.classBackground.length;
      let indexB = Math.floor(Math.random() * lenBorder);
      let indexC = Math.floor(Math.random() * lenBackgrounds);
      this.clase =
        "card pt-4 text-white " +
        this.classBorder[indexB] +
        " " +
        this.classBackground[indexC];
    },

    // compruebo que exista la propiedad user, algunos objetos devueltos por la API no tenian esta prop
    hasUser(variable) {
      return variable.hasOwnProperty("user");
    },

    //formateo la fecha para mostrarla como quiero
    fecha(str) {
      return moment(str).format("DD/MM/YYYY hh:mm");
    },

    // consulto a la api el id de fact que quiero
    getFact(id) {
      let vm = this;
      fetch("https://cat-fact.herokuapp.com/facts/" + id)
        .then(response => response.json())
        .then(data => (vm.fact = data));
    }
  }
};
</script>