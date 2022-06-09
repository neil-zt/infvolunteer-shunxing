$(".hide-el").hide();

$(function(){
    var playTime = 0, clickable = false, cur_page = 1, piece = 0, pieces;
    var title = [
        "1. 選取並點選拼圖難度",
        "2. 點選圖示以開始遊戲",
        "3. 選取拼圖與放置位子",
        "4. 選取空白位子移動拼圖",
        "5. 選取其他拼圖交換位子",
        "恭喜你學會了！點選關閉以開始遊戲吧！",
    ]

    $("#start-puzzle-btn").on("click", function(){
        $(this).fadeOut(400);
        $(".flower").animate({
            top:"-3%",
            left:"-3%",
            opacity:"0"
        });
        $(".title").animate({
            bottom:"-3%",
            right:"-3%",
            opacity:"0"
        });
        $(".landing-card-block").animate({
            top:"25%",
            opacity:"0"
        });
        $(".landing-title-block").animate({
            bottom:"2%",
            right:"2%",
            opacity:"0"
        });
        $(".landing-wheel-block").animate({
            right:"-8%",
            top:"-=5%",
            opacity:"0"
        });
        $(".landing-bg-line").delay(600).queue(function(){
            $(this).css({
                height:"85vh",
                transform:"translate(-50%, calc(-50% + 30px))"
            }).dequeue();
        });
        checkAspectSupport();
        $(".puzzle-section").delay(500).fadeIn(400);
        cur_page = 1;
        $(".data-section").delay(500).fadeIn(400);
        $(".tutorial-section").delay(500).fadeIn(400);
        $(".tutorial-pag-block").show();
        $(".tutorial-list h1").text(title[0]);
        $("#t-1").show();
        $("#t-pass").show();
        $("#t-6").hide();
        $(".piece").hide();
        $(".pieces-block .btn").show();
        $(".pieces-block p").text("選擇難易度");
    });

    $("#tutorial-next-btn").on("click", function(){
        if(cur_page != 6){
            $(".tutorial-pag:nth-child("+ cur_page +")").animate({
                width:"10px",
                opacity:".5"
            });
            $(".tutorial-pag:nth-child("+ (cur_page + 1) +")").animate({
                width:"25px",
                opacity:"1"
            });
            cur_page++;
            $(".tutorial-list h1").text(title[cur_page - 1]);
            $("#t-" + (cur_page - 1)).hide();
            $("#t-" + cur_page).show();
            if(cur_page == 6){
                $("#t-pass").hide();
            }
        }
    });

    $("#t-6").on("click", function(){
        $(".tutorial-section").fadeOut();
    });

    $("#t-pass").on("click", function(){
        $(".tutorial-pag:nth-child("+ cur_page +")").animate({
            width:"10px",
            opacity:".5"
        });
        $(".tutorial-list h1").text(title[5]);
        $("#t-" + cur_page).hide();
        cur_page = 6;
        $("#t-pass").hide();
        $("#t-6").show();
    });

    $("#tutorial-back-btn").on("click", function(){
        if(cur_page != 1){
            $(".tutorial-pag:nth-child("+ cur_page +")").animate({
                width:"10px",
                opacity:".5"
            });
            $(".tutorial-pag:nth-child("+ (cur_page - 1) +")").animate({
                width:"25px",
                opacity:"1"
            });
            cur_page--;
            $(".tutorial-list h1").text(title[cur_page - 1]);
            $("#t-" + (cur_page + 1)).hide();
            $("#t-" + cur_page).show();
            $("#t-pass").show();
        }
    });

    $(".pieces-block .btn").on("click", function(){
        piece = $(this).data("piece");
        $(".pieces-block .btn").hide();
        $(".pieces-block p").text("拼圖放置區域");
        pieces = createPieces(true);
        $("#img-block").html(pieces);
        if($(window).width() > 576 && $(window).width() <= 768){
            $(".pieces-block").css({
                width: "0",
                height: "40vh",
            });
        }
        $(".piece").css({
            width:(100 / piece) + "%",
            height:(100 / piece) + "%",
            backgroundSize:"calc(" + (piece * 100) + "% + " + (piece + 1) + "px) calc(" + (piece * 100) + "% + " + (piece + 1) + "px)"
        });
        $("#img-block").fadeIn(400);
        checkAspectSupport();
    });

    function checkAspectSupport(){
        if($(window).width() > 768){
            $(".pieces-block").css({
                width: "45vw",
                height: "0",
            });
            $(".img-block").css({
                width: "45vw",
                height: "0",
            });
        }
        else{
            if($(window).height() * 0.4 / 2 * 3 > $(window).width() * 0.92){
                $(".pieces-block").css({
                    width: "90vw",
                    height: "0",
                });
                $(".img-block").css({
                    width: "90vw",
                    height: "0",
                });
            }
            else{
                $(".pieces-block").css({
                    width: "0",
                    height: "40vh",
                });
                $(".img-block").css({
                    width: "0",
                    height: "40vh",
                });
            }
        }
        if($(".pieces-block").css("width") == "0px" || $(".pieces-block").css("width") == "30px"){
            var w = $(".pieces-block").height() / 2 * 3;
            $(".pieces-block").css({
                width:w
            });
        }
        else if($(".pieces-block").css("height") == "0px"){
            var h = ($(".pieces-block").width() + 30) / 3 * 2
            $(".pieces-block").css({
                height:h
            });
        }
        if($(".img-block").css("width") == "0px" || $(".img-block").css("width") == "30px"){
            var w = $(".img-block").height() / 2 * 3;
            $(".img-block").css({
                width:w
            });
        }
        else if($(".img-block").css("height") == "0px"){
            var h = $(".img-block").width() / 3 * 2
            $(".img-block").css({
                height:h
            })
        }
    }

    function gameLogic()
    {
        var droppable = false, changeable = false;
        $(".selectable-piece").on("click", function(){
            if(clickable){
                if($(this).hasClass("selected-piece")){
                    $(this).removeClass("selected-piece").addClass("scale-down");
                }
                else if($(this).hasClass("dropped-selected-piece")){
                    $(this).removeClass("dropped-selected-piece");
                }
                else if($(".dropped-selected-piece").length > 0 & $(this).hasClass("dropped-piece")){
                    $(this).detach().insertBefore($(".dropped-selected-piece"));
                    changeable = true;
                }
                else{
                    $(".selectable-piece").each(function(){
                        if($(this).hasClass("selected-piece")){
                            $(this).removeClass("selected-piece").addClass("scale-down");
                            return false;
                        }
                    });

                    $(".dropped-piece").each(function(){
                        if($(this).hasClass("dropped-selected-piece")){
                            $(this).removeClass("dropped-selected-piece");
                            return false;
                        }
                    });

                    if(!$(this).hasClass("dropped-piece")){
                        $(this).removeClass("scale-down").addClass("selected-piece");
                    }
                    else{
                        $(this).addClass("dropped-selected-piece");
                    }
                }
            }
        });
        $(".droppable-space").on("mouseover", function(){
            if($(this).children().length > 0){
                return false;
            }
            if($(this).hasClass("hover-piece")){
                $(this).removeClass("hover-piece");
            }
            else{
                $(".droppable-space").each(function(){
                    if($(this).hasClass("hover-piece")){
                        $(this).removeClass("hover-piece");
                        return false;
                    }
                });
                $(this).addClass("hover-piece");
            }
        });
        $(".droppable-space").on("click", function(){
            if(clickable){
                if(changeable){
                    $(".dropped-selected-piece").detach().appendTo($(this)).removeClass("dropped-selected-piece");
                    changeable = false;
                }
                $(".selectable-piece").each(function(){
                    if($(this).hasClass("selected-piece")){
                        droppable = true;
                        return false;
                    }
                    else{
                        droppable = false;
                    }
                });
                if($(this).children().length == 0 & $(".dropped-selected-piece").length != 0){
                    $(".dropped-selected-piece").detach().appendTo($(this)).removeClass("dropped-selected-piece");
                }
                if(droppable){
                    $(".selected-piece").addClass("dropped-piece").css({
                        position:"relative",
                        top:"0px",
                        left:"0px",
                        width:"100%",   
                        height:"100%",
                        border:"none",
                    }).appendTo($(this)).removeClass("selected-piece");
                    checkSolved();
                }
            }
            else{
                $("#puzzle-restart-warn").fadeIn(200).delay(600).fadeOut("slow");
            }
        });
    }

    function checkSolved()
    {
        var correct = true, cnt = 0;
        if($("#img-block .dropped-piece").length != Math.pow(piece, 2)){
            return false;
        }
        for(var k = 0; k < Math.pow(piece, 2); k++){
            var item = $("#img-block .dropped-piece:eq(" + k + ")"),
                order = item.data("order")
            if(k != order){
                item.clone().addClass("selectable-piece scale-down").css({
                    top:Math.floor(cnt / piece) * (100 / piece) + "%",
                    left:Math.floor(cnt % piece) * (100 / piece) + "%",
                    width:(100 / piece) + "%",
                    height:(100 / piece) + "%",
                    position:"absolute",
                    border:"1px solid #a7a7a7",
                }).removeClass("dropped-piece").appendTo($("#pieces-block"));
                clickable = true;
                correct = false;
                cnt++;
            }
        }
        if(correct){
            $("#pieces-block p").text("真厲害，恭喜你！成功的完成了拼圖~");
            timer(true);
            clickable = false;
            $(".record-section").fadeIn(400);
            var record_title;
            if(piece == 3){
                record_title = "簡單- " + t_str;
            }
            else if(piece == 4){
                record_title = "中階- " + t_str;
            }
            else if(piece == 5){
                record_title = "困難- " + t_str;
            }
            $(".record-block h1").text(record_title);
            return true;
        }
        else{
            $("#img-block .droppable-space").each(function(index){
                order = $(this).children().data("order");
                if(index != order){
                    $(this).empty()
                }
            });
            $(".droppable-space").off("mouseover");
            $(".droppable-space").off("click");
            $(".dropped-piece").off("click");
            gameLogic();
        }
    }

    function createPieces(withImg)
    {
        var row = piece, col = piece, width = $("#img-block").width(), height = $("#img-block").height();
        pieces = "";
        for(var i = 0, top = 0, order = 0; i < row; i++, top -= (height / piece)){
            for(var j = 0, left = 0; j < col; j++, left -= (width / piece), order++){
                if(withImg){
                    pieces += "<div style='background-position:" + left + "px " + top + "px ;' class='piece' data-order=" + order + "></div>";
                }
                else{
                    pieces += "<div style='background-image: none;' class='piece droppable-space'></div>";
                }
            }
        }
        return pieces;
    }
    
    function timer(stop = false){
        if(stop){
            clearTimeout(timeId);
        }
        else{
            var hours = Math.floor(playTime / 3600),
                minutes = Math.floor((playTime - (hours * 3600)) / 60),
                seconds = playTime - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0" + hours;}
            if (minutes < 10) {minutes = "0" + minutes;}
            if (seconds < 10) {seconds = "0" + seconds;}
            t_str = hours + ' : ' + minutes + ' : ' + seconds;

            $("#time").text("時間 | " + t_str);
            playTime++;

            timeId = setTimeout(function(){ timer(); }, 1000);
        }
    }

    $("#home-btn").on("click", function(){
        $("#pieces-block p").delay(400).queue(function(){
            $(this).text("拼圖放置區域").dequeue();
        });        
        $(".data-section").fadeOut(400);
        $(".puzzle-section").fadeOut(400);
        $(".start-puzzle-btn").fadeIn(400);
        $(".flower").animate({
            top:"0",
            left:"0",
            opacity:"1"
        });
        $(".title").animate({
            bottom:"0",
            right:"0",
            opacity:"1"
        });
        $(".landing-card-block").animate({
            top:"20%",
            opacity:"1"
        });
        $(".landing-wheel-block").animate({
            right:"-3%",
            top:"+=5%",
            opacity:"1"
        });
        $(".landing-bg-line").delay(200).queue(function(){
            $(this).css({
                height:"90vh",
                transform:"translate(-50%, -50%)"
            }).dequeue();
        });
        $("#start-btn").show();
        $("#reset-btn").hide();
        $("#img-block").hide();
        timer(true);
        playTime = 0;
        $("#time").text("時間 | 00 : 00 : 00");
        piece = 0;
    });

    $("#start-btn").on("click", function(){
        if(piece !== 0){
            clickable = true;
            timer(false)
            var nums = [];
            pieces = $("#img-block div");
            for(var h = 0; h < Math.pow(piece, 2); h++){
                nums.push(h);
            }
            var i = nums.length - 1, j = 0;
            pieces.each(function(){
                j = Math.floor(Math.random() * (i + 1));
                var topPos = Math.floor(nums[j] / piece) * (100 / piece);
                var leftPos = Math.floor(nums[j] % piece) * (100 / piece);
                $(this).addClass("selectable-piece scale-down")
                .css({
                    position:"absolute",
                    top:topPos + "%",
                    left:leftPos + "%"
                });
                $("#pieces-block").append($(this));
                nums.splice(j, 1);
                i--;
            });
            var emptyPieces = createPieces(false);
            $("#img-block").html(emptyPieces);
            $(".piece").css({
                width:(100 / piece) + "%",
                height:(100 / piece) + "%"
            });
            $(this).hide();
            $("#reset-btn").show();
            gameLogic();
        }
        else{
            $("#puzzle-select-warn").fadeIn(200).delay(600).fadeOut("slow");
        }
    });

    $("#reset-btn").on("click", function(){
        $("#img-block").hide();
        $(this).hide();
        $("#start-btn").show();
        $(".pieces-block .btn").show();
        $(".pieces-block p").text("選擇難易度");
        $(".piece").hide();
        timer(true);
        playTime = 0;
        $("#time").text("時間 | 00 : 00 : 00");
        piece = 0;
    });

    $("#pic-btn").on("click", function(){
        if(!CSS.supports("aspect-ratio", "3 / 2")){
            $("#pic-show").height($("#pic-show").width() * 2 / 3);
        }
        $("#pic-show").fadeIn(400).delay(2000).fadeOut(400);
    });

    $("#record-confirm").on("click", function(){
        if($("#record-name").val() == ""){
            $("#record-name").css("color", "red").val("您尚未輸入名稱！").delay(1200).queue(function(){
                $(this).css("color", "black").val("").dequeue();
            });
        }
    });

    $("#record-cancel").on("click", function(){
        $(".record-section").fadeOut(400);
    });

    $(window).on("resize", function(){
        var pieces = $("#img-block div"), width = $("#img-block").width(), height = $("#img-block").height();
        pieces.each(function(){
            var ord = $(this).data("order");
            var left = Math.floor(ord % piece) * (width / -piece), top = Math.floor(ord / piece) * (height / -piece);
            $(this).css({
                backgroundPosition:left + "px " + top + "px",
            });
        });
        var pieces = $("#pieces-block div");
        pieces.each(function(){
            var ord = $(this).data("order");
            var left = Math.floor(ord % piece) * (width / -piece), top = Math.floor(ord / piece) * (height / -piece);
            $(this).css({
                backgroundPosition:left + "px " + top + "px",
            });
        });
        checkAspectSupport();
    });
});