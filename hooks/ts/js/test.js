var message = "Hello World";
console.log(message);
var p = document.getElementById("qq");
p.style.fontSize = "22px";
//添加一个class
p.classList.add("a");
// 移除class
p.classList.remove("a", "c");
// 判断是否存在某个class
p.classList.contains("a");
p.classList.add("e");
p.addEventListener("click", function (_e) {
    console.log("点击了我");
});
var fun1 = function (e) {
    console.log("mouse enter");
};
p.addEventListener("mouseenter", fun1, { once: true });
p.removeEventListener("mouseenter", fun1);
var Player;
(function (Player) {
    Player[Player["X"] = 0] = "X";
    Player[Player["O"] = 1] = "O";
    Player[Player["None"] = 100] = "None";
    Player[Player["W"] = 101] = "W";
})(Player || (Player = {}));
console.log(Player.X);
var winArray = [
    [1, 3, 5],
    [2, 4, 6],
];
winArray.forEach(function (item) {
    console.log(item);
    item.forEach(function (value) {
        console.log(value);
    });
});
//# sourceMappingURL=test.js.map