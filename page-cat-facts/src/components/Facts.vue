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
          <div class="card mb-2 bg-light" v-for="fact in paginated('facts')" v-bind:key="fact._id">
            <router-link :to="{ name: 'fact', params: { id: fact._id, info: fact} }">
              <div class="card-body">
                <h5 class="card-title">{{ fact.type }}</h5>
                <p class="card-text">{{ fact.text }}</p>
              </div>
            </router-link>
          </div>
        </paginate>
        <paginate-links
          for="facts"
          :show-step-links="true"
          :simple="{
                    prev: 'Anterior',
                    next: 'Siguiente'  
                }"
        ></paginate-links>
      </div>
    </div>
  </div>
</template>


<script>
// import fs from 'fs';
export default {
  data() {
    return {
      facts: [],
      paginate: ["facts"]
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
        .then(data => (vm.facts = data.all));
    }
  }
};
</script>


<style>
.paginate-links {
  width: 100%;
  list-style: none;
  text-align: center;
}
.paginate-links li {
  display: inline;
  background-color: #64bf92;
  color: white;
  padding: 0.5rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  cursor: pointer;
  border-radius: 3px;
}
.paginate-result {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}
</style>