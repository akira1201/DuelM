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
import dialogCards from '../atoms/dialogCard.vue'

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
      const choosenList = this.getChoosenList();
      if (choosenList.length < this.dialogInfo.minChoose){
        window.alert(this.dialogInfo.minChoose+"枚以上選んでね");
      }
      else if (this.dialogInfo.maxChoose < choosenList.length){
        window.alert(this.dialogInfo.minChoose+"枚以下で選んでね");
      }
      else {
        this.dialog = false;
      }
    },
    getChoosenList(){
      let choosenList = [];
      this.$refs.dialogCard.forEach(c => {
        if(c.isSelected == true){
          choosenList.push(c.cardId);
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