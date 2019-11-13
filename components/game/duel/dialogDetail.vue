<template>
  <v-layout align-center>
    <v-content v-for="item in dialogInfo.cards" :key="item" :style="cardStyle">
      <dialogCards
        class="cardMaterial"
        :id="item.gameCardUId"
        :cardId="item.cardId"
        :gameCardUId="item.gameCardUId"
        :isTapped="item.isTapped"
        @chooseCard="chooseCard"
        ref="dialogCard"
      />
    </v-content>
  </v-layout>
</template>

<script>
import dialogCards from './dialogCard.vue'
export default {
  components:{
    dialogCards,
  },
  props: [
  ],
  data() {
    return {
      dialog: false,
      dialogInfo: {},
      choosing:0,
    };
  },
  created:{
    logout(){
      window.alert(this.dialogInfo.minChoose);
      window.alert(this.dialogInfo.maxChoose);
      window.alert(this.choosing);
    }
  },
  computed:{
    cardStyle(){
      return {
        'padding': '32px 16px'
      }
    },
  },
  methods: {
    chooseCard(event){
      //TODO refactoring
      //TODO add validation
      this.$refs.dialogCard.forEach(c => {
        if(c.gameCardUId == event.currentTarget.id){
          if(c.isSelected == true){
            c.isSelected = false;
            exit;
          }
        }
      });
      let selected = 0;
      this.$refs.dialogCard.forEach(c => {
        if(c.isSelected){
          selected++;
        }
      });
      if(selected<this.dialogInfo.maxChoose){
        this.$refs.dialogCard.forEach(c => {
          if(c.gameCardUId == event.currentTarget.id){
            c.isSelected = true;
          }
        });
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
