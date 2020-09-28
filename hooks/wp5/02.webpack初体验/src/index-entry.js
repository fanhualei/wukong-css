import add from './js/add';
import sub from './js/sub';
import './css/index.css';
import './css/test.less';
import './css/img.css';
import './css/font.css';

console.log('-------------');

let r = add(1, 2);

console.log(r);

r = sub(3, 2);

console.log(r);

async function getComponent() {
  const { default: _ } = await import(
    /* webpackChunkName: "jquery" */ 'jquery'
  );
  
}

// 热加载
if (module.hot) {
  module.hot.accept((error) => {
    if (error) {
      console.log(error);
    }
  });
}
