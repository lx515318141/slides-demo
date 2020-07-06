{
  let view = {
    el: ".container",
    init() {
      this.$el = $(this.el);
    },
    activeItem(ele) {
        $(ele).addClass('active').siblings('.active').removeClass('active')
    },
  };
  let controller = {
    status: true,
    current: 0,
    $buttons: $("#buttonWrapper > button"),
    $slides: $("#slides"),
    $images: undefined,
    timer: undefined,
    init(view) {
      this.view = view;
      this.view.init();
      this.$images = this.$slides.children("img");
      this.makeFakeSlides();
      this.$slides.css({ transform: "translateX(-400px)" });
      this.bindEvent();
      this.play();
      this.stop();
    },
    bindEvent() {
      // 前一张和后一张
      this.view.$el.find("#next").on("click", () => {
        this.goToSlide(this.current + 1);
      });
      this.view.$el.find("#previous").on("click", () => {
        this.goToSlide(this.current - 1);
      });
      // 指定转跳到哪一张
      this.view.$el.find("#buttonWrapper").on("click", "button", (e) => {
        let $button = $(e.currentTarget);
        let index = $button.index();
        this.view.activeItem(e.currentTarget)
        this.goToSlide(index);
      });
    },
    // 轮播中判断状态，如果状态为真直接执行，如果为假，先将状态改为真，下次循环在执行
    play() {
      this.timer = setInterval( () => {
        if (this.status) {
          this.goToSlide(this.current + 1);
        }
        this.status = true;
      }, 2000);
    },
    // 鼠标放到图片上时停止滚动，离开图片时继续轮播
    stop() {
      $(".window").on("mouseenter", () => {
        window.clearInterval(this.timer);
      });
      $(".window").on("mouseleave", () => {
        this.play();
      });
    },
    // 轮播函数
    goToSlide(index) {
      // 如果index大于$buttons.length，就把index变为0，index小于0，就把index变为$buttons.length-1
      if (index >= this.$buttons.length) {
        index = 0;
      } else if (index < 0) {
        index = this.$buttons.length - 1;
      }
      // 判断是不是第一个或最后一个
      if (this.current === this.$buttons.length - 1 && index === 0) {
        this.$slides
          .css({
            transform: `translateX(${-(this.$buttons.length + 1) * 400}px)`,
          })
          .one("transitionend", () => {
            // 下面这行代码，为了隐藏从最后一张到第一张或从第一张到最后一张时的中间图片划过的动画
            this.$slides.hide().offset();
            this.$slides
              .css({ transform: `translateX(${-(index + 1) * 400}px)` })
              .show();
          });
      } else if (this.current === 0 && index === this.$buttons.length - 1) {
        this.$slides
          .css({ transform: `translateX(0px)` })
          .one("transitionend", () => {
            this.$slides.hide().offset();
            this.$slides
              .css({ transform: `translateX(${-(index + 1) * 400}px)` })
              .show();
          });
      } else {
        this.$slides.css({ transform: `translateX(${-(index + 1) * 400}px)` });
      }
      this.$buttons.find("button").eq(this.current);
      this.current = index;
      this.view.activeItem(this.$buttons[this.current])
      //   将状态改成假，为了点击之后停顿个几秒在进行轮播
      this.status = false;
    },
    // 克隆第一张和最后一张图片，放在最后和最前面
    makeFakeSlides() {
      let $firstCope = this.$images.eq(0).clone(true);
      let $lastCope = this.$images.eq(this.$images.length - 1).clone(true);
      // 在后面插入克隆的第一张图片
      this.$slides.append($firstCope);
      // 在前面插入克隆的最后一张图片
      this.$slides.prepend($lastCope);
    },
  };
  controller.init(view);
}
