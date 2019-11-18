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
			console.log(env.urls.deleteStandBy)
			axios
				.get(env.host+env.path.getStandByGame, headers)//axios.getの場合は 第二引数にheadersを詰めるらしい
				.then(response=>{
					standbyData = response.data
					console.log(standbyData.standById)
					this.$root.$data.gameId = standbyData.gameId
					standbyId = standbyData.standById
					console.log('standbyid is ' +  standbyId)
					console.log(env.urls.deleteStandBy)
					//Delete queue
					axios
						.delete(env.host+env.path.deleteStandByGame.replace('{standbyId}',standbyId),headers)//axios.deleteは getと同じく 第二引数にheadersを詰めるらしい
						.then(response=>{
							console.log(response)
						})
						.catch(function(error) {
							window.alert(error);
						})

					//Fetch game data 
					axios
						.get(env.host+env.path.getGameForPlayers.replace('{gameId}',this.$root.$data.gameId), headers)//axios.getの場合は 第二引数にheadersを詰めるらしい
						.then(response=>{
							window.alert('New game detect ' + this.$root.$data.gameId)
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