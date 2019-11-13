<template>
  <v-layout justify-center>
    <v-dialog dark v-model="dialog" persistent scrollable width="initial" max-width="80%">
      <template v-slot:activator="{ on }">
        <v-btn hidden ref="dialogActivator" color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          {{dialogInfo.message}}
        </v-card-title>

        <dialogDetail ref="dialogDetail" class="dialogDetail"></dialogDetail>

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
import dialogDetail from './dialogDetail.vue'
export default {
  components:{
    dialogDetail,
  },
  props: [
  ],
  data() {
    return {
      dialog: false,
      dialogInfo: {},
    };
  },
  computed:{
  },
  methods: {
    showDialog(event,dialogInfo){
      this.dialogInfo = dialogInfo;
      this.$refs.dialogDetail.dialogInfo = dialogInfo;
      this.$refs.dialogActivator.click(event);
    },
    sendChoice(){
      const choosenList = this.$refs.dialogDetail.getChoosenList();
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