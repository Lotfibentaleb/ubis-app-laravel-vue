<template>
  <div class="container">
    <hero-bar>
      UBIS - Product Registration
      <p class="subtitle">Neues Produkt erzeugen</p>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Artikel" class="has-mobile-sort-spaced" icon="filter" >
        <b-autocomplete
            :data="articleList"
            placeholder="e.g. 800000114B2"
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
        <div v-if="articleSelected != null">
          <p class="title" >{{ articleSelected.articleNumber }} - {{ articleSelected.name }}</p>
          <div class="level">
            <div>
              <p class="heading">Serial Nr</p>
              <p class="subtitle is-5 has-text-grey-lighter">{{productSerial}}</p>
            </div>
            <div>
              <p class="heading">ID</p>
              <p class="subtitle is-5 has-text-grey-lighter">{{productId}}</p>
            </div>
          </div>
          <div class="buttons">
              <b-button @click="newProduct" type="subtitle is-5 is-light" outlined expanded>Neues Produkt anlegen</b-button>
          </div>
        </div>
      </card-component>

      <!-- show all possible sub components -->
      <div v-for="item in this.articleDetails.bom" :key="item.name">
          <sub-component :componentdata=item></sub-component>
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
          articleDetails: [],
          productSerial: '-',
          productId: '-'
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
  },
  mounted () {
    console.log('Inside mounted');
    console.log(this.server_data);
  },
  watch: {
    articleSelected: function(){
      this.articleDetails = []
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
            console.log(result.data.data)
            this.isFetchingArticleDetails = false
            this.articleDetails = result.data.data
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
    }
  },
  methods: {

    newProduct () {
          this.productSerial = '-'
          this.productId = '-'
          // trigger reactivity @TODO: to avoid refetching, cleanup form
          let article = this.articleSelected
          this.articleSelected = null
          this.articleSelected = article

    },
    // You have to install and import debounce to use it,
    // it's not mandatory though.
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
            console.log(this.articleList)
          })
          .catch( error => {
            if (error.request) {
              /*
              * The request was made but no response was received, `error.request`
              * is an instance of XMLHttpRequest in the browser and an instance
              * of http.ClientRequest in Node.js
              */
              console.log(error.request);
            }else  if (error.response) {
              /*
              * The request was made and the server responded with a
              * status code that falls out of the range of 2xx
              */
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
