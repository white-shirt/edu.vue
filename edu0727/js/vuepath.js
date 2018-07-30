/**
 * @author         [zk]
 * @description    [draw track and send to robot]
 * @date           [2018.04.12]
 */
  var canvasBg = document.querySelector('#canvasBg');
  var Connections = document.querySelector('#Connections');
  var drawLine = document.querySelector('#drawLine');
  var btngroup = document.querySelectorAll('.btngroup');
  var ctxBg = canvasBg.getContext('2d');
  var ctxConnections = Connections.getContext('2d');
  var ctxDrawline = drawLine.getContext('2d');
  var canvasWidth = canvasBg.parentElement.offsetWidth;
  var canvasHeight = canvasBg.parentElement.offsetHeight * 0.9;
/**
 * init canvasBg canvasConnections canvasdrawLine
 */
(function initBg() {
  canvasBg.width = canvasWidth;
  canvasBg.height = canvasHeight;
  canvasBg.style.background = 'rgba(255, 255, 255, 0)';
})();
(function initConnections() {
  Connections.width = canvasWidth;
  Connections.height = canvasHeight;
  Connections.style.background = "rgba(255,255,255,0)";
  var width = canvasWidth, height = canvasHeight;
  if (window.devicePixelRatio) {
    Connections.style.width = width + "px";
    Connections.style.height = height + "px";
    Connections.height = height * window.devicePixelRatio;
    Connections.width = width * window.devicePixelRatio;
    ctxConnections.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
})();
(function initDrawLine() {
  drawLine.width = canvasWidth;
  drawLine.height = canvasHeight;
  drawLine.style.background = "rgba(255,255,255,0)";
  var width = drawLine.width, height = drawLine.height;
  if (window.devicePixelRatio) {
    drawLine.style.width = width + "px";
    drawLine.style.height = height + "px";
    drawLine.height = height * window.devicePixelRatio;
    drawLine.width = width * window.devicePixelRatio;
    ctxDrawline.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
})();
(function initBtngroup(){
  var BtnWrap = document.querySelector('.BtnWrap');
  BtnWrap.style.top = canvasHeight + "px";
  BtnWrap.style.left = canvasWidth / 2 - BtnWrap.offsetWidth / 2 + 'px';
})();
/**
 * order Array
 */
var sendOrderArr = [];
/**
 * class ConnectionsObj
 * this.x,this.y     [x,y coordinate array]
 * this.num          [matrix density]
 * this.r            [connections radius]
 * this.width        [connections width]
 */
var ConnectionsObj = function () {
  this.x = [];
  this.y = [];
  this.r = 0.5;
  this.dis = 20;
  this.width = 1;
  this.color = "#888";
};
ConnectionsObj.prototype.init = function () {
  for (var i = 1; i < Math.round(canvasWidth / this.dis); i++) {
    this.x[i] = new Array();
    this.y[i] = new Array();
    for (var j = 1; j < Math.round(canvasHeight / this.dis); j++) {
      this.x[i][j] = Math.round(canvasWidth / Math.round(canvasWidth / this.dis)) * i;
      this.y[i][j] = Math.round(canvasHeight / Math.round(canvasHeight / this.dis)) * j;
    }
  }
};
ConnectionsObj.prototype.draw = function () {
  ctxConnections.clearRect(0, 0, canvasWidth, canvasHeight);
  for (var i = 1; i < Math.round(canvasWidth / this.dis); i++) {
    for (var j = 1; j < Math.round(canvasHeight / this.dis); j++) {
      ctxConnections.strokeStyle = this.color;
      ctxConnections.fillStyle = this.color;
      ctxConnections.lineWidth = this.width;
      ctxConnections.beginPath();
      ctxConnections.arc(this.x[i][j], this.y[i][j], this.r, 0, 2 * Math.PI);
      ctxConnections.fill();
    }
  }
};
/**
 *  new connectionsObj
 *  draw connections
 */
var matrix = new ConnectionsObj();
matrix.init();
matrix.draw();
/**
 * class  DrawLineObj
 * this.connectionsArr       [clicked points Array]
 * this.cirR                 [clicked points radius]
 * this.lineW                [line width between points]
 */
var DrawLineObj = function () {
  this.connectionsArr = [];
  this.cirR = 5;
  this.lineW = 1;
};
DrawLineObj.prototype.init = function () {
  this.connectionsArr = [];
  ctxDrawline.clearRect(0, 0, canvasWidth, canvasHeight);
};
DrawLineObj.prototype.choosePoint = function (x, y) {
  var xIndex = Math.round(x / (canvasWidth / Math.round(canvasWidth / matrix.dis)));
  var yIndex = Math.round(y / (canvasHeight / Math.round(canvasHeight / matrix.dis)));
  xIndex === 0 ? xIndex = 1 : xIndex = xIndex;
  yIndex === 0 ? yIndex = 1 : yIndex = yIndex;
  xIndex === matrix.x[1].length ? xIndex = matrix.x[1].length - 1 : xIndex = xIndex;
  yIndex === matrix.y[1].length ? yIndex = matrix.y[1].length - 1 : yIndex = yIndex;
  var curPointX = matrix.x[xIndex][1];
  var curPointY = matrix.y[1][yIndex];
  console.log(xIndex, yIndex);
  console.log(matrix.x[xIndex][1], matrix.y[1][yIndex]);
  if (this.connectionsArr.length >= 1) {
    var lastPointX = this.connectionsArr[this.connectionsArr.length - 1].x;
    var lastPointY = this.connectionsArr[this.connectionsArr.length - 1].y;
    if (curPointX === lastPointX && curPointY === lastPointY) {
      return;
    }
  }
  this.connectionsArr.push({ "x": matrix.x[xIndex][1], "y": matrix.y[1][yIndex] });
  return this.connectionsArr;
};
DrawLineObj.prototype.drawCircle = function () {
  ctxDrawline.fillStyle = "#0fc7d8";
  for (var i = 0; i < this.connectionsArr.length; i++) {
    ctxDrawline.beginPath();
    ctxDrawline.arc(this.connectionsArr[i].x, this.connectionsArr[i].y, this.cirR, 0, 2 * Math.PI);
    if (i == this.connectionsArr.length - 1) {
      ctxDrawline.arc(this.connectionsArr[i].x, this.connectionsArr[i].y, this.cirR + 2, 0, 2 * Math.PI); 
    }
    ctxDrawline.fill();
  }
};
DrawLineObj.prototype.drawline = function () {
  ctxDrawline.clearRect(0, 0, drawLine.width, drawLine.height);
  ctxDrawline.strokeStyle = "#0fc7d8";
  this.drawCircle();
  ctxDrawline.beginPath();
  ctxDrawline.lineWidth = this.lineW;
  for (var i = 0; i < this.connectionsArr.length - 1; i++) {
    ctxDrawline.moveTo(this.connectionsArr[i].x, this.connectionsArr[i].y);
    ctxDrawline.lineTo(this.connectionsArr[i + 1].x, this.connectionsArr[i + 1].y);
  }
  ctxDrawline.stroke();
};
var points = new DrawLineObj();

/**
 * @param {connectionsArr}  arr
 */
function toOrder(arr) {
  if (arr.length > 1) {
    for (var i = 0; i < arr.length - 1; i++) {
      var disX = Math.pow(arr[i].x - arr[i + 1].x, 2);
      var disY = Math.pow(arr[i].y - arr[i + 1].y, 2);
      var step = Math.sqrt(disX + disY) / (matrix.dis * 3);
      console.log(step)
      sendOrderArr.push({ "cmd": 1, "data": [Math.round(1500 * step), 50, 1] });
      if (i < arr.length - 2) {
        var toAngle = new toAngleObj(arr[i].x,arr[i].y,arr[i + 1].x,arr[i + 1].y,arr[i + 2].x,arr[i + 2].y);
      }
    }
  }
};
/**
 * @param {points.x} x1 
 * @param {points.y} y1 
 * @param {points.x} x2 
 * @param {points.y} y2 
 * @param {points.x} x3 
 * @param {points.y} y3 
 */
var toAngleObj = function (x1,y1,x2,y2,x3,y3) {
  this.Angle;
  this.getRotateAngle = function () {
    var va_x = x3 - x2;
    var va_y = y3 - y2;
    var vb_x = x1 - x2;
    var vb_y = y1 - y2;
    var productValue = (va_x * vb_x) + (va_y * vb_y);
    var va_val = Math.sqrt(va_x * va_x + va_y * va_y);
    var vb_val = Math.sqrt(vb_x * vb_x + vb_y * vb_y);
    var cosValue = productValue / (va_val * vb_val);
    if (cosValue < -1 && cosValue > -2) {
      cosValue = -1;
    } else if (cosValue > 1 && cosValue < 2) {
      cosValue = 1;
    }
    return Math.round(Math.acos(cosValue) * 180 / Math.PI);
  };
  this.direction = function () {
    var dir;
    var flag = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
    if (flag > 0) {
      this.Angle = 180 - this.getRotateAngle();
      dir = { "cmd": 1, "data": [Math.round(7.78 * this.Angle), -110, 2] };
    } else if (flag == 0) {
      this.Angle = 180 - this.getRotateAngle();
      dir = { "cmd": 1, "data": [Math.round(7.78 * this.Angle), 110, 2] };
    } else {
      this.Angle = 180 - this.getRotateAngle();
      dir = { "cmd": 1, "data": [Math.round(7.78 * this.Angle), 110, 2] };
    }
    sendOrderArr.push(dir);
  }
  this.direction();
};
/**
 * class AddSubBtnObj
 */
var AddSubBtnObj = function () {

};
AddSubBtnObj.prototype.tap = function (attr) {
  if (attr === 'repeal') {
    if (points.connectionsArr.length >= 1) {
      points.connectionsArr.splice(points.connectionsArr.length - 1, 1);
      points.drawline();
      sendOrderArr = [];
      return;
    }
  };
  if (attr === 'start') {
    sendOrderArr = [];
    toOrder(points.connectionsArr);
    if (login.status === true) {
      if (sendBox.deviceId.length === 0) {
        ModalBox.noticeMsg = "蛋仔没有找到您绑定的机器人~";
        return;
      } else {
        if (sendBox.deviceId[0].state === false) {
          ModalBox.noticeMsg = "机器人好像睡着了~快叫醒它";
          return;
        }
      }
      if (sendOrderArr.length > 0) {
        btnSwitch('off');
        for (var i = 0; i < sendOrderArr.length; i++) {
          sendOrderArr[i].data.unshift(i);
        }
        var firstOrder = { "cmd": 0, "data": [sendOrderArr.length] };
        sendOrderArr.unshift(firstOrder);
        sendDatas();
      } else {
        ModalBox.noticeMsg = "蛋仔检测不到线条哟~";
      }

    } else {
      ModalBox.noticeMsg = '您还没登录呢~';
    }
  };
}
var addSubBtn = new AddSubBtnObj();
/**
 * @param {event} e 
 */
drawLine.onclick = function (e) {
  sendOrderArr = [];
  var event = e || window.event;
  var tapX = event.offsetX, tapY = event.offsetY;
  points.choosePoint(tapX, tapY);
  points.drawline();
}
function btnSwitch(state) {
  for (var i = 0; i < btngroup.length; i++) {
    if (state === "on") {
      btngroup[i].disabled = "";
      btngroup[i].onclick = function () {
        addSubBtn.tap(this.getAttribute('data-attr')); 
      }
    } else {
      btngroup[i].disabled = "disabled";
    }
  }
};
btnSwitch('on');
/**
 * @param {Array} arr 
 */
function sendDatas() {
  var count = 0;
  var timer;
  function send() {
    $.ajax({
      type: "POST",
      url: "BlocklyOnenet",
      data: {
        "deviceId": sendBox.deviceId[0].deviceId,
        "cmd": sendOrderArr[count].cmd,
        "BlocklyData": sendOrderArr[count].data
      },
      traditional: true,
      success: function () {
        clearTimeout(alertTimer);
        ModalBox.noticeMsg = "蛋蛋正在接收第" + count + "条指令";
        count++;
        timer = setTimeout(send, 200);
        if (count == sendOrderArr.length) {
          clearInterval(timer);
          ModalBox.noticeMsg = "蛋蛋已经接收完数据啦~";
          btnSwitch('on');
        }
      },
      error: function () {
        alert("指令遗失在外太空啦，再试一次");
      }
    });
  };
  send();
};








































