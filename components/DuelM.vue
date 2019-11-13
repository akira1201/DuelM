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
      <newGameButton
        @setGameInfo="setGameInfo"
      ></newGameButton>
      <mypageModal></mypageModal>
      <defaultNewGameButton
        @setGameInfo="setGameInfo"
      ></defaultNewGameButton>
    </v-toolbar>
    <v-content class="py-0">
      <v-container fluid fill-height @click.right.prevent="showCommand" @click="closeCommand">
        <v-layout column justify-center align-center>
          <detail ref="detail"/>
        </v-layout>
        <v-layout column justify-center align-center>
          <duel
            ref="duel"
            :myZone="gameInfo.myZone"
            :enemyZone="gameInfo.enemyZone"
            @showDetail="showDetail"
            @show-command="showCommand"
          />
        </v-layout>
        <!-- <v-layout column justify-center align-center> -->
          <!-- <chatter/> -->
        <!-- </v-layout> -->
      </v-container>
    </v-content>
    <duelDialog
      ref="duelDialog"
    ></duelDialog>
    <command
      v-if="commandInfo.isShown"
      :style="commandStyle"
      :step="gameInfo.step"
      :canUse="commandInfo.canUse"
      :gameCardUId="commandInfo.gameCardUId"
      @close-command="closeCommand"
      @show-command="showCommand"
      @setGameInfo="setGameInfo"
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
      gameInfo:{
        currentTurn:"",
        step:1,
        myZone:{},
        enemyZone:{},
      },
      commandInfo:{
        isShown:false,
        canUse:false,
        commandX:0,
        commandY:0,
        gameCardUId:""
      },
      dialogInfo: {},
      loginInfo: this.$root.$data
    }
  },
  mounted: async function () {
  },
  computed:{
    isLoggin(){
      if(this.loginInfo=='true'){
        return true
      } else {
        return false;
      }
    },
    player(){
      if(this.gameInfo.currentTurn==localStorage.myId){
        return "Your Turn";
      } else {
        return "Enemy's Turn";
      }
    },
    gamePhase(){
      switch(this.gameInfo.step){
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
    commandStyle(){
      return {
        'z-index': 20,
        'position': 'absolute',
        'left': this.commandInfo.commandX+"px",
        'top': this.commandInfo.commandY+"px",
      }
    },
  },
  methods: {
    setGameInfo(gameInfo){
      this.gameInfo=gameInfo
    },
    updateField(data){
      this.$refs.duel.items=data
    },
    showDetail(card){
      this.$refs.detail.showDetail(card)
    },
    surrender(){
      window.alert("TODO impl 降参")
    },
    openDialog(event){
      this.dialogInfo = dialogInfo;
      this.$refs.duelDialog.showDialog(event,this.dialogInfo)
    },
    transition(){
      window.alert("TODO impl 次のステップリクエスト")
    },
    showCommand(event){
      this.commandInfo.isShown=true;
      this.commandInfo.commandX=event.pageX;
      this.commandInfo.commandY=event.pageY
      if(event.isCardSelected==true){
        this.commandInfo.canUse=event.canUse;
        this.commandInfo.gameCardUId=event.gameCardUId;
      }
    },
    closeCommand(){
      this.commandInfo.isShown=false;
    },
  },
}
</script>
