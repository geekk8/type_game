# type_game
########
해결전략
########

## 개발환경
  - IDE : Visual Studio Code
  - Language : vanilla javascript
  - webpack : webpack@4.36.1 / webpack-cli@4.2 / webpack-dev-server@3.11.0
    (open, hot 적용)
  - jest : jest@26.6.3

## 빌드 및 실행
  - start : npm start 
  - build : npm run build
  
## 해결 전략
       
  - 화면구성
    1. HTML로 기본적인 틀을 구성해주었습니다.
    2. css파일로 기본적인 디자인을 작업하였습니다. 기본적인 css만을 사용하였기 때문에 scss는 따로 사용하지 않았습니다.
   
  - 기능구현
    1. 시작 : 시작버튼을 누르면 제공된 api를 이용해 fetch를 통해 데이터를 가져옵니다.
              <pre>
                <code>
                  [
                    {
                    "time": 10,
                    "text": "hello"
                    },
                    {
                    "time": 10,
                    "text": "world"
                    },
                    ...
                  ]
                </code>
              </pre>

              -> 단어의 리스트를 성공적으로 가져오면 displayGame() 함수를 통해 시작이 됩니다.
              시작 버튼을 누름과 동시에 초기화 버튼명으로 바뀌고 resetGame()함수를 호출 할 수 있습니다.
    
    2. 화면 : displayGame()의 함수에서 파라미터로 받아온 리스트를 slice를 통해 1개의 데이터만 보여줍니다.
    3. 남은시간/단어 : slice를 통해 리턴된 배열은 text와 second 객체로 접근이 가능하기때문에 미리 선언한 엘리먼트들의
                      변수를 통해 보여집니다.
                      남은시간같은 경우는 second로 받은 시간으로부터 1초씩 감소해야되기때문에 setInterval webAPI를 통해 구현하였습니다.
    
    4. 입력 : 시작 버튼을 누르기전에는 input box는 disabled이 되어있어 입력이 불가능합니다.
              시작 버튼을 누르게되면 input box의 disabled는 false가 되고 입력이 가능합니다.
              submitWord()함수를 통해 이벤트로 받은 key와 비교해 Enter면 전역으로 선언한 cnt[]값의 answer와 speed객체를 푸쉬해줍니다.
                      
    5. 완료 : api를 호출해 받은 리스트의 렝스만큼 완료가되었다면 #complete로 이동합니다.
    
    6. 점수/평균속도 : cnt의 담은 배열의 length를 체크해 점수를 표현해줍니다. 단. answer가 true인 경우만 체크해주어서 실제로 입력한것과 시간초과된것들을 구분지었습니다.
                      cnt의 담은 answer가 true면서 && speed의 담긴 값들의 평균을 구합니다.

## TDD
  - jest 라이브러리를 이용.
    

