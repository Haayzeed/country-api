<template>
    <div>
        <mainHeader></mainHeader>
        <div class="container">
            <div class="row">
                <div class="col-md-12 mb-5">
                    <div class="row">
                        <div class="col-md-5">
                            <input type="text" class="form-control input position-relative" v-model="search" placeholder="Search for a country...">
                            <i class="fas fa-search search-icon position-absolute"></i>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-6 regionSelect d-flex justify-content-end">
                            <div class="regionselector">
                                <select class="form-control" v-model="regionn">
                                    <option v-for="region in regions" :key="region">{{region}}</option>
                                </select>   
                            </div>             
                        </div>
                    </div>
                </div>
                <div class="col-md-3" v-for="(country, index) in filteredCountry" :key="index">
                    <router-link :to="'viewCountry/' + country.alpha3Code" class="h5 text-dark text-decoration-none countryHolder">
                        <div class="card">
                            <img class="card-img-top" :src="country.flag" :alt="country.name">
                            <div class="card-body">
                                <h5 class="font-weight-bold">{{country.name}}</h5>
                                <p><span class="font-weight-bold"> Population:</span> {{country.population}}</p>
                                <p><span class="font-weight-bold">Region:</span> {{country.region}}</p>
                                <p><span class="font-weight-bold">Capital:</span> {{country.capital}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>      
    </div>
</template>
<script>
import mainHeader from '../components/mainHeader.vue'
export default {
    components: {
        mainHeader
    },
    data() {
        return {
            countries: [],
            alpha3Code: this.$route.params.alpha3Code,
            search: '',
            regionn: '',
            regions: ['Filter by Region', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
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
    },
    computed: {
        filteredCountry(){
            return this.countries.filter((country) =>{
                return country.name.toLowerCase().match(this.search.toLowerCase());
            }).filter((country) => {
            if (this.regionn === "Filter by Region") {
                return country.region;
            }
            return country.region.match(this.regionn);
            });
        } 
    }
}
</script>
<style scoped>
   
    .form-control:focus{
        box-shadow: none;
    }
    .input{
        padding-left: 35px;
    }
    .search-icon{
        top: 50%;
        left: 35px;
        transform: translate(-50%, -50%);
        color: var(--slider-color);
    }
    .regionselector{
        width: 30% !important;
    }
    .card-img-top{
        min-height: 9em !important;
    }
    .card{
        margin-bottom: 30px;
        min-height: 18em;
        background: var(--secondary-color);
    }
    .card-body p{
        font-size: 16px;
        margin-bottom: 2px;
    }
    @media(max-width: 800px){
       .regionselector{
            width: 50% !important;
        }
    }
    @media(max-width: 600px){
        .regionSelect{
            margin-top: 1em;
            justify-content: flex-start !important;
        }
    }
    @media(max-width: 576px){
        .regionSelect{
            margin-top: 1em;
        }
    }
</style>