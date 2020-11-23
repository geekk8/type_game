import './styles/main.css'

//기본 엘리멘터들 입니다.
const pointTxt = document.querySelector('.point')
const timerTxt = document.querySelector('.timer')
const gameWord = document.querySelector('.game_word')
const startBtn = document.querySelector('.start_btn')
const inputTxt = document.querySelector('.input_txt')
const appWrap = document.querySelector('#app')

//이벤트들 입니다.
startBtn.addEventListener('click',startGame)
inputTxt.addEventListener('keyup',submitWord)
window.addEventListener('popstate', routing)

//전역변수들 입니다.
let cnt = []
let defaultTime = 0;
let timerShow;

//라우트변수 입니다.
const routes = [
  {
    url: '', callback: function () {
    }
  }
];

//제공해주는 api를 통신해 데이터를 가져옵니다.
function getGameList(){
  const API_URL = `https://my-json-server.typicode.com/kakaopay-fe/resources/words`
  return fetch(API_URL).then(res => {
    return res.json()
  }).then(data => {
    displayGame(data)
  }).catch((error) => console.log("error!", error))
}

//게임 리셋 함수입니다.
function resetGame(){
  startBtn.className = 'start_btn'
  startBtn.innerHTML='시작'
  gameWord.innerHTML = '문제 단어'
  pointTxt.innerHTML = ''
  timerTxt.innerHTML = ''
  cnt = []
  stopTimer(timerShow)
}

//게임 시작 함수입니다.
function startGame(e){
  e.preventDefault()
  if(startBtn.classList.contains('start_btn')){
    inputTxt.placeholder = ""
    getGameList()
    startBtn.className = 'reset_btn'
    startBtn.innerHTML='초기화'
  }else {
    resetGame()
  }
}

//게임을 시작하고 보여주는 함수입니다.
function displayGame(list = []){
  inputTxt.disabled = false
  let curItem = list.slice(cnt.length,cnt.length + 1).find(data => (data))
  defaultTime = curItem.second
  gameWord.innerHTML = list.length <= 0 ? '문제 단어' : curItem.text
  timerTxt.innerHTML = curItem.second

  if(curItem.second > 0){
    timerShow = setInterval(() => {
      curItem.second--
      timerTxt.innerHTML = curItem.second
      //마지막 단어 체크
      if(curItem.text === 'us' && curItem.second === 0){
        cnt.push({answer:false,speed:Number(defaultTime)})
        stopTimer(timerShow)
        window.location.href = '#complete'
      }
      //시간내로 입력을 못했을때 
      if(curItem.second === 0){
        cnt.push({answer:false,speed:Number(defaultTime)})
        stopTimer(timerShow)
        displayGame(list)
      }
    },1000)
  }
}

//타이머를 스탑합니다.
function stopTimer(tikData){
  clearInterval(tikData)
}

//엔터키를 이용해 다음단어를 불러옵니다.
function submitWord(e){
  let speed = defaultTime - Number(timerTxt.innerHTML)
  if(e.key === 'Enter'){
    if(cnt.length < 11){
      if(gameWord.innerText === e.target.value){
        cnt.push({answer:true,speed:speed})
        pointTxt.innerHTML = `${cnt.filter(pt => (pt.answer === true)).length}점`
        inputTxt.value=''
        getGameList()
        stopTimer(timerShow)
      } else {
        inputTxt.value=''
      }
    } else {
      cnt.push({answer:true,speed:speed})
      window.location.href= '#complete'
      stopTimer(timerShow)
    }
  }
}

//점수와 타자친 속도를 가져옵니다.
//평균속도는 obj객체 안에서 구해줍니다.
function getPoint(){
  let obj = {}
  obj = {
    point : cnt.filter((data) => data.answer === true).length,
    speed : Math.floor(cnt.map(data => (data.answer && data.speed)).reduce((acc,cur) => (acc + cur)) / cnt.length)
  }
  return obj
}

//라우팅 함수입니다.
function routing() {
  let hash = window.location.hash.substr(1).replace(/\//ig, '/');
  let route = routes[0];
  for (let i = 0; i < routes.length; i++) {
    let testRoute = routes[i];
    if (hash == testRoute.url) {
        route = testRoute;
    }
  }
  route.callback();
}

//다 되면은 미션 성공한 돔을 그려줍니다.
routes.push({ url: "complete", callback: ()=> {
  appWrap.innerHTML = `
    <div class="main_wrap">
      <h3 style="text-align:center">Mission Complete!!!!!</h3>
      <h2 style="text-align:center">당신의 점수는 ${getPoint().point}입니다.</h2>
      <h5 style="text-align:center">당신의 평균 답변 시간은 ${getPoint().speed}초입니다.</h5>
      <div class="wrap_bottom">
      <a href="" style="text-decoration:none; color:#333; text-align:center;"><button class="start_btn">다시 시작</button></a>
      </div>
    </div>
  `
} });
