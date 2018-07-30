/****************send order*****************/
// var btn = document.querySelector('.btn');
// var progressPercent = document.querySelector('.progress .percent');
// var progressCircle = document.querySelector('.progress .circle');
// var progressMask = document.querySelector('.progressMask');
// if (progressMask) {
//   progressMask.style.display = 'none';
// }
// var count = 0;
// var code;
// function UpdateFunction(event) {
//   aieggy.codeArr = [];
//   code = Blockly.JavaScript.workspaceToCode(workspace);
//   eval(code);
//   if (aieggy.codeArr.length > 0) {
//       for (var i = 0; i < aieggy.codeArr.length; i++) {
//         aieggy.codeArr[i].data.unshift(i);
//       };
//       var firstOrder = { "cmd": 0, "data": [aieggy.codeArr.length] }
//       aieggy.codeArr.unshift(firstOrder);
//   };
//   console.log(aieggy.codeArr);
// };
// if (btn) {
//   btn.addEventListener(startEvt, function (e) {
//     e.stopPropagation();
//     e.preventDefault();
//     progressPercent.innerHTML = "";
//     progressPercent.style.background = "";
//     if (wifi.status === true) {
//       progressPercent.innerHTML = "0%";
//       count = 0;
//       deltaTime = delay();
//       UpdateFunction();
//       if (deltaTime > 1000 && aieggy.codeArr.length > 0) {
//         btnJump(btn);
//         var t;
//         function send() {
//           progressMask.style.display = 'block';
//           console.log(aieggy.codeArr[count]);
//           count++;
//           t = setTimeout(send, 500);
//           if (count == aieggy.codeArr.length) {
//             clearTimeout(t);
//             progressCircle.classList.add("circleBig");
//             setTimeout(function () {
//               progressMask.style.display = 'none';
//               progressCircle.classList.remove("circleBig");
//             }, 2000);
//           };
//           progressPercent.innerHTML = parseInt(100 * count / aieggy.codeArr.length) + "%";
//         };
//         send();
//       };
//     } else {
//       progressMask.style.display = 'block';
//       progressPercent.style.background = 'url(./img/WIFI.png) -160px 0px / cover no-repeat';
//       setTimeout(function () {
//         progressMask.style.display = 'none';  
//       }, 2000);
//     };
//   },false);
// };
// function btnJump(ele) {
//   ele.classList.add("btnJump");
//   var btnTimer;
//   btnTimer = setTimeout(function () { ele.classList.remove("btnJump"); }, 500);
// };
// var BtnLastTime = 0;
// var nowTime;
// var deltaTime;
// function delay() {
//   nowTime = Date.now();
//   deltaTime = nowTime - BtnLastTime;
//   BtnLastTime = nowTime;
//   return deltaTime;
// };
/****************send order end*****************/

