$(function(){
    $(".menu-btn").on("click", function(e){
        e.preventDefault();

        var anchor = $(this).attr('href');
        var linkScroll = $(anchor).offset().top;

        $(".nav-bar").animate({
            top:"-60px"
        }, 100);

        $(".nav-bar").delay(1000).animate({
            top:"0"
        });
        $('html, body').animate({
            scrollTop: linkScroll -65
        }, 1500)
    });

    $(".menu-toggle, .toggle-btn").on("click", function(){
        $(".menu-toggle").toggleClass("menu-active");

        if($(".menu-toggle").hasClass("menu-active")){
            $(".menu-toggle span:nth-child(1)").css({
                transform:"translateY(0)"
            }).delay(500).queue(function(){
                $(this).css({
                    transform:"translateY(0) rotate(45deg)"
                }).dequeue();
            });

            $(".menu-toggle span:nth-child(2)").css({
                transform:"translateY(0)"
            }).delay(500).queue(function(){
                $(this).css({
                    transform:"translateY(0) rotate(-45deg)"
                }).dequeue();
            });

            $(".menu-toggle span:nth-child(3)").css({
                opacity:"0"
            });

            $(".menu-block").css({
                transform:"scaleY(1)"
            });

            $(".toggle-btn").each(function(index){
                $(this).delay(200 + 50 * index).animate({
                    left:"0",
                    opacity:"1"
                });
            });
        }
        else{
            $(".menu-toggle span:nth-child(1)").css({
                transform:"translateY(0)"
            }).delay(500).queue(function(){
                $(this).css({
                    transform:"translateY(-10px)"
                }).dequeue();
            });

            $(".menu-toggle span:nth-child(2)").css({
                transform:"translateY(0)"
            }).delay(500).queue(function(){
                $(this).css({
                    transform:"translateY(10px)"
                }).dequeue();
            });

            $(".menu-toggle span:nth-child(3)").css({
                opacity:"1"
            });

            $(".toggle-btn").each(function(index){
                $(this).delay(50 * index).animate({
                    left:"-20px",
                    opacity:"0"
                });
            });
            $(".menu-block").delay(600).queue(function(){
                $(this).css({
                    transform:"scaleY(0)"
                }).dequeue();
            });

        }
    });
});