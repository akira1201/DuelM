<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-card :style="detailCardStyle">
          <v-img
            class="grey--text"
            height="500px"
            width="360px"
            v-bind:src="this.$store.state.detailInfo.card_img"
          />
          <v-card-title>
            <div>
              <span class="grey--text">{{this.$store.state.detailInfo.name}}</span><br>
              <span>コスト : {{this.$store.state.detailInfo.cost}}</span><br>
              <span>パワー : {{this.$store.state.detailInfo.power}}</span><br><br>
              <span style="white-space: pre-line">{{this.$store.state.detailInfo.text}}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
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
}
</script>
