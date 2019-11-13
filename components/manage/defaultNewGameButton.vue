<template>
    <v-btn @click.stop="showNewGameForm=true">
      default game
      <defaultNewGameDialog v-model="showNewGameForm" @setGameInfo="setGameInfo"></defaultNewGameDialog>
    </v-btn>
</template>

<script>
import defaultNewGameDialog from './defaultNewGameDialog.vue'
export default {
  data () {
    return {
      showNewGameForm: false
    }
  },
  components: { 
    defaultNewGameDialog 
  },
  methods: {
    setGameInfo(gameInfo){
      this.$emit('setGameInfo',gameInfo)
    },
  }
}
</script>