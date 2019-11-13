<template>
  <v-content class="py-0">
    <v-container class="py-1 px-2">
      <v-layout
        justify-center
        align-center
      >
        <v-card
        class="dialogCard"
        :class="{ selected: isSelected }"
        :style="cardStyle"
          height="240px"
          width="180"
          :id="this.gameCardUId"
          @click.left="chooseCard"
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
    'isTapped',
  ],
  data: function () {
    return {
      isSelected: false,
      cardImg: getCardImg(this.cardId),
    };
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
        'transform': rotateDeg,
      };
    },
  },
  methods: {
    chooseCard(event){
      this.$emit('chooseCard',event);
    },
  },
}
</script>

<style>
.dialogCard.selected {
  border: solid 8px red;
}
.dialogCard:not(.selected){
  padding: 8px;
  border: 0;
}
</style>
