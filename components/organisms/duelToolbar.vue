<template>
  <v-toolbar>
    <v-menu left>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="surrender">
          <v-list-item-content>
            <v-list-item-title>降参</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openDialog">
          <v-list-item-content>
            <v-list-item-title>ダイアログテスト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <confirmStanbyButton></confirmStanbyButton>
      </v-list>
    </v-menu>
    <v-toolbar-title>DM</v-toolbar-title>
    <v-toolbar-title>{{player}} - {{gamePhase}}</v-toolbar-title>
    <singupDialog></singupDialog>
    <singinDialog></singinDialog>
    <newGameDialog></newGameDialog>
    <defaultNewGameDialog></defaultNewGameDialog>
    <mypageModal></mypageModal>
  </v-toolbar>
</template>

<script>
import axios from 'axios'
import singupDialog from '../molecules/singupDialog.vue'
import singinDialog from '../molecules/singinDialog.vue'
import newGameDialog from '../molecules/newGameDialog.vue'
import defaultNewGameDialog from '../molecules/defaultNewGameDialog.vue'
import confirmStanbyButton from '../atoms/confirmStanbyButton.vue'
import mypageModal from '../molecules/mypageModal.vue'
import env from '@/assets/env.json'
import dialogInfo from '@/assets/dialogInfo.json'

export default {
  components: {
    singupDialog,
    singinDialog,
    mypageModal,
    newGameDialog,
    confirmStanbyButton,
    defaultNewGameDialog
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
    openDialog(){
      this.$store.commit('updateDialogInfo', dialogInfo);
    },
  },
}
</script>
