import {VueConstructor} from "vue";
import Vue from 'vue'

Vue.config.productionTip = false;

export function renderVue(
    component: VueConstructor,
    container: Element,
) {
    return new Vue({
        el:container,
        render: (h) => h(component)
    })
}