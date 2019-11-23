<template>
  <v-item-group class="py-0">
    <v-container class="py-0">
      <v-layout column justify-center align-center style="transform:rotate(180deg)">
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.enemyZone.fieldCardsStatuses"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.enemyZone.shieldCards"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.enemyZone.manaCardsStatuses"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.enemyZone.handCards"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-layout>
      <v-layout column justify-center align-center>
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.myZone.fieldCardsStatuses"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.myZone.shieldCards"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.myZone.manaCardsStatuses"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in this.$store.state.gameInfo.myZone.handCards"
            :key="item"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                @click="toggle"
              >
                <card
                  :isShown="active ? true : false"
                  class="cardMaterial"
                  :gameCardUId="item.gameCardUId"
                  :cardId="item.cardId"
                  :zone="'enemyField'"
                  :isTapped="item.isTapped"
                  :canUse="item.canUse"
                  ref="card"
                />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
    <command
      v-if="this.$store.state.commandInfo.isShown"
      :cmmandInfo="this.$store.state.commandInfo"
      @openDialog="openDialog"
    ></command>
  </v-item-group>
</template>

<script>
import card from '../atoms/card.vue'
import command from '../molecules/command.vue'

export default {
  components: {
    card,
    command,
  },
  data: function () {
    return {
      gameId: null,
    }
  },
  methods: {
    openDialog(dialogInfo){
      if(dialogInfo.scene == 1){
        // マナ選択
        dialogInfo.cards = this.$store.state.gameInfo.myZone.manaCardsStatuses;
      }else if (dialogInfo.scene == 2){
        // 攻撃対象選択
        if (this.$store.state.gameInfo.enemyZone.fieldCardsStatuses.length != 0){
          dialogInfo.cards = this.$store.state.gameInfo.enemyZone.fieldCardsStatuses;
        } else {
          dialogInfo.cards = this.$store.state.gameInfo.enemyZone.fieldCardsStatuses;
        }
      }else{
            dialogInfo.cards = {};
      }
      this.$store.commit('updateDialogInfo', dialogInfo);
    }
  }
}
</script>
