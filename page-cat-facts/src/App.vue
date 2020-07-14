<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return { transitionName: null };
  },
  watch: {
    $route(to, from) {
      if (from.path === "/") {
        this.transitionName = "slide-fade-left";
      } else {
        this.transitionName = "slide-fade-right";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 10vmin; */
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.slide-fade-left-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-left-leave-active {
  transition: all 0.8s cubic-bezier(0.57, 0.54, 0, 0.99);
}
.slide-fade-left-enter {
  transform: translateX(100%);
  opacity: 1;
}
.slide-fade-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-left-enter-to,
.slide-fade-left-leave {
  transform: translateX(0);
}

.slide-fade-right-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-right-leave-active {
  transition: all 0.8s cubic-bezier(0.57, 0.54, 0, 0.99);
}
.slide-fade-right-enter {
  transform: translateX(-100%);
  opacity: 1;
}
.slide-fade-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-right-enter-to,
.slide-fade-right-leave {
  transform: translateX(0);
}
</style>
