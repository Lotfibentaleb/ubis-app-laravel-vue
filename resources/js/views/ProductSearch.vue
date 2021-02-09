<template>
  <div class="container">
    <hero-bar>
      UBIS - Produktsuche
      <p class="subtitle">Vorhandene Produkte finden, darstellen und löschen</p>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Produkt" class="has-mobile-sort-spaced" icon="filter" >
        <b-autocomplete
            :data="articleList"
            placeholder="Nach ERP Artikelnummer suchen z.B. 800000114B2"
            field="title"
            :loading="isFetchingArticleList"
            @typing="getAsyncArticleList"
            @select="option => articleSelected = option"
            v-show="articleSelected == null"
            size="is-medium"
            >
            <template slot-scope="props">
                <div class="media">
                  <!--
                    <div class="media-left">
                        <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.image}`">
                    </div>
                    -->
                    <div class="media-content">
                        {{ props.option.articleNumber }}<br>
                        <small>
                            <div v-show="props.option.productionArticle == true">- Produktions Artikel -</div>
                            {{ props.option.name }}
                        </small>
                    </div>
                </div>
            </template>
        </b-autocomplete>
        <br/>
        <b-field v-show="articleSelected == null">
            <b-input
            class="is-expanded"
            size="is-medium"
            @change.native="productSearch = $event.target.value"
            placeholder="Nach Produkt ID suchen z.B. c54368a6-60cc-11eb-ae93-0242ac130002"/>
            <b-button :disabled="transmissionActive" type="is-success" label="suchen" size="is-medium"/>
        </b-field>

        <div v-if="articleSelected != null">
          <p class="title" >{{ articleSelected.articleNumber }} - {{ articleName }}</p>
          <b-field>
              <b-input
              class="is-expanded"
              size="is-medium"
              :value="productSearch"
              @change.native="productSearch = $event.target.value"
              placeholder="Nach Produkt oder Komponenten -Seriennummer (z.B. 100004) oder -ID (z.B. c54368a6-60cc-11eb-ae93-0242ac130002) suchen"/>
              <b-button :disabled="transmissionActive" type="is-success" label="suchen" size="is-medium"/>
          </b-field>
          <div class="level">
            <div>
              <p class="heading">Serial Nr</p>
              <p class="subtitle is-5 has-text-grey-darker">{{productSerial}}</p>
            </div>
            <div>
              <p class="heading has-text-right">ID</p>
              <p class="subtitle is-5 has-text-grey-darker has-text-righ">{{productId}}</p>
            </div>
          </div>

          <div v-if="productDetails != null">
          <div class="level">
            <div>
              <p class="heading">Anlage Datum</p>
              <p class="subtitle is-5 has-text-grey-darker">{{productDetails.created_at | moment("DD.MM.YYYY / h:mm:ss")}}</p>
            </div>
            <div>
              <p class="heading has-text-right">Produktions Status</p>
              <!-- https://buefy.org/documentation/steps -->
              <p class="subtitle is-5 has-text-grey-darker has-text-righ">{{productDetails.lifecycle}}</p>
            </div>
          </div>
          </div>

        </div>
      </card-component>

      <div v-if="productDetails != null">
        <card-component title="Produkt Komponenten" class="has-mobile-sort-spaced" icon="view-comfy">

          <div  v-for="item in this.productDetails.components" :key="item.id">
            <div class="level">
              <div>
                {{item.st_article_nr}} - {{item.st_article_name}}
              </div>
              <div>
                {{item.serial_nr}}
              </div>
              <div>
                {{item.created_at | moment("DD.MM.YYYY / h:mm:ss")}}
              </div>
            </div>
          </div>

        </card-component>
      </div>

      <div v-if="productDetails != null">
        <div  v-for="(item, index) in this.productDetails.production_dataset" :key="item.id">

          <br/>
          <card-component :title="'Produktions-Abschnitt: ' +index" class="has-mobile-sort-spaced" icon="progress-wrench">
            <div class="level">
              <div>
                <p class="heading">Erstellt am</p>
                <p class="subtitle is-5 has-text-grey-darker">{{item.created_at | moment("DD.MM.YYYY / h:mm:ss")}}</p>
              </div>
              <div>
                <p class="heading">Status</p>
                <p class="subtitle is-5 has-text-grey-darker">{{item.state}}</p>
              </div>
            </div>
            <div class="level">
                <p class="heading">Info</p>
                <p class="subtitle is-5 has-text-grey-darker">{{item.note}}</p>
            </div>
            <measurement-daisy-a-1 :dataentryid="item.id" :dataentrystepname="index" :productid="productId" :productioninformation="productionInformation(index)"></measurement-daisy-a-1>
            <measurement-bl-press-a-1 :dataentryid="item.id" :dataentrystepname="index" :productid="productId" :productioninformation="productionInformation(index)"></measurement-bl-press-a-1>
<!--            <div class="level">

             <b-table :data="Object.entries(item.data).map(([key, value]) => key=value )" :columns="columns"></b-table>

              <b-table :data="Array.from(Object.entries(item.data))" :columns="columns"></b-table>

              <b-table :data="Array.from(Object.keys(item.data), k=>[`${k}`, item.data[k]])" :columns="columns"></b-table>
              <b-table :data="Array.from(new Map(Object.entries(item.data)))" :columns="columns"></b-table>


            </div>
-->
          </card-component>

        </div>
      </div>


      <!-- show all possible sub components -->
<!--
      <div v-if="this.articleDetails != null">
      <div  v-for="item in this.articleDetails.bom" :key="item.name">
          <sub-component v-on:productUpdate="handleProductUpdate" :componentarticledata=item :articlenumber="articleDetails.articleNumber" :productid="productId" :componentserial="item.component_serial" :componentid="item.component_id"></sub-component>
          <br/>
      </div>
      </div>
-->
    </section>
  </div>
</template>



<script>
// @ is an alias to /src
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import debounce from 'lodash/debounce'
import SubComponent from './SubComponent.vue'
import MeasurementDaisyA1 from './MeasurementDaisyA1.vue'
import MeasurementBLPressA1 from './MeasurementBLPressA1.vue'



export default {
  data() {
      return {
          articleList: [],
          articleSelected: null,
          isFetchingArticleList: false,
          isFetchingArticleDetails: false,
          articleDetails: null,
          productDetails: null,
          productSerial: '-',
          productId: '-',
          productSearch: null,
          transmissionActive: false,
          columns: [
                    {
                        field: 'clean_glass',
                        label: 'Glas sauber',
                        centered: true
                    },
                    {
                        field: 'time_start',
                        label: 'Presse start',
                        centered: true
                    },
                    {
                        field: 'time_end',
                        label: 'Presse end',
                        centered: true
                    },
                    {
                        field: 'vacuum_FPC',
                        label: 'Vakuum FPC',
                        numeric: true
                    },
                    {
                        field: 'vacuum_LCD',
                        label: 'Vakuum LCD',
                        numeric: true
                    },
                    {
                        field: 'vacuum_backlight',
                        label: 'Vakuum Backlight',
                        numeric: true
                    },

          ]
      }
  },

  name: 'home',
  components: {
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    SubComponent,
    MeasurementDaisyA1,
    MeasurementBLPressA1
  },
  computed: {
    'server_data': function(){
      return window.exdata;
    },
    'articleName': function(){
      if( this.articleDetails != null ){
        return this.articleDetails.name
      }
      return this.articleSelected.name
    },
  },
  mounted () {
    console.log('Inside mounted');
    console.log(this.server_data);
  },
  watch: {
    articleSelected: function(){
      if( !this.transmissionActive ){
        this.fetchArticleDetails();
      }
    },
    productSearch: function(){
      if( this.transmissionActive ) return;
//      this.productDetails = null
      this.transmissionActive = true
      let method = 'get'
      let searchString = encodeURIComponent(this.productSearch)
      // plain product UUID search
      let url = `/registration/product/${searchString}/articleNr?lookup_subcomponents=true`
      if( this.articleSelected ){
        // article nr. + article serial search
        url = `/registration/product/${searchString}/articleNr/${this.articleSelected.articleNumber}?lookup_subcomponents=true`
      }
      console.log('Inside product search '+url)
      axios({
        method,
        url
      }).then( r => {
        this.productDetails = r.data.data
        console.log(this.productDetails)
        let infoMessage = `Produkt mit der Ser.Nr./UUID '${this.productSearch}' geladen`
        this.handleProductUpdate(this.productDetails.st_serial_nr, this.productDetails.id)
        this.component_id = this.productDetails.component_id
        this.$buefy.snackbar.open({
          message: infoMessage,
          queue: false
        })
        this.productSearch = null
      }).catch( err => {
        let message = `Fehler: ${err.message}`
        if( err.response.status == 404){
            message = `Fehler: Produkt mit der Ser.Nr./UUID '${this.productSearch}' konnte nicht gefunden werden.`
        }
        this.$buefy.toast.open({
          message: message,
          type: 'is-danger',
          queue: false
        })
      }).finally(() => {
        // this will trigger fetching article details
        if( this.productDetails != null ){
          this.articleSelected = {
            "articleNumber" : this.productDetails.st_article_nr
          }
          this.transmissionActive = false
          this.fetchArticleDetails();
        }else{
          this.transmissionActive = false
        }
      })
    }
  },
  methods: {
    productionInformation: function(stepName){
      let result = null;
      result = this.productDetails.production_information.find( function(currentValue, index, arr){
        return ( currentValue.step_name === stepName );
      });
      return result;
    },
    // reset local product selection by sub-component event
    handleProductUpdate: function(productSerial, productId ){
      this.productSerial = productSerial
      this.productId = productId
    },
    // reset all product values
    newProduct () {
          this.productSerial = '-'
          this.productId = '-'

          // trigger reactivity @TODO: to avoid refetching, cleanup form
          let article = this.articleSelected
          this.articleSelected = null
          this.articleSelected = article
    },
    grep(arr, callback) {
            var newArr = [],
                len = arr.length,
                i;
            for (i = 0; i < len; i++) {
                var e = arr[i];
                if (callback(e)) {
                    newArr.push(e);
                }
            }
            return newArr;
        },
    // fetching article details to this.articleDetails
    fetchArticleDetails(){
      if( this.isFetchingArticleDetails ) return;
      this.articleDetails = null
      this.isFetchingArticleDetails = true
      axios.get(`/registration/articles/${this.articleSelected.articleNumber}`, {
              headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Authorization, Content-Type, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Range"
              }
          })
          .then( result => {
            console.log('Got article details')
            this.isFetchingArticleDetails = false
            this.articleDetails = result.data.data

            // find and assigne name of product.components via article.bom information
            // TODO: should definitely be done on server side
            if( this.productDetails != null){

              this.productDetails.components.forEach(function(component){
                let result = null;
                  result = this.articleDetails.bom.find( function(currentValue, index, arr){
                    return ( currentValue.articleNumber === component.st_article_nr );
                  });
                  if( result != null ){
                    component.st_article_name = result.name;
                  }
              }, this)
            }
          })
          .catch( error => {
            if (error.request) {
              console.log(error.request);
            }else  if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
             } else {
              console.log('Error', error.message);
             }

          })
          .finally(() => {
            this.isFetchingArticleDetails = false
          })
    },
    // fetching articles for article search
    getAsyncArticleList: debounce(function (name) {
        if (!name.length) {
            this.articleList = []
            return
        }
        this.isFetchingArticleList = true

        axios
          .get(`/registration/articles?search_artnr=${name}`, {
              headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Authorization, Content-Type, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Range"
              }
          })
          .then( result => {
            console.log('Article list');
            console.log(result.data)
            this.isFetchingArticleList = false
            this.articleList = []
            result.data.data.forEach((item) => this.articleList.push(item))
          })
          .catch( error => {
            if (error.request) {
              // The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance
              // of http.ClientRequest in Node.js
              console.log(error.request);
            }else  if (error.response) {
              // The request was made and the server responded with a status code that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
             } else {
              // Something happened in setting up the request and triggered an Error
              console.log('Error', error.message);
             }

          })
          .finally(() => {
            this.isFetchingArticleList = false
          })
      },
     250)
  }
}
</script>
