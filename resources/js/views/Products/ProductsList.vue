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
        <products-table data-url="/productlist" :checkable="true"/>
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
export default {
  name: 'products.list',
  components: { HeroBar, TitleBar, CardComponent, ProductsTable, Notification },
  computed: {
    titleStack () {
      return [
        'Production',
        'Products'
      ]
    }
  }
}
</script>
