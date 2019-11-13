<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-card :style="detailCardStyle">
          <v-img
            class="grey--text"
            height="500px"
            width="360px"
            v-bind:src="card_img"
          />
          <v-card-title>
            <div>
              <span class="grey--text">{{name}}</span><br>
              <span>コスト : {{cost}}</span><br>
              <span>パワー : {{power}}</span><br><br>
              <span style="white-space: pre-line">{{text}}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: function () {
    return {
      card_img:require('@/assets/cards/card_back.png'),
      name:"",
      cost:0,
      power:0,
      text:"",
    }
  },
  computed: {
    detailCardStyle(){
      return{
        //TODO windiwサイズに合わせてオブジェクトのサイズを動的にしてあげる？
        'height':"800px",
        'width':"360px",
        'position':'fixed',
        'bottom':'64px'
      }
    },
  },
  methods: {
    showDetail: function (card) {
      this.card_img = require('@/assets/cards/card_front.png')
      this.name = card.name
      this.cost = card.cost
      this.power = card.power
      this.text = card.text
    }
  }
}
</script>
