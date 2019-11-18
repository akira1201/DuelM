<template>
<v-dialog v-model="show" max-width="500px">
  <v-card>
    <v-card-actions>
      <input class="input" v-model="myId" placeholder="my id">
      <input class="input" v-model="enemyId" placeholder="enemy id">
      <input class="input" v-model="myDeckId" placeholder="my deck id">
      <input class="input" v-model="enemyDeckId" placeholder="enemy deck id">
      <v-btn color="primary" flat @click="callInitGame">Submit</v-btn>
      <v-btn color="primary" flat @click.stop="show=false">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios'
import env from '@/assets/env.json'
export default {
  props: {
     value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  },
  methods: {
    async callInitGame(){
      localStorage.myId = this.myId
      let requestData = {
          "user1Id": this.myId,
          "user2Id": this.enemyId,
          "user1DeckId": this.myDeckId,
          "user2DeckId": this.enemyDeckId
      }
      let headers = {
          "headers":{
            "token": localStorage.token
          }
      }
      //console.log(headerData,headers)
      await axios
        .post(env.host+env.path.initGame,requestData,headers)
        .then( response => {
            this.$root.$data.gameId = response.data.gameId
            console.log(`gameId is ${sessionStorage.gameId}`)
            console.log(`currentTurn is ${response.data.currentTurn}`)
        })
        .catch(function(error) {
          console.log(error)
          console.log('failed to start game')
        })
      await axios
        .get(env.host+env.path.getGameForPlayers.replace('{gameId}',this.$root.$data.gameId), headers)
        .then(response=>{
          this.$store.commit('updateGameInfo', response.data);
        })
        .catch(function(error) {
          console.log(error)
          console.log('failed to get gameInfo')
        })
    },
  }
}
</script>