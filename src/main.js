import {
	createSSRApp
} from "vue";
import App from "./App.vue";
// 导入网页请求包
import {$http} from "@escook/request-miniprogram"

uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function (options) {
	uni.showLoading({
		title: '数据加载中...'
	})
}

$http.afterRequest = function () {
	uni.hideLoading()
}

uni.$showMsg = function (title = '数据请求失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
