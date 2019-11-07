let n;
初始化();
let timer = setInterval(() => {
  makeLeave(getImage(n)).one("transitionend", e => {
    makeEnter($(e.currentTarget));
  });
  makeCurrent(getImage(n + 1));
  n += 1;
}, 2000);

document.addEventListener("visibilitychange", function(e) {
  if (document.hidden) {
    window.clearInterval(timer);
  } else {
    timer = setInterval(() => {
      makeLeave(getImage(n)).one("transitionend", e => {
        makeEnter($(e.currentTarget));
      });
      makeCurrent(getImage(n + 1));
      n += 1;
    }, 2000);
  }
});

// 封装函数
function x(n) {
  // 让n永远等于1,2,3
  if (n > 3) {
    n = n % 3;
    if (n === 0) {
      n = 3;
    }
  }
  return n;
}
function getImage(n) {
  return $(`.images > img:nth-child(${x(n)})`);
}
function 初始化() {
  n = 1;
  $(".images > img:nth-child(1)")
    .addClass("current")
    .siblings()
    .addClass("enter");
}
function makeLeave($node) {
  $node.removeClass("current").addClass("leave");
  return $node;
}
function makeEnter($node) {
  $node.removeClass("leave").addClass("enter");
  return $node;
  // 精髓就是返回$node，因为如果函数默认的返回值是undefined，而undefined没有.one这个api
}
function makeCurrent($node) {
  $node.removeClass("enter").addClass("current");
  return $node;
}
