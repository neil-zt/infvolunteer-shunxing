$(function(){
    var display = 2,
        cur = 0,
        cur_page = 1,
        img_arr = [
            "./img/creator/creator2.jpg",
            "./img/creator/creator3.jpg",
            "./img/creator/creator4.jpg",
            "./img/creator/creator5.jpg",
            "./img/creator/creator6.jpg",
            "./img/creator/creator7.jpg",
            "./img/creator/creator8.jpg",
            "./img/creator/creator9.jpg",
            "./img/creator/creator10.jpg",
            "./img/creator/creator11.jpg",
            "./img/creator/creator12.jpg",
            "./img/creator/creator13.jpg",
            "./img/creator/creator14.jpg",
            "./img/creator/creator15.jpg",
        ],
        w_arr = [
            "<h1>張曉蓓 <span>總幹事</span></h1><p>不斷進化蛻變的順興社區，一群生活共同圈者，<span class='highlight-span'>從遊戲中留下了回憶與紀錄</span>，我在順興社區~我驕傲！</p>",
            "<h1>刁晴卿 <span>老師</span></h1><p>從構想到跟學員團討以及手作的過程到完成作品實屬不易，透過遊戲讓大家識社區外，遊戲的機制設計也<span class='highlight-span'>展現出各種思考與助人的關懷</span>。</p>",
            "<h1>李月雲 <span>老師</span></h1><p>簡單的桌遊，卻有<span class='highlight-span'>不簡單的創作過程</span>，從無到有大家的創作巧思令人讚嘆！</p>",
            "<h1>何家珍 <span>老師</span></h1><p>創意有趣的桌遊，一起製作過程中，看到了<span class='highlight-span'>創作者對社區關懷的付出</span>，真的是太有心了。</p>",
            "<h1>單柏堯 <span>老師</span></h1><p><span class='highlight-span'>「順」應在地、「興」隆復育、「社」造培力、「區」里永續</span>；很開心與居民創意手作社區桌遊，也培訓社區桌遊師，希望之後能到其他社區分享。</p>",
            "<h1>劉月琴 <span>成員</span></h1><p>從不知道什麼是桌遊到<span class='highlight-span'>一起創作出這麼有溫度的桌遊</span>，覺得不可思議。</p>",
            "<h1>林素蘭 <span>成員</span></h1><p>佩服，刁老師、柏堯的<span class='highlight-span'>發想與巧思</span>，好厲害，謝謝大家。</p>",
            "<h1>張豫芝 <span>成員</span></h1><p><span class='highlight-span'>從無到有的成果</span>終於完成了！讓我了解年齡不是問題，任何事只要有心、用心都可以達成。</p>",
            "<h1>譚羽湘 <span>成員</span></h1><p>經過老師指導，沒想到小兵立大功，<span class='highlight-span'>永續傳承社區文化</span>。</p>",
            "<h1>沈慧英 <span>成員</span></h1><p>非常開心能參與這麼有意義的活動，<span class='highlight-span'>學習社區盤點與遊戲發想等</span>，期待這款桌遊能讓大朋友、小朋友都很喜歡。</p>",
            "<h1>魏德全 <span>成員</span></h1><p>雖然過程很辛苦，幸好有刁老師、柏堯、同學們<span class='highlight-span'>集思廣益，解除萬難</span>，有機會參與感到無比的榮幸。</p>",
            "<h1>曾菊滿 <span>成員</span></h1><p>跟好多老師學習，<span class='highlight-span'>帶領創作出獨一無二的桌遊</span>，希望有很多人來玩。</p>",
            "<h1>張翠翠 <span>成員</span></h1><p>帶四女兒一起參加，第一次接觸創作社區桌遊，地圖和卡牌都是<span class='highlight-span'>大家一起設計與構思的</span>，很有創意也很有挑戰。</p>",
            "<h1>角玉霞 <span>成員</span></h1><p>巡迴這麼多以來，越了解越喜歡，<span class='highlight-span'>桌遊有趣在每次都有不同選擇</span>，心情、對象不一樣，結果也不一樣，會讓人想要繼續玩下去。</p>",
        ];

    function memberFront(){
        $(".member-card").filter(function(){
            return $(this).css("display") != "none";
        }).each(function(){
            $(this).children(".member-front").children(".member-img").css({
                backgroundImage: "url('" + img_arr[cur] + "')"
            });
            $(this).children(".member-front").children(".member-words").empty().append(w_arr[cur]);
            cur++;
        });
    }

    function memberBack(){
        $(".member-card").filter(function(){
            return $(this).css("display") != "none";
        }).each(function(){
            $(this).children(".member-back").children(".member-img").css({
                backgroundImage: "url('" + img_arr[cur] + "')"
            });
            $(this).children(".member-back").children(".member-words").empty().append(w_arr[cur]);
            cur++;
        });
    }

    function checkCardDisplay(){
        $(".member-card").each(function(){
            if($(this).css("display") == "none"){
                display--;
            }
        });
        if(display == 2){

            for(var i = 0; i < 2; i++){
                $(".member-front .member-words:not(:has(*))").first().prev().css({
                    backgroundImage: "url('" + img_arr[i] + "')"
                });
                $(".member-front .member-words:not(:has(*))").first().empty().append(w_arr[i])
            }
            for(var i = 2; i < 4; i++){
                $(".member-back .member-words:not(:has(*))").first().prev().css({
                    backgroundImage: "url('" + img_arr[i] + "')"
                });
                $(".member-back .member-words:not(:has(*))").first().empty().append(w_arr[i])
            }

            $("#member-next-btn").on("click", function(){
                if(cur_page == 7){
                    return false;
                }
                else if(cur_page == 1){
                    cur_page = 2;
                }
                else if(cur_page == 2){
                    cur = 4;
                    memberFront();
                    cur_page = 3;
                }
                else if(cur_page == 3){
                    cur = 6;
                    memberBack()
                    cur_page = 4;
                }
                else if(cur_page == 4){
                    cur = 8;
                    memberFront();
                    cur_page = 5;
                }
                else if(cur_page == 5){
                    cur = 10;
                    memberBack();
                    cur_page = 6;
                }
                else if(cur_page == 6){
                    cur = 12;
                    memberFront();
                    cur_page = 7;
                }
                $(".member-card").toggleClass("member-card-turn");
            });
            $("#member-back-btn").on("click", function(){
                if(cur_page == 1){
                    return false;
                }
                else if(cur_page == 7){
                    cur_page = 6;
                }
                else if(cur_page == 6){
                    cur = 8;
                    memberFront();
                    cur_page = 5;
                }
                else if(cur_page == 5){
                    cur = 6;
                    memberBack();
                    cur_page = 4;
                }
                else if(cur_page == 4){
                    cur = 4;
                    memberFront();
                    cur_page = 3;
                }
                else if(cur_page == 3){
                    cur = 2;
                    memberBack();
                    cur_page = 2;
                }
                else if(cur_page == 2){
                    cur = 0;
                    memberFront();
                    cur_page = 1;
                }

                $(".member-card").toggleClass("member-card-turn");
            });
        }
        else if(display == 1){
            $(".member-front .member-words:not(:has(*))").first().prev().css({
                backgroundImage: "url('" + img_arr[0] + "')"
            });
            $(".member-front .member-words:not(:has(*))").first().empty().append(w_arr[0])

            $(".member-back .member-words:not(:has(*))").first().prev().css({
                backgroundImage: "url('" + img_arr[1] + "')"
            });
            $(".member-back .member-words:not(:has(*))").first().empty().append(w_arr[1])

            $("#member-next-btn").on("click", function(){
                if(cur_page == 14){
                    return false;
                }
                else if(cur_page == 1){
                    if(cur == 0){
                        cur += 2;
                    }
                    else if(cur == 1){
                        cur++;
                    }
                    cur_page++;
                }
                else if(cur_page % 2 == 1){
                    cur_page++;
                    memberBack();
                }
                else if(cur_page % 2 == 0){
                    cur_page++;
                    memberFront();
                }
                $(".member-card").toggleClass("member-card-turn");
            });
            $("#member-back-btn").on("click", function(){
                if(cur_page == 1){
                    return false;
                }
                else if(cur_page == 14){
                    cur--;
                    cur_page = 13;
                }
                else if(cur_page % 2 == 1){
                    cur-=2;
                    cur_page--;
                    memberBack();
                }
                else if(cur_page % 2 == 0){
                    cur-=2;
                    cur_page--;
                    memberFront();
                }

                $(".member-card").toggleClass("member-card-turn");
            });
        }
    }

    if(!CSS.supports("aspect-ratio", "1 / 1")){
        if($(window).width() >= 576){
            $(".creator-img").width();
            $(".creator-img").height($(".creator-img").width());
        }
    }

    checkCardDisplay();

    $(window).on("resize", function(){
        if(!CSS.supports("aspect-ratio", "1 / 1")){
            if($(window).width() >= 576){
                $(".creator-img").width();
                $(".creator-img").height($(".creator-img").width());
            }
        }
    });
});