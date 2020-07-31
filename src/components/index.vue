<template>
    <div>
        <div class="loader" v-if="loader"></div>
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
                                    <option v-for="(region, index) in regions" :key="index">{{region}}</option>
                                </select>   
                            </div>             
                        </div>
                    </div>
                </div>
                <div class="col-md-3 countryHolder" v-for="(country, index) in filteredCountry" :key="index">
                    <router-link :to="'viewCountry/' + country.alpha3Code" class="h5 text-decoration-none countryHolder">
                        <div class="card">
                            <img class="card-img-top" :src="country.flag" :alt="country.name">
                            <div class="card-body">
                                <h5 class="font-weight-bold">{{country.name}}</h5>
                                <p><span class="font-weight-bold"> Population:</span> {{ Number(country.population).toLocaleString() }}</p>
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
            loader: false,
            countries: [],
            alpha3Code: this.$route.params.alpha3Code,
            search: '',
            regionn: 'Filter by Region',
            regions: ['Filter by Region', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
        }
    },
    created(){
        this.loader = true;
        this.$http.get('https://restcountries.eu/rest/v2/all').then(response =>{
            this.loader = false;
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
        padding:15px 0px 15px 40px;
        box-shadow: 0 2px 40px rgba(0, 0, 0, 0.1);
        background: var(--secondary-color);
        color: var(--font-color);
        border: none;
        font-size: 0.75em;
    }
    ::-webkit-input-placeholder{
        color: var(--font-color);
    }
    .search-icon{
        top: 50%;
        left: 35px;
        transform: translate(-50%, -50%);
    }
    .regionselector{
        width: 35% !important;
    }
    .regionSelect select{
        color: var(--font-color);
        border: none;
        background: var(--secondary-color);        
        box-shadow: 0 2px 40px rgba(0, 0, 0, 0.1);
    }
    .card-img-top{
        min-height: 9em !important;
    }
    .card{
        margin-bottom: 30px;
        min-height: 18em;
        background: var(--secondary-color);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .card-body p{
        font-size: 16px;
        margin-bottom: 2px;
    }
    @media(max-width: 991px){
       .regionselector{
            width: 50% !important;
        }
        .countryHolder{
            flex: 0 0 33%;
            max-width: 33%;
        }
    }
    @media(max-width: 600px){
        .regionSelect{
            margin-top: 1em;
            justify-content: flex-start !important;
        }
        .countryHolder{
            flex: 0 0 100%;
            max-width: 100%;
        }
    }
    @media(max-width: 576px){
        .regionSelect{
            margin-top: 1em;
        }
    }
    /* Preloader */
    .loader{
			width: 50px;
			height: 50px;
			border-radius: 50px;
			border: 8px solid black;
			border-left: 8px solid lightgray;
			border-top:  8px solid lightgray;
			border-bottom:  8px solid lightgray;
			position: absolute;
			top: 50%;
            left: 50%;
            z-index: 5;
			transform: translate(-50%, -50%);
			animation: roll 1s infinite;

		}
		@keyframes roll{
			0%{
				transform: rotate(0deg);
			}
			100%{
				transform: rotate(360deg);
			}
		}
</style>