import data from './json/data.json';
import $ from 'jquery';
import './js/a.js';
import './css/index.css';
import './css/font.css';
import './css/test.less';

console.log(data);

// 热加载
if (module.hot) {
  module.hot.accept((error) => {
    if (error) {
      console.log(error);
    }
  });
}

console.log($);
