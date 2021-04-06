<template>
  <modal-box :is-active.sync="isActive" @confirm="confirm" @cancel="cancel" confirm-type="is-danger" confirm-label="Delete">
    <p>Dauerhaftes Löschen von <b>{{ trashSubject }}</b>?</p>
    <p>Diese Aktion kann nicht rückgängig gemacht werden</p>
  </modal-box>
</template>

<script>
import ModalBox from "./ModalBox";
export default {
  name: "ModalTrashBox",
  components: {ModalBox},
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashSubject: {
      type: String,
      default: null
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

