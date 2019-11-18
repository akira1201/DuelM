export const state = () => ({
    gameInfo:{
        currentTurn:"",
        step:1,
        myZone:{},
        enemyZone:{},
    },
    detailInfo:{
        card_img:require('@/assets/cards/card_back.png'),
        name:"",
        cost:0,
        power:0,
        text:"",
      },
    commandInfo:{
        isShown:false,
        canUse:false,
        commandX:0,
        commandY:0,
        gameCardUId:""
    },
    dialogInfo: {
        isShown:false,
        scene: 0,
        minChoose: 0,
        maxChoose: 0,
        message: "message",
        cards: []
    },
    loginInfo: null
  })
  
export const mutations = {
    login(state, user) {
        state.user = user;
    },
    updateGameInfo(state, gameInfo) {
        state.gameInfo = gameInfo;
    },
    updateCommandInfo(state, commandInfo) {
        state.commandInfo = commandInfo;
    },
    updateDialogInfo(state, dialogInfo) {
        state.dialogInfo = dialogInfo;
    },
    updateDetailInfo(state, detailInfo) {
        state.detailInfo = detailInfo
    },
}
