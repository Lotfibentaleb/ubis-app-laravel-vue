<template>
    <div class="edit-panel">
        <label>Product Order Nr</label>
        <b-input v-model="productOrderNr"></b-input>
        <b-button @click="handleSave">Save</b-button>
        <b-button @click="handleClose">Close</b-button>
    </div>
</template>

<script>

import BInput from "buefy/src/components/input/Input";
export default {
    name: 'TableEditPanel',
    components: {BInput},
    props: ['curValue'],
    data() {
        return {
            productOrderNr: ''
        }
    },
    mounted() {
      this.productOrderNr = this.curValue
    },
    methods: {
        handleSave () {
            if(this.productOrderNr === ''){
                let infoMessage = `Please input product order number`
                this.$buefy.snackbar.open({
                    message: infoMessage,
                    type: 'is-danger',
                    queue: false
                })
                return;
            } else {
                this.$emit("onSettingSave", this.productOrderNr)
            }
        },
        handleClose () {
            this.$emit("onSettingHide", false)
        }
    }
}
</script>
<style>
    .edit-panel {
        background: #888bf1;
        width: 300px;
        height: 100%;
        position: absolute;
        right: 0;
        overflow-y: scroll;
    }
    .card-content {
        display: flex;
        position: relative;
    }
</style>