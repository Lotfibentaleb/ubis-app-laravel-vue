<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :icon="icon" custom-size="default"/>
        {{ title }}
      </p>
      <a v-if="headerIcon" href="#" class="card-header-icon" aria-label="more options" @click.prevent="headerIconClick">
        <b-icon :icon="headerIcon" custom-size="default"/>
      </a>
      <b-button v-if="buttonType == 'excel_export'" type="is-info" @click="clickMe">Excel export</b-button>
    </header>
    <div class="card-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    },
    buttonType: {
      type: String,
      default: ''
    }
  },
  methods: {
    headerIconClick () {
      this.$emit('header-icon-click')
    },
    clickMe() {
      this.$buefy.notification.open('Clicked!!')
    }
  }
}
</script>
