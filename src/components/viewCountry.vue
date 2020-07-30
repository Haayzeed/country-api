<template>
    <div>
        <mainHeader></mainHeader>
        <div class="container mt-5">
            <div class="row mt-3">
                <div class="col-md-12 mb-5">
                    <router-link to="/" class="btn"><i class="fas fa-arrow-left"></i> Back</router-link>
                </div>
                <div class="col-md-5">
                    <img :src="userData.flag" :alt="userData.name" class="img-fluid">
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6">
                    <div class="col-md-12 pl-0 pt-4 mb-3">
                        <h4 class="font-weight-bold">{{userData.name}}</h4>
                    </div>
                    <div class="row">
                        <div class="col-md-6 pl-0">
                            <table class="table">
                                <tr>
                                    <td><span class="font-weight-bold">Native Name: </span>{{userData.nativeName}}</td>
                                </tr>
                                <tr>
                                    <td><span class="font-weight-bold">Population: </span>{{userData.population}}</td>
                                </tr>
                                <tr>
                                    <td><span class="font-weight-bold">Region: </span>{{userData.region}}</td>
                                </tr>
                                <tr>
                                    <td><span class="font-weight-bold">Sub Region: </span>{{userData.subregion}}</td>
                                </tr>
                                <tr>
                                    <td><span class="font-weight-bold">Capital: </span>{{userData.capital}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6 pl-0">
                            <table class="table">
                                <tr>
                                    <td><span class="font-weight-bold">Top Level Domain:</span> <span v-for="(levelDomain, index) in levelDomains" :key="index">{{levelDomain}}</span></td>
                                </tr>
                                <tr>
                                    <td><span class="font-weight-bold">Currencies:</span>  <span v-for="(currency, index) in currencies" :key="index">{{currency.name}}</span></td>
                                </tr> 
                                <tr>
                                    <td><span class="font-weight-bold">Languages:</span> <span v-for="(language, index) in languages" :key="index">{{language.name}}</span></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-12 pl-0">
                            <table class="table">
                                <tr>
                                    <td><span class="font-weight-bold">Border Countries: </span>  <ul><router-link :to="'' + border" v-for="(border, index) in borders" :key="index" class="borderLink" tag="li">{{border}}</router-link></ul> </td>
                                    </tr>
                            </table>
                        </div>
                    </div>
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
    data(){
        return{
            alpha3Code: this.$route.params.alpha3Code,
            country: {},
            userData: [],
            borders: {},
            languages: {},
            currencies:{},
            levelDomains: {}
        }
    },
    methods: {
        fetchCountry(){
        this.$http.get("https://restcountries.eu/rest/v2/all")
       .then((response) => {
         this.userData = response.data.find(
          (tester) => tester.alpha3Code === this.$route.params.alpha3Code
         );
         this.borders = this.userData.borders;
         this.languages = this.userData.languages;
         this.currencies = this.userData.currencies;
         this.levelDomains = this.userData.topLevelDomain;
       })
       .catch((error) => console.error(error));
      }
    },
    mounted(){
        this.fetchCountry();
    },
    updated() {
        this.fetchCountry();
    }
}
</script>
<style scoped>
    .btn{
        border: none;
        color: var(--font-color);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
    .table tr td{
        font-size: 14px !important;
        padding-top: 5px;
        padding-bottom: 5px;
        border: none;
    }
    .borderLink{
        margin-right: 10px;
        padding: 5px 15px 5px 15px;
        color: var(--font-color);
        text-decoration: none;
        background: var(--secondary-color);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    ul li{
        display: inline-block;
        margin-bottom: 10px;
        cursor: pointer;
        background-color: var(--secondary-color);
    }
</style>