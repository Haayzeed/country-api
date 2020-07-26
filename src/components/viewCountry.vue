<template>
    <div>
        <div class="container mt-5">
            <div class="row mt-3">
                <div class="col-md-6">
                    <img :src="country.flag" alt="country flag" class="img-fluid">
                </div>
            
        <div class="col-md-6">
            <div class="row">
                
                <div class="col-md-6">
                    <h4>{{country.name}}</h4>
                    <table>
                        <tr>
                            <td><span class="font-weight-bold">Native Name:</span>{{country.nativeName}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Population:</span>{{country.population}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Region:</span>{{country.region}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Sub Region:</span>{{country.subregion}}</td>
                        </tr>
                        <tr>
                            <td><span class="font-weight-bold">Capital:</span>{{country.capital}}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <table>
                        <tr>
                            <td><span class="font-weight-bold">Top Level Domain:</span>{{country.topLevelDomain}}</td>
                        </tr>
                        <!-- <tr>
                            <td><span class="font-weight-bold">Currencies:</span>{{country.currencies[0].name}}</td>
                        </tr> -->
                        <!-- <tr>
                            <td><span class="font-weight-bold">Time Zone:</span>{{country.timezones[0]}}</td>
                        </tr> -->
                        <tr>
                            <td><span class="font-weight-bold">Area:</span>{{country.area}}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-12">
                    <ul>
                        <li v-for="border in borders" :key="border"><router-link :to="borders" class="h5 text-dark">{{border}}</router-link></li>
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
    data(){
        return{
            name: this.$route.params.name,
            country: {},
            borders: []
        }
    },
    methods: {

    },
    created(){
      this.$http.get('https://restcountries.eu/rest/v2/name/'+ this.name).then(response =>{
          console.log(response);
          this.country = response.body[0];
        //   console.log(this.country);
          
          const resultArray = [];
          for (let key in response.body[0].borders){
        //     // var result = this.users.push(response.data[key]);
            // response.body[0]
            console.log(response.body[0].borders[key]);
            resultArray.push(response.body[0].borders[key]);

            //  resultArray.push(response.data[key].value);
        //     resultArray.push(response.body);
          }
          this.borders = resultArray;
        //   console.log(resultArray);
          console.log(this.country);
          console.log(this.borders);


        }, error=>{
          console.log(error)
        }) 
    }
}
</script>