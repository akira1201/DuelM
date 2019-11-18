<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left ref="duelToolbar">
      <v-menu left>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            @click="surrender"
          >降参</v-list-tile>
          <v-list-tile
            @click="openDialog"
          >ダイアログテスト</v-list-tile>
          <confirmStanbyButton></confirmStanbyButton>
        </v-list>
      </v-menu>
      <v-toolbar-title>DM</v-toolbar-title>
      <v-toolbar-title>{{player}} - {{gamePhase}}</v-toolbar-title>
      <singupButton></singupButton>
      <singinButton></singinButton>
      <newGameButton></newGameButton>
      <mypageModal></mypageModal>
      <defaultNewGameButton></defaultNewGameButton>
    </v-toolbar>
    <v-content class="py-0">
      <v-container fluid fill-height @click.right.prevent="showCommand" @click="closeCommand">
        <v-layout column justify-center align-center>
          <detail ref="detail"/>
        </v-layout>
        <v-layout column justify-center align-center>
          <duel
            ref="duel"
          />
        </v-layout>
      </v-container>
    </v-content>
    <duelDialog></duelDialog>
    <command
      v-if="this.$store.state.commandInfo.isShown"
      @show-command="showCommand"
    ></command>
    <v-footer app fixed>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import detail from './game/detail.vue'
import duel from './game/duel.vue'
// import chatter from './game/chatter.vue'
import duelDialog from './game/duel/duelDialog.vue'
import command from './game/command.vue'
import singupButton from './auth/singupButton.vue'
import singinButton from './auth/singinButton.vue'
import newGameButton from './manage/newGameButton.vue'
import defaultNewGameButton from './manage/defaultNewGameButton.vue'
import confirmStanbyButton from './manage/confirmStanbyButton.vue'
import mypageModal from './auth/mypageModal.vue'
import env from '@/assets/env.json'
import dialogInfo from '@/assets/dialogInfo.json'

export default {
  components: {
    detail,
    duel,
    // chatter,
    duelDialog,
    command,
    singupButton,
    singinButton,
    mypageModal,
    newGameButton,
    confirmStanbyButton,
    defaultNewGameButton
  },
  data: function () {
    return {
    }
  },
  mounted: async function () {
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
