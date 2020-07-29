<template>
    <div id="app">
      <router-view :countries="countries"></router-view>
    </div>
</template>

<script>



  export default {
      data(){
        return{
          countries: []
        }
      },
      created(){
        this.$http.get('https://restcountries.eu/rest/v2/all').then(response =>{
            console.log(response);
            const resultArray = [];
          for (let key in response.data){
            response.data[key].id = key
            resultArray.push(response.data[key]);
          }
          this.countries = resultArray;
        }, error=>{
          console.log(error)
        });
    }
  }
</script>

<style>

</style>


