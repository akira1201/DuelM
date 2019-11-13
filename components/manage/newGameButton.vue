<template>
    <v-btn @click.stop="showNewGameForm=true">
      new game
      <newGameDialog v-model="showNewGameForm" @setGameInfo="setGameInfo"></newGameDialog>
    </v-btn>
</template>

<script>
import newGameDialog from './newGameDialog.vue'
export default {
  data () {
    return {
      showNewGameForm: false
    }
  },
  components: { 
    newGameDialog 
  },
  methods: {
    setGameInfo(gameInfo){
      this.$emit('setGameInfo',gameInfo)
    },
  }
}
</script>