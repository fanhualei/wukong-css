const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行了123');
    resolve();
  }, 1000);
});

console.log(promise);
