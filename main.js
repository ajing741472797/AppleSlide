let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0



makeFakeSlides()
$slides.css({transform:'translateX(-930px)'})
bindEvents()
$(next).on('click',function(){
    goToSlide(current + 1)
    addClasss(current)
})
$(previous).on('click',function(){
    goToSlide(current - 1)
    addClasss(current)
})

addClasss(current)

let timer = setInterval(function(){
    goToSlide(current + 1)
    addClasss(current)

},1500)



//监听鼠标移入移出
$('.window').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlide(current + 1)
        addClasss(current)
    },1500)
})

$('#buttonWrapper').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlide(current + 1)
        addClasss(current)
    },1500)
})
$('#controls').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlide(current + 1)
        addClasss(current)
    },1500)
})


//页面切出
document.addEventListener('visibilitychange',function(e){
    if(document.hidden){
      window.clearInterval(timer)
    }else{
        timer = setInterval(function(){
            goToSlide(current + 1)
            addClasss(current)
        },1500)
  }
})



function bindEvents() {

    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
        addClasss(current)
        
    })
}

function goToSlide(index) {
    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if (current === $buttons.length - 1 && index === 0) {
        $slides.css({ transform: `translateX(${-($buttons.length + 1) * 930}px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 930}px` }).show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        $slides.css({ transform: `translateX(0px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 930}px` }).show()
            })
    } else {
        $slides.css({ transform: `translateX(${-(index + 1) * 930}px)` })

    }
    current = index

}


function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)

    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function addClasss(current){
    $buttons.eq(current)
              .addClass('active')
              .siblings('.active').removeClass('active')
}