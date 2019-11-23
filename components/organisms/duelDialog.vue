<template>
  <v-layout justify-center>
    <v-dialog dark v-model="dialog" persistent width="initial" max-width="80%">
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          {{this.dialogInfo.message}}
        </v-card-title>
        <v-slide-group multiple show-arrows :max="this.dialogInfo.maxChoose">
          <v-slide-item
            v-for="dialogCard in this.dialogInfo.cards"
            :key="dialogCard"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              @click="toggle"
            >
              <dialogCards
                :isSelected="active ? true : false"
                class="cardMaterial"
                :id="dialogCard.gameCardUId"
                :cardId="dialogCard.cardId"
                :gameCardUId="dialogCard.gameCardUId"
                :isTapped="dialogCard.isTapped"
                ref="dialogCard"
              />
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="sendChoice"
          >
            決定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'
import dialogCards from '../atoms/dialogCard.vue'
import env from '@/assets/env.json'

export default {
  components:{
    dialogCards,
  },
  props: [
    'dialogInfo',
    'dialog'
  ],
  data() {
    return {
      choosing: 0,
    };
  },
  methods: {
    sendChoice(){
      let cm = this;
      const choosenList = this.getChoosenList();
      if (choosenList.length < this.dialogInfo.minChoose){
        window.alert(this.dialogInfo.minChoose+"枚以上選んでね");
      }
      else if (this.dialogInfo.maxChoose < choosenList.length){
        window.alert(this.dialogInfo.minChoose+"枚以下で選んでね");
      }
      else {
        if(this.dialogInfo.scene){
          let headers = {
              "headers":{
                "token": localStorage.token
              }
          }
          let requestData = {
              "handCardUid": this.dialogInfo.actionCard,
              "manaCardUids": choosenList
          }
          axios
            .post(env.host+env.path.postCreature.replace('{gameId}', this.$root.$data.gameId),requestData,headers)
            .then(function(response){
              cm.$store.commit('updateGameInfo', response.data);
              cm.$store.commit('resetDialogInfo');
            })
            .catch(error => {
              window.alert(error)
            })
        }
      }
    },
    getChoosenList(){
      let choosenList = [];
      this.$refs.dialogCard.forEach(c => {
        if(c.isSelected == true){
          choosenList.push(c.gameCardUId);
        }
      })
      return choosenList;
    },
  }
}
</script>

<style>
.dialogDetail{
  overflow-x: scroll;
  margin:24px;
}
.dialogDetail::-webkit-scrollbar{
  display:none;
}
</style>