<template>
    <div>
        <div class="container mt-5">
            <div class="row mt-3">
                <div class="col-md-6">
                    <img :src="userData.flag" alt="country flag" class="img-fluid">
                </div>
            
        <div class="col-md-6">
            <div class="row">
                
                <div class="col-md-6">
                    <h4>{{userData.name}}</h4>
                    <table>
                        <tr>
                            <td><span class="font-weight-bold">Native Name:</span>{{userData.nativeName}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Population:</span>{{userData.population}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Region:</span>{{userData.region}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Sub Region:</span>{{userData.subregion}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Capital:</span>{{userData.capital}}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <table>
                        <tr>
                            <td><span class="font-weight-bold">Top Level Domain:</span>{{userData.topLevelDomain[0]}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Currencies:</span>{{userData.currencies[0].name}}</td>
                        </tr> 
                        <tr>
                            <td><span class="font-weight-bold">Time Zone:</span>{{userData.timezones[0]}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Area:</span>{{userData.area}}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-12">
                    <ul>
                        <!-- <li v-for="(border, index) in country.borders" :key="index"><router-link :to="border" class="h5 text-dark">{{border}}</router-link></li> -->
                         <router-link :to="border" v-for="(border, index) in borders" :key="index">{{border}}</router-link>
                    </ul>
                    <!-- <p> <span class="font-weight-bold">Borders:</span>  <router-link :to="country.borders[0]" class="h5 text-dark">{{country.borders[0]}}</router-link></p> -->
                </div>

            </div>
            
            
        </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // countries: Object
    },
    data(){
        return{
            
            alpha3Code: this.$route.params.alpha3Code,
            country: {},
            userData: [],
            borders: []
            // id: this.$route.params.name,
            // countries: [],
            // me: 'Nigeria'
        }
    },
    watch:{
        '$route'(to){
            this.border = to.params.alpha3Code;
        }
    },
    methods: {

    },
    created(){
        this.$http.get("https://restcountries.eu/rest/v2/all")
       .then((response) => {
         this.userData = response.data.find(
          (tester) => tester.alpha3Code === this.$route.params.alpha3Code
         );
         this.borders = this.userData.borders;
        //  console.log(response.data);
        //  console.log(this.userData);
        //  console.log(this.borders);

        //  console.time(this.userData);
       })
       .catch((error) => console.error(error));
    //   console.log(this.country)
         


    }
    
}
</script>