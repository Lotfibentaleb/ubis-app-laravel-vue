<template>

    <div class="edit-panel" v-bind:class="{'active-edit-panel': active}">
        <div class="panel-layout">
            <div>
                <div style="margin: 10px">
                    <label>Product Order Nr</label>
                </div>
                <div style="margin: 10px">
                    <b-input v-model="productOrderNr"></b-input>
                </div>
            </div>
            <div class="row-panel-btn">
                <b-button class="btn excel-export panel-btn" @click="handleSave">Save</b-button>
                <b-button class="btn excel-export panel-btn" @click="handleClose">Close</b-button>
            </div>
        </div>
    </div>
</template>

<script>

import BInput from "buefy/src/components/input/Input";
export default {
    name: 'TableEditPanel',
    components: {BInput},
    props: ['curValue', 'isShow'],
    data() {
        return {
            productOrderNr: '',
            active: false
        }
    },
    mounted() {
      this.productOrderNr = this.curValue;
      setTimeout(()=>{
          this.active = true;
      }, 50);
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
            setTimeout(()=>{
                this.$emit("onSettingHide", false)
            }, 1000);
            this.active = false;
        }
    }
}
</script>