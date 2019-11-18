<template>
    <v-btn>
      {{ this.$root.$data.mail }} gameID {{ this.$root.$data.gameId }}
    </v-btn>
</template>

<script>
import axios from 'axios'
import env from '@/assets/env.json'
export default {
  created () {
    console.log('Start mounted.....')
    console.log(localStorage.token)
    if (localStorage.token){
        console.log('token exist')
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
            this.$root.$data.id = response.data.id
          })
          .catch((err) => {
            console.log(err)
            localStorage.token =''
          })
    }
  }
}
</script>
