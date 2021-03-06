var validator = require('./core-validator');


//获取 0-num范围的随机整数
function getRandomNumForRange(num) {
  return Math.round(Math.random() * num);
}

// 6个牌，14是A，15是小2，16是小王，17是大王，type0是红桃，type1是方块，type2是黑桃，type3是草花
const originalCards = [
  { value: 3, type: 0 }, { value: 3, type: 1 }, { value: 3, type: 2 }, { value: 3, type: 3 },
  { value: 4, type: 0 }, { value: 4, type: 1 }, { value: 4, type: 2 }, { value: 4, type: 3 },
  { value: 5, type: 0 }, { value: 5, type: 1 }, { value: 5, type: 2 }, { value: 5, type: 3 },
  { value: 6, type: 0 }, { value: 6, type: 1 }, { value: 6, type: 2 }, { value: 6, type: 3 },
  { value: 7, type: 0 }, { value: 7, type: 1 }, { value: 7, type: 2 }, { value: 7, type: 3 },
  { value: 8, type: 0 }, { value: 8, type: 1 }, { value: 8, type: 2 }, { value: 8, type: 3 },
  { value: 9, type: 0 }, { value: 9, type: 1 }, { value: 9, type: 2 }, { value: 9, type: 3 },
  { value: 10, type: 0 }, { value: 10, type: 1 }, { value: 10, type: 2 }, { value: 10, type: 3 },
  { value: 11, type: 0 }, { value: 11, type: 1 }, { value: 11, type: 2 }, { value: 11, type: 3 },
  { value: 12, type: 0 }, { value: 12, type: 1 }, { value: 12, type: 2 }, { value: 12, type: 3 },
  { value: 13, type: 0 }, { value: 13, type: 1 }, { value: 13, type: 2 }, { value: 13, type: 3 },
  { value: 14, type: 0 }, { value: 14, type: 1 }, { value: 14, type: 2 }, { value: 14, type: 3 },
  { value: 15, type: 0 }, { value: 15, type: 1 }, { value: 15, type: 2 }, { value: 15, type: 3 },
  { value: 16, type: 0 },
  { value: 17, type: 0 },
  { value: 3, type: 0 }, { value: 3, type: 1 }, { value: 3, type: 2 }, { value: 3, type: 3 },
  { value: 4, type: 0 }, { value: 4, type: 1 }, { value: 4, type: 2 }, { value: 4, type: 3 },
  { value: 5, type: 0 }, { value: 5, type: 1 }, { value: 5, type: 2 }, { value: 5, type: 3 },
  { value: 6, type: 0 }, { value: 6, type: 1 }, { value: 6, type: 2 }, { value: 6, type: 3 },
  { value: 7, type: 0 }, { value: 7, type: 1 }, { value: 7, type: 2 }, { value: 7, type: 3 },
  { value: 8, type: 0 }, { value: 8, type: 1 }, { value: 8, type: 2 }, { value: 8, type: 3 },
  { value: 9, type: 0 }, { value: 9, type: 1 }, { value: 9, type: 2 }, { value: 9, type: 3 },
  { value: 10, type: 0 }, { value: 10, type: 1 }, { value: 10, type: 2 }, { value: 10, type: 3 },
  { value: 11, type: 0 }, { value: 11, type: 1 }, { value: 11, type: 2 }, { value: 11, type: 3 },
  { value: 12, type: 0 }, { value: 12, type: 1 }, { value: 12, type: 2 }, { value: 12, type: 3 },
  { value: 13, type: 0 }, { value: 13, type: 1 }, { value: 13, type: 2 }, { value: 13, type: 3 },
  { value: 14, type: 0 }, { value: 14, type: 1 }, { value: 14, type: 2 }, { value: 14, type: 3 },
  { value: 15, type: 0 }, { value: 15, type: 1 }, { value: 15, type: 2 }, { value: 15, type: 3 },
  { value: 16, type: 0 },
  { value: 17, type: 0 },
  { value: 3, type: 0 }, { value: 3, type: 1 }, { value: 3, type: 2 }, { value: 3, type: 3 },
  { value: 4, type: 0 }, { value: 4, type: 1 }, { value: 4, type: 2 }, { value: 4, type: 3 },
  { value: 5, type: 0 }, { value: 5, type: 1 }, { value: 5, type: 2 }, { value: 5, type: 3 },
  { value: 6, type: 0 }, { value: 6, type: 1 }, { value: 6, type: 2 }, { value: 6, type: 3 },
  { value: 7, type: 0 }, { value: 7, type: 1 }, { value: 7, type: 2 }, { value: 7, type: 3 },
  { value: 8, type: 0 }, { value: 8, type: 1 }, { value: 8, type: 2 }, { value: 8, type: 3 },
  { value: 9, type: 0 }, { value: 9, type: 1 }, { value: 9, type: 2 }, { value: 9, type: 3 },
  { value: 10, type: 0 }, { value: 10, type: 1 }, { value: 10, type: 2 }, { value: 10, type: 3 },
  { value: 11, type: 0 }, { value: 11, type: 1 }, { value: 11, type: 2 }, { value: 11, type: 3 },
  { value: 12, type: 0 }, { value: 12, type: 1 }, { value: 12, type: 2 }, { value: 12, type: 3 },
  { value: 13, type: 0 }, { value: 13, type: 1 }, { value: 13, type: 2 }, { value: 13, type: 3 },
  { value: 14, type: 0 }, { value: 14, type: 1 }, { value: 14, type: 2 }, { value: 14, type: 3 },
  { value: 15, type: 0 }, { value: 15, type: 1 }, { value: 15, type: 2 }, { value: 15, type: 3 },
  { value: 16, type: 0 },
  { value: 17, type: 0 },
  { value: 3, type: 0 }, { value: 3, type: 1 }, { value: 3, type: 2 }, { value: 3, type: 3 },
  { value: 4, type: 0 }, { value: 4, type: 1 }, { value: 4, type: 2 }, { value: 4, type: 3 },
  { value: 5, type: 0 }, { value: 5, type: 1 }, { value: 5, type: 2 }, { value: 5, type: 3 },
  { value: 6, type: 0 }, { value: 6, type: 1 }, { value: 6, type: 2 }, { value: 6, type: 3 },
  { value: 7, type: 0 }, { value: 7, type: 1 }, { value: 7, type: 2 }, { value: 7, type: 3 },
  { value: 8, type: 0 }, { value: 8, type: 1 }, { value: 8, type: 2 }, { value: 8, type: 3 },
  { value: 9, type: 0 }, { value: 9, type: 1 }, { value: 9, type: 2 }, { value: 9, type: 3 },
  { value: 10, type: 0 }, { value: 10, type: 1 }, { value: 10, type: 2 }, { value: 10, type: 3 },
  { value: 11, type: 0 }, { value: 11, type: 1 }, { value: 11, type: 2 }, { value: 11, type: 3 },
  { value: 12, type: 0 }, { value: 12, type: 1 }, { value: 12, type: 2 }, { value: 12, type: 3 },
  { value: 13, type: 0 }, { value: 13, type: 1 }, { value: 13, type: 2 }, { value: 13, type: 3 },
  { value: 14, type: 0 }, { value: 14, type: 1 }, { value: 14, type: 2 }, { value: 14, type: 3 },
  { value: 15, type: 0 }, { value: 15, type: 1 }, { value: 15, type: 2 }, { value: 15, type: 3 },
  { value: 16, type: 0 },
  { value: 17, type: 0 },
  { value: 3, type: 0 }, { value: 3, type: 1 }, { value: 3, type: 2 }, { value: 3, type: 3 },
  { value: 4, type: 0 }, { value: 4, type: 1 }, { value: 4, type: 2 }, { value: 4, type: 3 },
  { value: 5, type: 0 }, { value: 5, type: 1 }, { value: 5, type: 2 }, { value: 5, type: 3 },
  { value: 6, type: 0 }, { value: 6, type: 1 }, { value: 6, type: 2 }, { value: 6, type: 3 },
  { value: 7, type: 0 }, { value: 7, type: 1 }, { value: 7, type: 2 }, { value: 7, type: 3 },
  { value: 8, type: 0 }, { value: 8, type: 1 }, { value: 8, type: 2 }, { value: 8, type: 3 },
  { value: 9, type: 0 }, { value: 9, type: 1 }, { value: 9, type: 2 }, { value: 9, type: 3 },
  { value: 10, type: 0 }, { value: 10, type: 1 }, { value: 10, type: 2 }, { value: 10, type: 3 },
  { value: 11, type: 0 }, { value: 11, type: 1 }, { value: 11, type: 2 }, { value: 11, type: 3 },
  { value: 12, type: 0 }, { value: 12, type: 1 }, { value: 12, type: 2 }, { value: 12, type: 3 },
  { value: 13, type: 0 }, { value: 13, type: 1 }, { value: 13, type: 2 }, { value: 13, type: 3 },
  { value: 14, type: 0 }, { value: 14, type: 1 }, { value: 14, type: 2 }, { value: 14, type: 3 },
  { value: 15, type: 0 }, { value: 15, type: 1 }, { value: 15, type: 2 }, { value: 15, type: 3 },
  { value: 16, type: 0 },
  { value: 17, type: 0 },
  { value: 3, type: 0 }, { value: 3, type: 1 }, { value: 3, type: 2 }, { value: 3, type: 3 },
  { value: 4, type: 0 }, { value: 4, type: 1 }, { value: 4, type: 2 }, { value: 4, type: 3 },
  { value: 5, type: 0 }, { value: 5, type: 1 }, { value: 5, type: 2 }, { value: 5, type: 3 },
  { value: 6, type: 0 }, { value: 6, type: 1 }, { value: 6, type: 2 }, { value: 6, type: 3 },
  { value: 7, type: 0 }, { value: 7, type: 1 }, { value: 7, type: 2 }, { value: 7, type: 3 },
  { value: 8, type: 0 }, { value: 8, type: 1 }, { value: 8, type: 2 }, { value: 8, type: 3 },
  { value: 9, type: 0 }, { value: 9, type: 1 }, { value: 9, type: 2 }, { value: 9, type: 3 },
  { value: 10, type: 0 }, { value: 10, type: 1 }, { value: 10, type: 2 }, { value: 10, type: 3 },
  { value: 11, type: 0 }, { value: 11, type: 1 }, { value: 11, type: 2 }, { value: 11, type: 3 },
  { value: 12, type: 0 }, { value: 12, type: 1 }, { value: 12, type: 2 }, { value: 12, type: 3 },
  { value: 13, type: 0 }, { value: 13, type: 1 }, { value: 13, type: 2 }, { value: 13, type: 3 },
  { value: 14, type: 0 }, { value: 14, type: 1 }, { value: 14, type: 2 }, { value: 14, type: 3 },
  { value: 15, type: 0 }, { value: 15, type: 1 }, { value: 15, type: 2 }, { value: 15, type: 3 },
  { value: 16, type: 0 },
  { value: 17, type: 0 },
];


function Game() {
  this.contextCards = [];
  this.contextScore = [1, 2, 3];
  this.status = 0; // 0未开始 1叫分 2游戏中 3结束 4需要重发 5错误
  this.ratio = 1;// 分数翻倍数
  this.tmpFeng = 0;// 当前这一轮出分情况
  this.winner=[];// 胜利者
  this.loser=[];// 失败者
  this.lastCardInfo = {
    posId: '',
    len: 0,
    key: '',
    type: ''
  };
  this.contextPosId = '';
  this.userScore = {
    0: -1,
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
  };
  // 每个位置出了几次牌 
  this.sumCount = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  };
  // 每个位置抓分
  this.sumFeng = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  };

}
Object.assign(
  Game.prototype,
  {
    initCards() {
      var ret = [];
      var mCards = originalCards.slice(0);
      var maxIndex = mCards.length - 1;
      var c1 = getRandomNumForRange(1);
      var c2 = getRandomNumForRange(1);
      var c3 = getRandomNumForRange(1);
      var c4 = getRandomNumForRange(1);
      // 324张牌剩余4张牌，0,2随机多分一张，1和3随机分一张，4,6随机分一张，5,7随机分一张
      var last4Card = [c1,c2,1-c1,1-c2,c3,c4,1-c3,1-c4];
      for (var i = 0; i < 8; i++) {
        var group = [];
        // 红桃牌列表,红3到红k,大小王都算红桃
        var htGroup= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for (var j = 0; j < 40; j++) {
          var offset = getRandomNumForRange(maxIndex);
          group.push(mCards[offset]);
          // 如果是红桃
          if(mCards[offset].type===0){
            htGroup[mCards[offset].value-3]++;
          }
          mCards.splice(offset, 1);
          maxIndex--;
        }
        if(last4Card[i]===1){
          var offset = getRandomNumForRange(maxIndex);
          group.push(mCards[offset]);
          mCards.splice(offset, 1);
          maxIndex--;
        }
        group = group.sort(function (a, b) {
          // 从小到大
          return a.value-b.value ;
        });
        // console.log(htGroup);
        ret.push({ id: i, cards: group,ht:htGroup });
      }
      // ret.push({ id: 8, cards: mCards });
      this.contextCards = ret;
      return ret;
    },
    //验证牌型,压牌规则, posId座位号
    validate(posId, cards) {
      var int_cards = cards.map(function (card) {
        return card.value;
      });
      // 检查牌是否存在
      if (!this.checkExist(cards, posId)) {
        return { status: false };
      }
      // 出牌是否符合规则，只能出1张，2张，3张，炸弹
      var ret = validator(int_cards);
      if (!ret.status) {
        return {
          status: false
        }
      }
      // 当前为出牌人
      if (this.lastCardInfo.posId === posId) {
        return {
          status: true,
          key: ret.types[0].key,
          len: ret.len,
          type: ret.types[0].type
        }
      }

      for (let i = 0, len = ret.types.length; i < len; i++) {
        var type = ret.types[i].type;
        var key = ret.types[i].key;

        // 3个王处理,2N-1，大于所有5个的炸弹
        if(type=== "DKING3" || type ==="XKING3"){
          if(this.lastCardInfo.len <= 5){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }

        // 4个王处理,2N-1，大于所有7个的炸弹
        if(type=== "DKING4" || type ==="XKING4"){
          if(this.lastCardInfo.len <= 7){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }

        // 5个王处理,2N-1，大于所有9个的炸弹
        if(type=== "DKING5" || type ==="XKING5"){
          if(this.lastCardInfo.len <= 9){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }

        // 6个王处理,2N-1，大于所有11个的炸弹
        if(type=== "DKING6" || type ==="XKING6"){
          if(this.lastCardInfo.len <= 11){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }

        // 最后一个人出的是3王炸
        if(this.lastCardInfo.type === "DKING3" || this.lastCardInfo.type==="XKING3"){
          if(ret.len>5){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }
        // 最后一个人出的是4王炸
        if(this.lastCardInfo.type === "DKING4" || this.lastCardInfo.type==="XKING4"){
          if(ret.len>7){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }
        // 最后一个人出的是5王炸
        if(this.lastCardInfo.type === "DKING5" || this.lastCardInfo.type==="XKING5"){
          if(ret.len>9){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }
        // 最后一个人出的是6王炸
        if(this.lastCardInfo.type === "DKING6" || this.lastCardInfo.type==="XKING6"){
          if(ret.len>11){
            return {
              status: true,
              key,
              type,
              len: ret.len
            }
          }
        }

        // 炸弹长度越长就越大(排除王炸)
        if(ret.len > this.lastCardInfo.len && ret.len >=4 && key!==16 && key!=17){
          return {
            status: true,
            key,
            type,
            len: ret.len
          }
        }

        // 同长度的牌型，出牌的key都要大于最后的牌
        if (type === this.lastCardInfo.type && ret.len === this.lastCardInfo.len && key > this.lastCardInfo.key) {
          return {
            status: true,
            key,
            type,
            len: ret.len
          }
        }

      }
      return { status: false }
    },
    //检查牌是否存在，防客户端作弊
    checkExist(cards, posId) {
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var index = this.getCardIndexByPosId(card, posId);
        if (index === -1) {
          return false;
        }
      }
      return true;
    },
    // 统计出牌的分数
    sumCardsFeng(cards){
      let tmp = 0;
      for (var i = 0; i < cards.length; i++) {
        if(cards[i].value===5){
          tmp = tmp +5;
        }
        if(cards[i].value===10){
          tmp = tmp +10;
        }
        if(cards[i].value===13){
          tmp = tmp +10;
        }
      }
      return tmp;
    },
    // 出牌后移除牌
    removeCards(cards, posId) {
      var sourceCards = this.getCardsByPosId(posId);
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var index = this.getCardIndexByCards(card, sourceCards);
        if (index !== -1) {
          sourceCards.splice(index, 1);
        }
      }
    },
    // 返回每个位置的牌
    getCardsByPosId(posId) {
      for (var i = 0, len = this.contextCards.length; i < len; i++) {
        var item = this.contextCards[i];
        if (item.id === posId) {
          return item.cards;
        }
      }
      return [];
    },
    getCardIndexByPosId(card, posId) {
      var cards = this.getCardsByPosId(posId);
      for (var i = 0, len = cards.length; i < len; i++) {
        var curr = cards[i];
        if (curr.value === card.value && curr.type === card.type) {
          return i;
        }
      }
      return -1;
    },
    getCardIndexByCards(card, cards) {
      for (var i = 0, len = cards.length; i < len; i++) {
        var curr = cards[i];
        if (curr.value === card.value && curr.type === card.type) {
          return i;
        }
      }
      return -1;
    },
    getCards() {
      return this.contextCards;
    },
    init() {
      this.contextCards = [];
      this.contextScore = [1, 2, 3];
      this.status = 0; //0未开始 1叫分 2游戏中 3结束 4需要重发 5错误
      this.ratio = 1;// 倍数
      this.tmpFeng = 0;// 当前出牌分数
      this.winner=[];// 胜利者
      this.loser=[];// 失败者
      this.lastCardInfo = {
        posId: '',
        len: 0,
        key: '',
        type: ''
      };
      this.contextPosId = '';
      this.userScore = {
        0: -1,
        1: -1,
        2: -1,
        3: -1,
        4: -1,
        5: -1,
        6: -1,
        7: -1,
      };
      // 每个位置出了几次牌
      this.sumCount = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
      };
      // 每个位置抓分
      this.sumFeng = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
      };
      return this;
    },
    start() {
      this.status = 1;
      // 发牌
      this.initCards();
      // 谁先出牌
      this.whoFirst();
      return this;
    },
    whoFirst() {
      const tmp = this.getCards();
      let firstPosId = 0;
      for (var i = 1; i < 8; i++) {
        // 遍历所有的红桃，红桃3，红桃4
        for(var j = 0; j < 15; j++){
          if(tmp[i].ht[j] > tmp[firstPosId].ht[j]){
            firstPosId = i;
            break;
          }
          if(tmp[i].ht[j] === tmp[firstPosId].ht[j]){
            continue;
          }
          break;
        }
      }
      this.contextPosId =firstPosId;
      // 谁先出，谁报的分就是最高的，暂时先这么处理
      this.userScore[firstPosId]=3;
    },
    // 获取本轮分数
    getTmpFeng(){
      return this.tmpFeng;
    },
    // 根据位置，获取得分
    getSumFeng(){
      return this.sumFeng;
    },
    getStatus() {
      return this.status;
    },
    getContextPosId() {
      return this.contextPosId;
    },
    getContextScore() {
      return this.contextScore;
    },
    getMaxScoreInfo() {
      let score = 0;
      let posId = 0;
      for (var key in this.userScore) {
        if (this.userScore.hasOwnProperty(key)) {
          if (this.userScore[key] > score) {
            score = this.userScore[key];
            posId = Number(key);
          }
        }
      }
      return {
        score,
        posId
      }
    },
    getDiZhuPosId() {
      return this.getMaxScoreInfo().posId;
    },
    getCalledScores() {
      return this.userScore;
    },
    // 获取底牌，没有底牌
    getTopCards() {
      return [];
    },
    // 判断下个人轮到谁，因为存在出完牌的情况
    getNextPosId(posId){
      for (let i = 0; i < 7; i++){
        let nextId = (posId+1+i)%8;
        if(this.getCardsByPosId(nextId).length!==0){
          return nextId;
        }
        else{
          continue;
        }
      }
    },
    //判断下个队友轮到谁，最后出完牌大后让队友顺
    getNextGroupPosId(posId){
      if(posId === 0 || posId === 2 || posId === 4 || posId === 6){
        for (let i = 0; i < 3; i++){
          let nextId = (posId+2+2*i)%8;
          if(this.getCardsByPosId(nextId).length!==0){
            return nextId;
          }
          else{
            continue;
          }
        }
      }
      if(posId === 1 || posId === 3 || posId === 5 || posId === 7){
        for (let i = 0; i < 3; i++){
          let nextId = (posId+2+2*i)%8;
          if(this.getCardsByPosId(nextId).length!==0){
            return nextId;
          }
          else{
            continue;
          }
        }
      }
    },
    // 游戏结束
    isGameOver() {
      // 0,2,4,6的牌都打完了，跑胜利
      if (this.contextCards[0].cards.length===0 & this.contextCards[2].cards.length===0 & this.contextCards[4].cards.length===0 & this.contextCards[6].cards.length===0) {
        this.winner = [0,2,4,6];
        this.loser = [1,3,5,7];
        return true;
      }
      // 1,3,5,7的牌都打完了，跑胜利
      if (this.contextCards[1].cards.length===0 & this.contextCards[3].cards.length===0 & this.contextCards[5].cards.length===0 & this.contextCards[7].cards.length===0) {
        this.winner = [1,3,5,7];
        this.loser = [0,2,4,6];
        return true;
      }
      // 0,2,4,6打完牌的人分数合到300分，得分胜利
      // 1,3,5,7打完牌的人分数合到300分，得分胜利
      let shuangSum = 0;
      let danSum = 0;
      for (let i = 0; i < 8; i++) {
        if(i%2===0){
          if(this.contextCards[i].cards.length===0){
            shuangSum = shuangSum +this.sumFeng[i];
          }
        }
        if(i%2!==0){
          if(this.contextCards[i].cards.length===0){
            danSum = danSum +this.sumFeng[i];
          }
        }
      }
      if(shuangSum>=300){
        this.winner = [0,2,4,6];
        this.loser = [1,3,5,7];
        return true;
      }
      if(danSum>=300){
        this.winner = [1,3,5,7];
        this.loser = [0,2,4,6];
        return true;
      }
      return false;
    },
    // 获取结果
    getResult() {
      const scoreData = this.getMaxScoreInfo();// 默认3分
      var ret = {
        winner: this.winner,
        loser: this.loser,
        score: scoreData.score,
        ratio: this.ratio, //默认1倍
      };
      return ret;
    },
    next(posId, data) {
      // data出牌的内容
      // console.log(data);
      if (posId == this.contextPosId) {
        if (this.status === 1) {
          // this.userScore[posId] = data;
          const maxScoreInfo = this.getMaxScoreInfo();
          if (maxScoreInfo.score > 0) {
            this.status = 2;
            this.contextPosId = Number(maxScoreInfo.posId);
            this.lastCardInfo.posId = this.contextPosId;
          } else {
            //需要重新发牌，找不到先出牌的人
            this.status = 4;
          }
        } 
        else if (this.status === 2) {
          

          console.log("posId:"+posId);
          console.log(this.getCardsByPosId(posId));

          // 获取下一个出牌的人
          this.contextPosId = this.getNextPosId(posId);
          const { type, len, key, status } = this.validate(posId, data);
          if (status) {
            this.lastCardInfo.type = type
            this.lastCardInfo.len = len
            this.lastCardInfo.key = key;
            this.lastCardInfo.posId = posId;
            this.sumCount[posId]++;
          }
          this.removeCards(data, posId);

          console.log("posId:"+posId);
          console.log(this.getCardsByPosId(posId));


          this.tmpFeng =this.tmpFeng + this.sumCardsFeng(data);
          // 最后出牌的位置，又是当前位置，说明赢了一圈，将分数加给这个位置
          if(this.lastCardInfo.posId===this.contextPosId){
            this.sumFeng[this.lastCardInfo.posId]+=this.tmpFeng;
            this.tmpFeng = 0;
          }
          // 如果当前是最后的牌的话,找到队友出牌
          if(this.getCardsByPosId(posId).length===0){
            console.log("getNextGroupPosId");
            this.contextPosId = this.getNextGroupPosId(this.lastCardInfo.posId);
            // 相当于下个队友第一个出牌了
            this.lastCardInfo.posId = this.contextPosId;
          }

          //判断游戏是否结束
          if (this.isGameOver()) {
            this.status = 3;
          }
        }
      } 
      
      else {
        // 一般不会进来
        this.status = 5;
      }
      return this;
    }

  }

)

module.exports = Game;