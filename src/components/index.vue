<template>
    <div>
        <div class="container">
            <div class="row">
                 <div class="col-md-6">
                <h4>Where in the world?</h4>
            </div>
             <div class="col-md-6">
                <h4>Where in the world?</h4>
            </div>
            </div>
           
            <div class="row">
                <div class="col-md-6">
                    <input type="text" class="form-control" v-model="search" placeholder="Search for Blog News">
                </div>
                <div class="col-md-6">
                    <select class="form-control" v-model="regionn">
                        <option v-for="region in regions" :key="region">{{region}}</option>
                    </select>                
                </div>
                <br>
                <br>
                <div class="col-md-3" v-for="(country, index) in filteredCountry" :key="index">
                    <router-link :to="'viewCountry/' + country.alpha3Code" class="h5 text-dark">
                    <div class="card">
                        <div class="card-body">
                            <img :src="country.flag" alt="" class="img-fluid">
                            <h4>{{country.name}}</h4>
                            <p>Population: {{country.population}}</p>
                            <p>Region: {{country.region}}</p>
                            <p>Capital: {{country.capital}}</p>

                        </div>
                    </div>
                    </router-link>
                    </div>
                </div>
            </div>      
    </div>
</template>
<script>
export default {
    // props:{
    //     countries: Object
    // },
    data() {
        return {
            countries: [],
            alpha3Code: this.$route.params.alpha3Code,
            search: '',
            regionn: '',
            regions: ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
        }
    },
    methods: {

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
    },
    computed: {
        filteredCountry(){
            return this.countries.filter((country) =>{
                return country.name.toLowerCase().match(this.search.toLowerCase());
            }).filter((country) => {
            if (this.regionn === "All") {
                return country.region;
            }
            return country.region.match(this.regionn);
            });
        } 
    }
}
</script>
<style scoped>
    
</style>