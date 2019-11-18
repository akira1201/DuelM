<template>
<v-dialog v-model="show" max-width="500px">
  <v-card>
    <v-card-actions>
      <input class="input" v-model="enemyId" placeholder="enemy id">
      <v-btn color="primary" flat @click="callDefaultInitGame">Submit</v-btn>
      <v-btn color="primary" flat @click.stop="show=false">Close</v-btn>
      {{ users }} 
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
  created (){
    let headers = {
        "headers":{
          "token": localStorage.token
        }
    }
    console.log('Start created......')
    axios
      .get(env.host+env.path.getUsers,headers)
      .then(response=>{
        console.log(response)
        this.users = response.data
      })
      .catch(function(error) {
        console.log(error)
        console.log('failed to get gameInfo')
      })
},
  methods: {
    callDefaultInitGame(){
      let headers = {
          "headers":{
            "token": localStorage.token
          }
      }
      axios
        .get(env.host+env.path.initDefaultGame,headers)
        .then( response => {
          console.log(response)
          let myDeckId = response.data.decks[0].id
          let enemyDeckId = response.data.decks[0].id
          let requestData = {
              "user1Id": this.$root.$data.id,
              "user2Id": this.enemyId,
              "user1DeckId": myDeckId,
              "user2DeckId": enemyDeckId
          }
          axios
            .post(env.host+env.path.initGame,requestData,headers)
            .then( response => {
                this.$root.$data.gameId = response.data.gameId
                console.log(`gameId is ${sessionStorage.gameId}`)
                console.log(`currentTurn is ${response.data.currentTurn}`)
                axios
                  .get(env.host+env.path.getGameForPlayers.replace('{gameId}',this.$root.$data.gameId), headers)
                  .then(response=>{
                    this.$store.commit('updateGameInfo', response.data);
                  })
                  .catch(function(error) {
                    console.log(error)
                    console.log('failed to get gameInfo')
                  })
            })
            .catch( error => {
              console.log(error)
              console.log('failed to start game')
            })
        })
        .catch(function(error) {
          console.log(error)
          console.log('failed to start game')
        })
      //console.log(headerData,headers)
    },
  }
}
</script>