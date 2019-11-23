<template>
    <v-btn @click=confirmStandBy>
      confirm standby
    </v-btn>
</template>

<script>
import axios from 'axios'
import env from '@/assets/env.json'
export default {
  methods: {
    confirmStandBy(){
			if (localStorage.token == '' || localStorage.token == null){
				window.alert('This function needs login')
				return
			}
			let standbyData
			let standbyId
			let headers = {
					"headers":{
						"token": localStorage.token
					}
			}
			console.log(env.path.deleteStandByGame)
			axios
				.get(env.host+env.path.getStandByGame, headers)
				.then(response=>{
					standbyData = response.data
					console.log(standbyData.standById)
					this.$root.$data.gameId = standbyData.gameId
					standbyId = standbyData.standById
					console.log('standbyid is ' +  standbyId)
					console.log(env.path.deleteStandByGame)
					axios
						.delete(env.host+env.path.deleteStandByGame.replace('{standbyId}',standbyId),headers)
						.then(response=>{
							console.log(response)
						})
						.catch(function(error) {
							window.alert(error);
						})

					axios
						.get(env.host+env.path.getGameForPlayers.replace('{gameId}',this.$root.$data.gameId), headers)
						.then(response=>{
							this.$store.commit('updateGameInfo', response.data);
						})
						.catch(function(error) {
							window.alert(error);
						})
				})
				.catch(function(error) {
					window.alert(error);
				})
    }
  }
}
</script>