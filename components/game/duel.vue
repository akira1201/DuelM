<template>
  <v-content class="py-0">
    <v-container class="py-0">
      <v-layout column justify-center align-center style="transform:rotate(180deg)">
        <!-- TODO DRY -->
        <v-layout justify-center align-center>
          <v-flex v-for="item in enemyZone.fieldCardsStatuses" :key="item">
            <card
              width="100%"
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'enemyField'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center>
          <v-flex v-for="item in enemyZone.shieldCards" :key="item">
            <card
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'enemyField'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center>
          <v-flex v-for="item in enemyZone.manaCardsStatuses" :key="item">
            <card
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'enemyMana'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center class="pt-5">
          <v-flex v-for="item in enemyZone.handCards" :key="item">
            <card
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'enemyHand'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container fluid class="pt-5">
      <v-layout column justify-center align-center>
        <v-layout justify-center align-center>
          <v-flex v-for="item in myZone.fieldCardsStatuses" :key="item">
            <card
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'myField'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center>
          <v-flex v-for="item in myZone.shieldCards" :key="item">
            <card
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'myShield'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center>
          <v-flex v-for="item in myZone.manaCardsStatuses" :key="item">
            <card
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'myMana'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center class="pt-5">
          <v-flex v-for="item in myZone.handCards" :key="item">
            <card
              class="cardMaterial"
              :gameCardUId="item.gameCardUId"
              :cardId="item.cardId"
              :zone="'myHand'"
              :isTapped="item.isTapped"
              :canUse="item.canUse"
              @showDetail="showDetail"
              @show-command="showCommand"
              @closeCommand="closeCommand"
              ref="card"
            />
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import card from './duel/card.vue'

export default {
  components: {
    card,
  },
  props: [
    'myZone',
    'enemyZone',
  ],
  data: function () {
    return {
      gameId: null,
    }
  },
  methods: {
    showDetail(card){
      this.$emit('showDetail', card);
      this.$refs.card.forEach(c => {
        c.unshownDetail();
      });
    },
    showCommand(commandInfo){
      this.$emit('show-command',commandInfo);
    },
    closeCommand(){
      this.commandInfo.isShown=false;
    },
  },
}
</script>
