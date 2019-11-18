<template>
<v-dialog v-model="show" max-width="500px">
  <template v-slot:activator="{ on }">
    <v-btn v-on="on">
      signin
    </v-btn>
  </template>
  <v-card>
    <v-card-actions>
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
import env from '@/assets/env.json'
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
      let requestData = {    
          "mail": this.authMail,
          "password": this.authPassword
      }
      console.log(this.$parent)
      //console.log(headerData,headers)
      axios
        .post(env.host+env.path.signin,requestData)
        .then((response) => {
          console.log(response)
          localStorage.token = response.headers.token
          let headers = {
            "headers":{
              "token": localStorage.token
            }
          }
          axios
            .post(env.host+env.path.getUser,{},headers)
            .then((response) => {
              console.log(response)
              this.$root.$data.name = response.data.name
              this.$root.$data.mail = response.data.mail
            })
        })
        .catch(function(error) {
          window.alert(error)
        });
    }
  }
}


</script>