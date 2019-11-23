<template>
  <v-app id="inspire" dark>
    <duelToolbar/>
    <v-container>
      <v-row>
        <v-col cols=4>
          <detail/>
        </v-col>
        <v-col cols=8>
          <duel/>
        </v-col>
      </v-row>
    </v-container>
    <duelDialog
      :dialog="this.$store.state.dialogInfo.isShown"
      :dialogInfo="this.$store.state.dialogInfo"
    ></duelDialog>
  </v-app>
</template>

<script>
import axios from 'axios'
import duelToolbar from './organisms/duelToolbar.vue'
import detail from './organisms/detail.vue'
import duel from './organisms/duel.vue'
import duelDialog from './organisms/duelDialog.vue'
import env from '@/assets/env.json'

export default {
  components: {
    duelToolbar,
    detail,
    duel,
    duelDialog,
  },
  computed:{
    isLoggin(){
      if(this.$store.state.loginInfo=='true'){
        return true
      } else {
        return false;
      }
    },
    player(){
      if(this.$store.state.gameInfo.currentTurn==localStorage.myId){
        return "Your Turn";
      } else {
        return "Enemy's Turn";
      }
    },
    gamePhase(){
      switch(this.$store.state.gameInfo.step){
        case(1):
          return "Mana Charge Step";
        case(2):
          return "Main Step";
        case(3):
          return "Battle Step";
        default:
          return "????";
      }
    },
  },
  methods: {
    surrender(){
      window.alert("TODO impl 降参")
    },
    showCommand(event){
      let canUse = false;
      let gameCardUId = false;
      if(event.isCardSelected==true){
        canUse = event.canUse;
        gameCardUId=event.gameCardUId;
      }
      this.$store.commit('updateDialogInfo', {
        isShown:true,
        canUse:canUse,
        gameCardUId:gameCardUId
      });

    },
    openDialog(event){
      this.$store.commit('updateDialogInfo', dialogInfo);
    },
    closeCommand(){
      this.$store.commit('updateDialogInfo', {
        isShown:false,
      });
    },
    pollingGameInfo(intervalMilliSec){
      const getGameInfo = cm =>{
          let headers = {
            "headers":{
              "token": localStorage.token
            }
          }
          if(cm.$root.$data.gameId){
            axios
						.get(env.host+env.path.getGameForPlayers.replace('{gameId}',cm.$root.$data.gameId), headers)
						.then(response=>{
							cm.$store.commit('updateGameInfo', response.data);
						})
						.catch(function(error) {
							window.alert(error);
						})
          }
      }
      let cm = this
      const id = setInterval(function() {
        let d = new Date()
        let h = d.getHours()
        let m = d.getMinutes()
        let s = d.getSeconds()
        console.log(`Polling getGameInfo start at ${h}:${m}:${s}`)
        getGameInfo(cm)
      }, intervalMilliSec)
    }
  },
  created() {
    this.pollingGameInfo(15000)
  }
}
</script>
