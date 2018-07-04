//导航
var fnNav = new Vue({
  el: '.fnNav',
  data: {
    fnNav: [
      { name: '打开', able: false },
      { name: '下载', able: false },
      { name: '发布', able: false },
      { name: '我的项目', able: false },
      { name: '保存', able: true },
      { name: '示例', able: true }
    ]
  }
});

//sidebar
var sidebar = new Vue({
  el: '.sidebarBtnGroup',
  data: {
    sidebars: [
      { name: '机器人', able: true },
      { name: '代码', able: true }
    ]
  }
});
