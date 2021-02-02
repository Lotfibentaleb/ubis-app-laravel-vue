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
          <div class="level">
            <div>
              <p class="heading">Serial Nr</p>
              <p v-bind:class="product_info_class">{{productSerial}}</p>
            </div>
            <div>
              <p class="heading">ID</p>
              <p v-bind:class="product_info_class">{{productId}}</p>
            </div>
          </div>
          <b-field>
              <b-input
              class="is-expanded"
              size="is-medium"
              :value="productSearch"
              @change.native="productSearch = $event.target.value"
              placeholder="Nach Produkt Seriennummer (z.B. 100004) oder ID (z.B. c54368a6-60cc-11eb-ae93-0242ac130002) suchen"/>
              <b-button :disabled="transmissionActive" type="is-success" label="suchen" size="is-medium"/>
          </b-field>
          <b-button @click="newProduct" type="subtitle is-5 is-light has-text-grey"  expanded>Neues Produkt anlegen</b-button>
        </div>
      </card-component>

      <!-- show all possible sub components -->
      <div v-if="this.articleDetails != null">
      <div  v-for="item in this.articleDetails.bom" :key="item.name">
          <sub-component v-on:productUpdate="handleProductUpdate" :componentarticledata=item :articlenumber="articleDetails.articleNumber" :productid="productId" :componentserial="item.component_serial" :componentid="item.component_id"></sub-component>
          <br/>
      </div>
      </div>

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
          product_info_class: 'subtitle is-5 has-text-grey-lighter',
          productSearch: null,
          transmissionActive: false
      }
  },

  name: 'home',
  components: {
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    SubComponent
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
    }
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
      // plain product UUID search
      let url = `/registration/product/${this.productSearch}/articleNr`
      if( this.articleSelected ){
        // article nr. + article serial search
        url = `/registration/product/${this.productSearch}/articleNr/${this.articleSelected.articleNumber}`
      }

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
    // reset local product selection by sub-component event
    handleProductUpdate: function(productSerial, productId ){
      this.productSerial = productSerial
      this.productId = productId
      this.product_info_class = 'subtitle is-5 has-text-grey-darker'
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
            console.log('Article details');
            console.log(result.data)
            this.isFetchingArticleDetails = false
            this.articleDetails = result.data.data
            if( this.productDetails ){
              // set ID/Serial for given subcomponents
              this.articleDetails.bom.forEach(function(component){
                  let result = this.productDetails.components.find( function(currentValue, index, arr){
                    return currentValue.st_article_nr === component.articleNumber
                  });
                  console.log('Matching product details component:')
                  console.log(result)
                  if ( result ){
                    // matching result -> add to articles bom array
                    this.productDetails.components = this.grep(this.productDetails.components, function(e){
                      // remove assigned enty from product details bom, required if we have multiple subcomponents of some art.nr
                      return e.id != result.id

                    })
                    component.component_id = result.id
                    component.component_serial = result.serial_nr
                  }
              }, this)
              console.log('Extended article details BOM:')
              console.log(this.articleDetails.bom)
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
