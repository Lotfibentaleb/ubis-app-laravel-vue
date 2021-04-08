<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Produkte
      <p class="subtitle">
         Übersicht aller aktuell in der Datenbank befindlichen Produkte
      </p>
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Produkte" icon="account-multiple">
        <products-table data-url="/productlist" @onSettingShow="onSettingShow" :checkable="true"/>
        <table-edit-panel v-if="isShow" :curValue="tableRowData.production_order_nr" @onSettingHide="onSettingHide" @onSettingSave="onSettingSave"/>
      </card-component>

    </section>
  </div>

</template>

<script>
import Notification from '@/components/Notification'
import ProductsTable from '@/components/ProductsTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import BField from "buefy/src/components/field/Field";
import TableEditPanel from "@/components/TableEditPanel";

export default {
  name: 'products.list',
  components: {BField, HeroBar, TitleBar, CardComponent, ProductsTable, Notification, TableEditPanel },
  computed: {
    titleStack () {
      return [
        'Production',
        'Products'
      ]
    }
  },
  data () {
      return {
          isShow: false,
          tableRowData: {}
      }
    },
  methods: {
      onSettingShow(data) {
        this.tableRowData = data
        this.isShow = true
      },
      onSettingHide(data) {
        this.isShow = false
      },
      onSettingSave(productOrderNr) {
        if (productOrderNr === '' || productOrderNr === null)
        {
          let infoMessage = `Please input product order number`
          this.$buefy.snackbar.open({
              message: infoMessage,
              queue: false
          })
          return;
        }
        this.isShow = false
        this.tableRowData.production_order_nr = productOrderNr
        let method = 'put'
        let productId = this.tableRowData.id
        let url = `/productlist/product/${productId}`
        var data = this.tableRowData
        axios({
            method,
            url,
            data
        }).then( r => {
            this.productDetails = r.data.data
            let infoMessage = `Product update success`
            this.$buefy.snackbar.open({
                message: infoMessage,
                queue: false
            })
        }).catch( err => {
            let message = `Fehler: ${err.message}`
            if( err.response.status == 404){
                message = `Product update failed`
            }
            this.$buefy.toast.open({
                message: message,
                type: 'is-danger',
                queue: false
            })
        }).finally(() => {

        })
      }
  }
}
</script>

