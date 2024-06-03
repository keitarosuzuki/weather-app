import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firebasePlugin } from './firebasePlugin';
import 'bootstrap/dist/css/bootstrap.css'; // BootstrapのCSSファイルをインポート
import 'bootstrap'; // BootstrapのJavaScriptをインポート

// Font Awesome 関連のインポート
// import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css'; // CSSファイルのインポート

createApp(App).use(store).use(router).use(firebasePlugin).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
