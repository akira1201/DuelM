<template>
<v-dialog v-model="show" max-width="500px">
  <v-card>
    <v-card-actions>
      <input class="input" v-model="authName" placeholder="name">
      <input class="input" v-model="authMail" placeholder="mail">
      <input class="input" v-model="authPassword" placeholder="password">
      <v-btn color="primary" flat @click="callSingUp">Submit</v-btn>
      <v-btn color="primary" flat @click.stop="show=false">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: {
     value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  },
  methods: {
    callSingUp(){
      let headerData = {
          "name": this.authName,
          "mail": this.authMail,
          "password": this.authPassword
      }
      //console.log(headerData,headers)
      axios
        .post('/dev/auth/signup',headerData)
        .then()
        .catch(function(error) {
          window.alert(error)
        });
    },
  }
}


</script>