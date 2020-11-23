
function getPoint(cnt){
  cnt = {
    point : cnt.filter((data) => data.answer === true).length,
    speed : Math.floor(cnt.map(data => (data.answer && data.speed)).reduce((acc,cur) => (acc + cur)) / cnt.length)
  }
  return cnt
}

function getGameList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("wait 0.1 sec.")
      const list = [
        {second: 10, text: "hello"},
        {second: 10, text: "world"},
        {second: 8, text: "this"},
        {second: 3, text: "is"},
        {second: 15, text: "kakaopay"},
        {second: 5, text: "we"},
        {second: 5, text: "are"},
        {second: 15, text: "kakaopay"},
        {second: 15, text: "frontend"},
        {second: 20, text: "developers"},
        {second: 15, text: "join"},
        {second: 10, text: "us"}
      ]
      resolve(list)
    }, 100)
  })
}

function startGame(){
  const startBtn = document.createElement('button')
  const inputTxt = document.createElement('input')
  startBtn.setAttribute('class','start_btn')
  if(startBtn.classList.contains('start_btn')){
    inputTxt.placeholder = ""
    // getGameList()
    startBtn.className = 'reset_btn'
    startBtn.innerHTML='초기화'
  }else {
    resetGame()
  }
}

function resetGame(){
  const startBtn = document.createElement('button')
  const gameWord = document.createElement('h2')
  const pointTxt = document.createElement('span') 
  const timerTxt = document.createElement('span')
  startBtn.className = 'start_btn'
  startBtn.innerHTML='시작'
  gameWord.innerHTML = '문제 단어'
  pointTxt.innerHTML = ''
  timerTxt.innerHTML = ''
  stopTimer(timerShow)
}

function displayGame(list = [],count = []){
  const showList = list.slice(count,count+1)
  const point = count.filter(data => { data.answer === true})
  let obj ={}
  showList.map(data => {
    return (
      obj = {
        text : data.text,
        second : data.second,
        point : point.length
      }
    )
  })
  return obj
}

function timerChk(list=[]){
  const item = list.find(data => (data))
  let chkZero = false
  setInterval(() => {
    item.second--
    if(item.second === 0) {
      chkZero = true
    }
    return chkZero
  },item.second)
}

export { getPoint, getGameList, startGame, resetGame, displayGame, timerChk }