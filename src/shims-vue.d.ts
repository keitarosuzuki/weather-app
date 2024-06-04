import { Store } from 'vuex';

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  // コンポーネントのカスタムプロパティに $store を追加
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}