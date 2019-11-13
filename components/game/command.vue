<template>
  <v-card>
    <!-- TODO menu -->
    <v-list>
      <v-list-tile
        v-if="this.step === 3"
        @click="nextStep"
      >ターン終了</v-list-tile>
      <v-list-tile
        v-else
        @click="nextStep"
      >次のステップへ</v-list-tile>
      <v-list-tile
        v-if="
          this.canUse
          && this.step === 1
        "
        @click="chargeMana"
      >マナチャージ</v-list-tile>
      <v-list-tile
        v-if="
          this.canUse
          && this.step === 2
        "
        @click="summon"
      >召喚</v-list-tile>
      <v-list-tile
        v-if="
          this.canUse
          && this.step === 3
        "
        @click="attack"
      >攻撃</v-list-tile>
      <!-- <v-list-tile
        v-if="this.canUse"
        @click="useEffect"
      >効果発動</v-list-tile> -->
      <v-list-tile
        @click="updateField"
      >ゲーム更新</v-list-tile>
      <v-list-tile
        @click="cancel"
      >キャンセル</v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'
import env from '@/assets/env.json'

export default {
  props: [
    'step',
    'canUse',
    'X',
    'Y',
    'gameCardUId'
  ],
  data: function () {
    return {
    }
  },
  methods: {
    updateField(){
      let cm = this;
      let headers = {
          "headers":{
            "token": localStorage.token
          }
      };
      axios
        .get((env.host+env.path.getGameForPlayers).replace('{gameId}',cm.$root.$data.gameId), headers)
        .then(function(response){
          cm.$emit('setGameInfo',response.data)
        })
        .catch(function(error) {
          console.log(error);
        })
        cm.$emit('close-command');
    },

    async nextStep(){
      let cm = this;
      let requestData = {}
      let headers = {
          "headers":{
            "token": localStorage.token
          }
      }
      //console.log(headerData,headers)
      await axios
        .put(env.host+env.path.putGameStep.replace('{gameId}',cm.$root.$data.gameId),requestData,headers)
        .then(function(response){
          cm.$emit('setGameInfo',response.data)
        })
        .catch(error => {
          window.alert(error)
        })
      cm.$emit('close-command');
    },

    async chargeMana(){
      let cm = this;
      let requestData = {
        "handCardUid": cm.gameCardUId
      }
      let headers = {
          "headers":{
            "token": localStorage.token
          }
      }

      //console.log(headerData,headers)
      await axios
        .post(env.host+env.path.postManaCharge.replace('{gameId}',cm.$root.$data.gameId),requestData,headers)
        .then(function(response){
          cm.$emit('setGameInfo',response.data)
        })
        .catch(error => {
          window.alert(error)
        })
      cm.$emit('close-command');
    },

    summon(){
      window.alert("//TODO Implement POST for summonning");
      this.$emit('close-command');
    },

    attack(){
      window.alert("//TODO Implement POST for attacking");
      this.$emit('close-command');
    },

    useEffect(){
      window.alert("//TODO Implement POST for using effect");
      this.$emit('close-command');
    },

    cancel(){
      this.$emit('close-command');
    },
  },
}
</script>
