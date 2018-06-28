// 主选项卡切换
var mainNav = new Vue({
  el: '.mainNav',
  data: {
    mainNav: [
      { name: '画线编程', attr: 'path', isActive: false },
      { name: '图形化编程', attr: 'blockly', isActive: true },
      { name: '代码编程', attr: 'code', isActive: false }
    ]
  },
  methods: {
    mainNavClick: function (item) {
      for (var i = 0; i < this.mainNav.length; i++) {
        this.mainNav[i].isActive = false;
      }
      item.isActive = !item.isActive;
      if (item.attr === 'path') {
        sidebar.sidebar[1].able = false;
      } else {
        sidebar.sidebar[1].able = true;
      }
    }
  }
});

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

//sidebar 按钮
var sidebar = new Vue({
  el: '.sidebarBtnGroup',
  data: {
    sidebar: [
      { name: '机器人', able: true },
      { name: '代码', able: true }
    ]
  }
});





