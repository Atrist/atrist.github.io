const fs = require("fs");
const path = require("path");
module.exports = {
	lang: "zh-CN",
	title: "Atrist",
	description:
		"前端的基础知识集中, 相关业务场景的解决方案集中, 项目源码阅读过程中的一些感悟",
	base: "/",
	head: [
		[
			"meta",
			{
				name: "google-site-verification",
				content: "dmBwuwXMb8fdF5HD1TOPyGTFAQUzV9O9vN4Mh06slnY",
			},
		],
		[
			"meta",
			{
				name: "baidu-site-verification",
				content: "code-HK08p9tJHw",
			},
		],
	],
	themeConfig: {
		search: false,
		nav: [
			{
				text: "前端",
				ariaLabel: "前端",
				items: [
					{
						text: "基础",
						link: "/know/front/",
						items: [
							{ text: "HTML", link: "/know/front/html/" },
							{ text: "CSS", link: "/know/front/css/" },
							{ text: "Javascript", link: "/know/javascript/" },
						],
					},
					{
						text: "工程化",
						ariaLabel: "工程化",
						items: [
							{ text: "npm", link: "/know/engineering/npm/" },
							{
								text: "webpack",
								link: "/know/engineering/webpack/",
							},
							{ text: "react", link: "/know/engineering/react/" },
							{
								text: "typescript",
								link: "/know/typescript/",
							},
						],
					},
					{
						text: "计算机基础",
						link: "/know/computer/",
						items: [
							{ text: "算法", link: "/know/computer/algorithm/" },
							{ text: "数据结构", link: "/know/computer/data/" },
							{ text: "网络", link: "/know/computer/network/" },
						],
					},
					{
						text: "工具",
						link: "/know/tool/",
						items: [
							{ text: "git", link: "/know/tool/git/" },
							{ text: "vscode", link: "/know/tool/vscode/" },
						],
					},
				],
			},
			{
				text: "解决方案",
				ariaLabel: "解决方案",
				items: [
					{
						text: "面试",
						ariaLabel: "面试",
						link: "/answer/interview/",
						items: [
							{
								text: "前端基础",
								link: "/answer/interview/basic/",
							},
						],
					},
					{
						text: "通用",
						ariaLabel: "通用",
						link: "/answer/common/",
					},
					{
						text: "音视频",
						ariaLabel: "音视频",
						items: [{ text: "webRTC", link: "/answer/webRTC/" }],
					},
				],
			},
			{
				text: "源码阅读",
				link: "/code/",
				items: [
					{
						text: "npm包",
						link: "/code/npm/",
					},
					{
						text: "react系列",
						link: "/code/react/",
					},
					{
						text: "源码共读",
						link: "/code/opensource/",
					},
				],
			},
			{
				text: "项目集成",
				link: "/workshop/",
				items: [{ text: "Cli", link: "/workshop/cli/" }],
			},
		],
		sidebar: {
			"/know/front/": addCommonConfig([
				["HTML", "/know/front/html/"],
				["CSS", "/know/front/css/"],
			]),
			"/know/typescript/": [
				{
					title: "手册",
					collapsable: false,
					path: "/know/typescript/basic/",
					children: getFilesByPath("/know/typescript/basic/"),
				},
				{
					title: "如何写声明文件",
					collapsable: false,
					path: "/know/typescript/declarationfiles/",
					children: getFilesByPath(
						"/know/typescript/declarationfiles/"
					),
				},
			],
			"/know/javascript/": addCommonConfig([
				["基础知识", "/know/javascript/basic/"],
				["进阶知识", "/know/javascript/advance/"],
			]),
			"/know/engineering/": addCommonConfig([
				["react", "/know/engineering/react/"],
				["npm", "/know/engineering/npm/"],
				["webpack", "/know/engineering/webpack/"],
				["typescript", "/know/engineering/typescript/"],
			]),
			"/know/computer/": addCommonConfig([
				["算法", "/know/computer/algorithm/"],
				["数据结构", "/know/computer/data/"],
				["网络", "/know/computer/network/"],
			]),
			"/know/tool/": addCommonConfig([
				["Git", "/know/tool/git/"],
				["Vscode", "/know/tool/vscode/"],
			]),
			"/posts/": addCommonConfig([["每日一题", "/posts/"]]),
			"/answer/common/": [
				{
					title: "前端",
					collapsable: false,
					path: "/answer/common/web/",
					children: getFilesByPath("/answer/common/web/"),
				},
				{
					title: "业务",
					collapsable: false,
					path: "/answer/common/business/",
					children: getFilesByPath("/answer/common/business/"),
				},
				{
					title: "剑指offer",
					collapsable: false,
					path: "/answer/common/offer/",
					children: getFilesByPath("/answer/common/offer/"),
				},
				{
					title: "面试",
					collapsable: false,
					path: "/answer/common/interview/",
					children: getFilesByPath("/answer/common/interview/"),
				},
			],
			"/answer/webRTC/": addCommonConfig([
				["webRTC", "/answer/webRTC/"],
				["Janus", "/answer/webRTC/janus/"],
			]),
			"/answer/interview/": addCommonConfig([
				["前端基础", "/answer/interview/basic/"],
			]),
			"/workshop/": addCommonConfig([["cli", "/workshop/cli/"]]),
			"/code/npm/": [
				{
					title: "NPM包",
					path: "/code/npm/",
					collapsable: false,
					sidebarDepth: 2,
					children: getFilesByPath("/code/npm/"),
				},
			],
			"/code/react/": addCommonConfig([
				["react", "/code/react/react/"],
				["redux", "/code/react/redux/"],
				["router", "/code/react/router/"],
			]),
			"/code/opensource/": addCommonConfig([
				["源码共读", "/code/opensource/"],
			]),
		},
	},
	plugins: [
		[
			"sitemap",
			{
				hostname: "https://atrist.github.io/",
			},
		],
		[
			"autometa",
			{
				site: {
					name: "Atrist",
				},
			},
		],
		["baidu-autopush"],
		["seo"],
		["@xiaopanda/vuepress-plugin-code-copy"],
		[
			"feed",
			{
				canonical_base: "https://atrist.github.io",
				posts_directories: ["/posts/"],
			},
		],
		["vuepress-plugin-mathjax"],
		["@vuepress/back-to-top"],
	],
};

function getFilesByPath(filepath, sortFlag) {
	// 获取文件夹下面的目录
	const filePath = path.join(__dirname, "../", filepath);
	const files = fs.readdirSync(filePath);
	let res = [];
	for (let file of files) {
		if (file === "index.md") continue;
		// 判断是否为文件夹
		const fileStat = fs.statSync(path.join(filePath, file));
		if (fileStat.isFile())
			res.push({ title: file.split(".md")[0], path: filepath + file });
		else continue;
	}
	return sort(res);
}
function sort(data) {
	data.sort(
		(a, b) =>
			parseInt(a.title.split("-")[0]) - parseInt(b.title.split("-")[0])
	);
	// 标题删除 排序数字
	return data.map((item) => ({
		...item,
		title: item.title.split("-")[1]
			? item.title.split("-").slice(1).join("-")
			: item.title,
	}));
}

/**
 *
 * @param [] Array 二维数组 0 标题 1 路径
 * @returns 对象数组
 */
function addCommonConfig(array) {
	let result = [];
	for (let item of array) {
		result.push({
			title: item[0],
			collapsable: false,
			sidebarDepth: 2,
			path: item[1],
			children: getFilesByPath(item[1]),
		});
	}
	return result;
}
