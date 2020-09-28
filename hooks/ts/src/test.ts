let message: string = "Hello World";
console.log(message);

let p = document.getElementById("qq");

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

const fun1 = (e: MouseEvent) => {
  console.log("mouse enter");
};

p.addEventListener("mouseenter", fun1, { once: true });
p.removeEventListener("mouseenter", fun1);

enum Player {
  X,
  O,
  None = 100,
  W,
}

console.log(Player.X);

let winArray = [
  [1, 3, 5],
  [2, 4, 6],
];

winArray.forEach((item) => {
  console.log(item);
  item.forEach((value) => {
    console.log(value);
  });
});
