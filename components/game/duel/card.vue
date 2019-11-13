<template>
  <v-content class="py-0">
    <v-container class="py-1 px-2">
      <v-layout
        class="card"
        :class="{ shown: isShown }"
        :style="cardStyle"
        justify-center
        align-center
      >
        <v-card
          height="120px"
          width="90"
          @click.left="showDetail"
          @click.right.prevent="setCommandInfo"
        >
          <v-img
            class="grey--text"
            height="100%"
            v-bind:src="cardImg"
            >
          </v-img>
        </v-card>
      </v-layout>
    </v-container>
  </v-content>
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
  components: {
  },
  props: [
    'cardId',
    'gameCardUId',
    'zone',
    'isTapped',
    "canUse",
  ],
  data: function () {
    return {
      cardImg: getCardImg(this.cardId),
      isShown: false,
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
    showDetail(){
      if(typeof this.cardId!==undefined){
        this.$emit('showDetail', this);
        this.isShown=true;
      }
    },
    unshownDetail(){
      this.isShown=false;
    },
    showCommand(){
      this.$emit('show-command', this.commandInfo);
    },
    setCommandInfo(){
      if(typeof this.cardId!==undefined){
        this.$emit('showDetail', this);
        this.isShown=true;
      }

      let commandCanUse
      switch(this.zone){
        case('myHand'):
          if(this.canUse){
            commandCanUse = true;
          }
          break;
        case('myField'):
          if(this.canUse){
            commandCanUse = true;
          }
          break;
      }
      let commandInfo = {
        "isCardSelected":true,
        "canUse":commandCanUse,
        "gameCardUId":this.gameCardUId
      }
      this.$emit('show-command',commandInfo);
    },
  },
}
</script>

<style>
.card.shown {
  border: solid 4px red;
}
.card:not(.shown){
  padding: 4px;
  border: 0;
}
</style>
