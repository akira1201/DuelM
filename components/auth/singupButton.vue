<template>
    <v-btn @click.stop="showAuthForm=true">
      signup
      <singupDialog v-model="showAuthForm"></singupDialog>
    </v-btn>
</template>

<script>
import singupDialog from './singupDialog.vue'
export default {
  data () {
    return {
      showAuthForm: false
    }
  },
  components: { 
    singupDialog 
  }
}
</script>