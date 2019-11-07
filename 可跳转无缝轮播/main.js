let $buttons = $("#buttonWrapper > button");
let $slides = $("#slides");
let $images = $slides.children("img");
let current = 0;

makeFakeSlides();
$slides.css({ transform: "translateX(-400px)" });
bindEvents();
$(next).on("click", function() {
  goToSlide(current + 1);
});
$(previous).on("click", function() {
  goToSlide(current - 1);
});

let timer = setInterval(function() {
  goToSlide(current + 1);
}, 2000);
$(".container").on("mouseenter", function() {
  window.clearInterval(timer);
});
$(".container").on("mouseleave", function() {
  timer = setInterval(function() {
    goToSlide(current + 1);
  }, 2000);
});

function bindEvents() {
  $("#buttonWrapper").on("click", "button", function(e) {
    let $button = $(e.currentTarget);
    let index = $button.index();
    goToSlide(index);
  });
}

function goToSlide(index) {
  if (index >= $buttons.length) {
    index = 0;
  } else if (index < 0) {
    index = $buttons.length - 1;
  }
  if (current === $buttons.length - 1 && index === 0) {
    $slides
      .css({ transform: `translateX(${-($buttons.length + 1) * 400}px)` })
      .one("transitionend", function() {
        $slides.hide().offset();
        $slides
          .css({ transform: `translateX(${-(index + 1) * 400}px)` })
          .show();
      });
  } else if (current === 0 && index === $buttons.length - 1) {
    $slides
      .css({ transform: `translateX(0px)` })
      .one("transitionend", function() {
        $slides.hide().offset();
        $slides
          .css({ transform: `translateX(${-(index + 1) * 400}px)` })
          .show();
      });
  } else {
    $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` });
  }
  current = index;
}

function makeFakeSlides() {
  let $firstCope = $images.eq(0).clone(true);
  let $lastCope = $images.eq($images.length - 1).clone(true);

  $slides.append($firstCope);
  // 在后面插入克隆的第一张图片
  $slides.prepend($lastCope);
  // 在前面插入克隆的最后一张图片
}
