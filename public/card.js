$(".random-card-block").hide();

$(function(){
    $(".card-section").on("click", function(){
        $(".random-front, .random-back").css({
            left:"90vw"
        });

        if($(".random-card").hasClass("random-card-turn")){
            $(".random-card").removeClass("random-card-turn");
        }

        $(".random-card-block").fadeIn(400);

        var rand = Math.floor(Math.random() * $(this).data('num') + 1);
        var img_front = document.createElement('img'), img_back = document.createElement('img');

        img_front.src = "./img/card/" + $(this).attr('id') + "_back.png";
        img_back.src = "./img/card/" + $(this).attr('id') + "/" + $(this).attr('id') + rand + ".png";

        $(".random-card").children().first().empty().append(img_front);
        $(".random-card").children().last().empty().append(img_back);

        $(".random-card").children().delay(500).animate({
            left: "0",
        }, 500);

        $(".random-card").delay(1500).queue(function(){
            $(".random-card").addClass("random-card-turn").dequeue();
        });
        
        $(".random-card-block").on("click", function(){
            $(".random-card-block").fadeOut(400);
        });
    });
})