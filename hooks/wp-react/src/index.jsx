import App from "./App";

// 热加载
if (module.hot) {
  module.hot.accept((error) => {
    if (error) {
      console.log(error);
    }
  });
}
