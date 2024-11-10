<template>
    <Navbar />
    <RouterView></RouterView>
    <Footer />
</template>
  

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/footer.vue';


export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    
  }
}

</script>

<style>
#app {
  
}
</style>
