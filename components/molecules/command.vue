<template>
  <v-card>
    <!-- TODO menu -->
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-if="this.step === 3"
          @click="nextStep"
        >ターン終了</v-list-item>
        <v-list-item
          v-else
          @click="nextStep"
        >次のステップへ</v-list-item>
        <v-list-item
          v-if="
            this.$store.state.commandInfo.canUse
            && this.$store.state.gameInfo.step === 1
          "
          @click="chargeMana"
        >マナチャージ</v-list-item>
        <v-list-item
          v-if="
            this.$store.state.commandInfo.canUse
            && this.$store.state.gameInfo.step === 2
          "
          @click="summon"
        >召喚</v-list-item>
        <v-list-item
          v-if="
            this.$store.state.commandInfo.canUse
            && this.$store.state.gameInfo.step === 3
          "
          @click="attack"
        >攻撃</v-list-item>
        <!-- <v-list-item
          v-if="this.canUse"
          @click="useEffect"
        >効果発動</v-list-item> -->
        <v-list-item
          @click="updateField"
        >ゲーム更新</v-list-item>
        <v-list-item
          @click="cancel"
        >キャンセル</v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'
import env from '@/assets/env.json'

export default {
  props: [
    'commandInfo'
  ],
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
          cm.$store.commit('updateGameInfo', response.data);
        })
        .catch(function(error) {
          console.log(error);
        })
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
          cm.$store.commit('updateGameInfo', response.data);
        })
        .catch(error => {
          window.alert(error)
        })
    },

    async chargeMana(){
      let cm = this;
      let requestData = {
        "handCardUid": cm.$store.state.commandInfo.gameCardUId
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
          cm.$store.commit('updateGameInfo', response.data);
        })
        .catch(error => {
          window.alert(error)
        })
    },

    async summon(){
      let cm = this;
      let headers;
      headers = {
					"headers":{
						"token": localStorage.token
					}
      }
      let cardInfo;
      await axios
        .get(env.host+env.path.getCard.replace('{cardId}',cm.$store.state.commandInfo.cardId),headers)
        .then(function(response){
          cardInfo = response.data;
        })
        .catch(error => {
          window.alert(error)
        })
      const dialogInfo = {
          isShown:true,
          scene: 1,
          minChoose: cardInfo.mana_cost,
          maxChoose: cardInfo.mana_cost,
          message: "タップするカードを選んでください。",
          actionCard: this.$store.state.commandInfo.gameCardUId
      }
      cm.$emit('openDialog',dialogInfo);
    },

    attack(){
      window.alert("//TODO Implement POST for attacking");
    },

    useEffect(){
      window.alert("//TODO Implement POST for using effect");
    },

    cancel(){
    },
  },
}
</script>
