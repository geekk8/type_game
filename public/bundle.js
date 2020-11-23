/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
 //기본 엘리멘터들 입니다.

var pointTxt = document.querySelector('.point');
var timerTxt = document.querySelector('.timer');
var gameWord = document.querySelector('.game_word');
var startBtn = document.querySelector('.start_btn');
var inputTxt = document.querySelector('.input_txt');
var appWrap = document.querySelector('#app'); //이벤트들 입니다.

startBtn.addEventListener('click', startGame);
inputTxt.addEventListener('keyup', submitWord);
window.addEventListener('popstate', routing); //전역변수들 입니다.

var cnt = [];
var defaultTime = 0;
var timerShow; //라우트변수 입니다.

var routes = [{
  url: '',
  callback: function callback() {}
}]; //제공해주는 api를 통신해 데이터를 가져옵니다.

function getGameList() {
  var API_URL = "https://my-json-server.typicode.com/kakaopay-fe/resources/words";
  return fetch(API_URL).then(function (res) {
    return res.json();
  }).then(function (data) {
    displayGame(data);
  })["catch"](function (error) {
    return console.log("error!", error);
  });
} //게임 리셋 함수입니다.


function resetGame() {
  startBtn.className = 'start_btn';
  startBtn.innerHTML = '시작';
  gameWord.innerHTML = '문제 단어';
  pointTxt.innerHTML = '';
  timerTxt.innerHTML = '';
  cnt = [];
  stopTimer(timerShow);
} //게임 시작 함수입니다.


function startGame(e) {
  e.preventDefault();

  if (startBtn.classList.contains('start_btn')) {
    inputTxt.placeholder = "";
    getGameList();
    startBtn.className = 'reset_btn';
    startBtn.innerHTML = '초기화';
  } else {
    resetGame();
  }
} //게임을 시작하고 보여주는 함수입니다.


function displayGame() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  inputTxt.disabled = false;
  var curItem = list.slice(cnt.length, cnt.length + 1).find(function (data) {
    return data;
  });
  defaultTime = curItem.second;
  gameWord.innerHTML = list.length <= 0 ? '문제 단어' : curItem.text;
  timerTxt.innerHTML = curItem.second;

  if (curItem.second > 0) {
    timerShow = setInterval(function () {
      curItem.second--;
      timerTxt.innerHTML = curItem.second; //마지막 단어 체크

      if (curItem.text === 'us' && curItem.second === 0) {
        cnt.push({
          answer: false,
          speed: Number(defaultTime)
        });
        stopTimer(timerShow);
        window.location.href = '#complete';
      } //시간내로 입력을 못했을때 


      if (curItem.second === 0) {
        cnt.push({
          answer: false,
          speed: Number(defaultTime)
        });
        stopTimer(timerShow);
        displayGame(list);
      }
    }, 1000);
  }
} //타이머를 스탑합니다.


function stopTimer(tikData) {
  clearInterval(tikData);
} //엔터키를 이용해 다음단어를 불러옵니다.


function submitWord(e) {
  var speed = defaultTime - Number(timerTxt.innerHTML);

  if (e.key === 'Enter') {
    if (cnt.length < 11) {
      if (gameWord.innerText === e.target.value) {
        cnt.push({
          answer: true,
          speed: speed
        });
        pointTxt.innerHTML = "".concat(cnt.filter(function (pt) {
          return pt.answer === true;
        }).length, "\uC810");
        inputTxt.value = '';
        getGameList();
        stopTimer(timerShow);
      } else {
        inputTxt.value = '';
      }
    } else {
      cnt.push({
        answer: true,
        speed: speed
      });
      window.location.href = '#complete';
      stopTimer(timerShow);
    }
  }
} //점수와 타자친 속도를 가져옵니다.
//평균속도는 obj객체 안에서 구해줍니다.


function getPoint() {
  var obj = {};
  obj = {
    point: cnt.filter(function (data) {
      return data.answer === true;
    }).length,
    speed: Math.floor(cnt.map(function (data) {
      return data.answer && data.speed;
    }).reduce(function (acc, cur) {
      return acc + cur;
    }) / cnt.length)
  };
  return obj;
} //라우팅 함수입니다.


function routing() {
  var hash = window.location.hash.substr(1).replace(/\//ig, '/');
  var route = routes[0];

  for (var i = 0; i < routes.length; i++) {
    var testRoute = routes[i];

    if (hash == testRoute.url) {
      route = testRoute;
    }
  }

  route.callback();
} //다 되면은 미션 성공한 돔을 그려줍니다.


routes.push({
  url: "complete",
  callback: function callback() {
    appWrap.innerHTML = "\n    <div class=\"main_wrap\">\n      <h3 style=\"text-align:center\">Mission Complete!!!!!</h3>\n      <h2 style=\"text-align:center\">\uB2F9\uC2E0\uC758 \uC810\uC218\uB294 ".concat(getPoint().point, "\uC785\uB2C8\uB2E4.</h2>\n      <h5 style=\"text-align:center\">\uB2F9\uC2E0\uC758 \uD3C9\uADE0 \uB2F5\uBCC0 \uC2DC\uAC04\uC740 ").concat(getPoint().speed, "\uCD08\uC785\uB2C8\uB2E4.</h5>\n      <div class=\"wrap_bottom\">\n      <a href=\"\" style=\"text-decoration:none; color:#333; text-align:center;\"><button class=\"start_btn\">\uB2E4\uC2DC \uC2DC\uC791</button></a>\n      </div>\n    </div>\n  ");
  }
});

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;