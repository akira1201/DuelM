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
    <command
      v-if="this.$store.state.commandInfo.isShown"
    ></command>
  </v-app>
</template>

<script>
import axios from 'axios'
import duelToolbar from './organisms/duelToolbar.vue'
import detail from './organisms/detail.vue'
import duel from './organisms/duel.vue'
import duelDialog from './organisms/duelDialog.vue'
import command from './molecules/command.vue'
import env from '@/assets/env.json'

export default {
  components: {
    duelToolbar,
    detail,
    duel,
    duelDialog,
    command,
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
    transition(){
      window.alert("TODO impl 次のステップリクエスト")
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
  },
}
</script>
