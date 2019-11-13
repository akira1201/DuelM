<template>
    <v-btn @click.stop="showAuthForm=true">
      signin
      <singinDialog v-model="showAuthForm"></singinDialog>
    </v-btn>
</template>

<script>
import singinDialog from './singinDialog.vue'
export default {
  data () {
    return {
      showAuthForm: false
    }
  },
  components: { 
    singinDialog 
  }
}
</script>