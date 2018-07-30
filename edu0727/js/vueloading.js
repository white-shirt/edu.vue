var _LoadingHtml = `<div class="loading" style="position:absolute;top:0;left:0;width:100%;height:100%;color:#fff;text-align:center;background:rgba(0, 0, 0, 0.9);z-index:500;">
<div style="position:absolute;top:40%;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);">
  <p style="line-height:60px;"><img style="width:60px;height:auto;vertical-align: middle;margin-right:10px;" src="./img/loading.gif" />正在加载....</p>
</div>
</div>`;
document.write(_LoadingHtml);

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
  if (document.readyState == "complete") {
    $('.loading').remove();
  }
}