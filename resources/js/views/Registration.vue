<template>
  <div class="container">
    <hero-bar>
      UBIS - Product Registration
      <p class="subtitle">Neues Produkt erzeugen</p>
    </hero-bar>
    <section class="section is-main-section">

<card-component title="Artikel" class="has-mobile-sort-spaced" icon="filter" >

            <b-autocomplete
                :data="articleData"
                placeholder="e.g. SCON"
                field="title"
                :loading="isFetching"
                @typing="getAsyncArticleData"
                @select="option => selected = option"
                v-show="selected == null">

                <template slot-scope="props">
                    <div class="media">
                        <div class="media-left">
                            <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.image}`">
                        </div>
                        <div class="media-content">
                            {{ props.option.articleNumber }}
                            <br>
                            <small>
                                {{ props.option.name }}
                            </small>
                        </div>
                    </div>
                </template>
            </b-autocomplete>
            <p class="content" v-if="selected != null">{{ selected.articleNumber }} {{ selected.name }}</p>

</card-component>

      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="512" label="Clients"/>
        <card-widget class="tile is-child" type="is-info" icon="cart-outline" :number="7770" prefix="$" label="Sales"/>
        <card-widget class="tile is-child" type="is-success" icon="chart-timeline-variant" :number="256" suffix="%" label="Performance"/>
      </tiles>

      <card-component title="Clients" class="has-table has-mobile-sort-spaced" icon="account-edit">

      </card-component>

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

export default {
  data() {
      return {
          articleData: [],
          selected: null,
          isFetching: false
      }
  },

  name: 'home',
  components: {
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncArticleData: debounce(function (name) {
        if (!name.length) {
            this.articleData = []
            return
        }
        this.isFetching = true
// FUCKING COOOOORS !!!!!!!!!!!!!!!!!!!!!!!!!!!
        axios
          .get(`http://127.0.0.1:8000/api/articles?size=10&short=1&search_artnr=${name}`, {
              headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Authorization, Content-Type, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Range"
              }
          })
          .then( result => {
            console.log('inside then');
            console.log(result.data)
            this.isFetching = false
            this.articleData = []
            result.data.data.forEach((item) => this.articleData.push(item))
            console.log(this.articleData)
          })
          .catch( error => {
            console.log('inside catch');
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
            this.isFetching = false
          })
      },
     500)
  }
}
</script>
