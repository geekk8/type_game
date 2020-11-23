import { getPoint, getGameList, displayGame, timerChk } from './feature'

test('getPoint test' ,() => {
  let cnt = [{answer:true,speed:9},{answer:true,speed:6},{answer:true,speed:7},{answer:true,speed:8}]
  expect(getPoint(cnt)).toEqual({
    point:4,
    speed:7
  })
})

describe('start game', () => {
  test("fetch word list", () => {
    return getGameList().then((list) => {
      expect(list).toEqual([
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
      ])
    })
  })


  test('display timer word point', () => {
    const list = [{second: 10, text: "hello"}, {second: 10, text: "world"}]
    const cnt = [{answer:true,speed:9}]

    setTimeout(() => {
      expect(displayGame(list, cnt)).toEqual([{
        "point":1,"second":10,"text":'hello'
      }])
    }, 200);
  })

  test('timer', () => {
    const times = [{second: 10, text: "hello"}]
    setTimeout(() => {
      expect(timerChk(displayGame())).toBe(true)
    }, 300);
  })
})

