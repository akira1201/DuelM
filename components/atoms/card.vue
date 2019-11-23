<template>
  <v-layout
    class="card"
    :class="{ shown: isShown }"
    :style="cardStyle"
  >
    <v-card
      height="120px"
      width="90"
      @click.prevent="setDetailInfo"
      @click.right.prevent="setCommandInfo"
    >
      <v-img
        class="grey--text"
        height="100%"
        v-bind:src="cardImg"
      />
    </v-card>
  </v-layout>
</template>

<script>
function getCardImg(cardId){
  if (cardId === undefined){
    return require('@/assets/cards/card_back.png')
  } else {
    return require('@/assets/cards/card_front.png')
  }
}
export default {
  props: [
    'cardId',
    'gameCardUId',
    'zone',
    'isTapped',
    "canUse",
    "isShown",
  ],
  data: function () {
    return {
      cardImg: getCardImg(this.cardId),
    }
  },
  computed:{
    cardStyle(){
      var rotateDeg;
      if(this.isTapped){
        rotateDeg = 'rotate(90deg)'
      } else {
        rotateDeg = ''
      }
      return {
        'z-index': 10,
        'transform': rotateDeg,
      }
    },
  },
  methods: {
    setCommandInfo(){
      this.setDetailInfo();
      this.$store.commit('updateCommandInfo', {
        isShown:true,
        canUse:this.canUse,
        gameCardUId:this.gameCardUId,
        cardId:this.cardId
      });
    },
    setDetailInfo(){
      if(this.cardId){
        this.$store.commit('updateDetailInfo', {
          card_img:require('@/assets/cards/card_front.png')
        });
      }else{
        this.$store.commit('updateDetailInfo', {
          card_img:require('@/assets/cards/card_back.png')
        });
      }
    },
  },
}
</script>

<style>
.card.shown {
  border: solid 4px red;
}
.card:not(.shown){
  margin:"4px";
  border: 0;
}
</style>
