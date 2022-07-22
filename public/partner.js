import { getStorage, ref } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js';

var p_cur = 1,
    p_name = [],
    len_div;

const scanActivities = setInterval(() => {
    if(window.activities){
        p_name = window.activities;
        partner_init();
        partner_display();
        clearInterval(scanActivities);
    }
}, 100);

function partner_init(){
    console.log(p_name);
    if($(window).width() > 768){
        len_div = 3;
        while(p_name.length % 3 != 0){
            p_name.push("");
        }
        $(".partner-block").width(p_name.length / len_div * 100 + "%");
    }
    else if($(window).width() > 576){
        len_div = 2;
        while(p_name.length % 2 != 0){
            p_name.push("");
        }
        $(".partner-block").width(p_name.length / len_div * 100 + "%");
    }
    else{
        len_div = 1;
        $(".partner-block").width(p_name.length * 100 + "%");
    }
}

function partner_display(){
    const storage = getStorage();
    for(var i = 0; i < p_name.length; i++){
        if(p_name[i] == ""){
            $(".partner-block").append($('<div/>').addClass("partner-card"));
        }
        else{
            const pathRef = ref(storage, `activities/${p_name[i].file}`);
            $(".partner-block").append(
                $('<div/>').addClass("partner-card").append(
                    [$('<div/>').addClass("partner-activity-img").css("background-image", `url(${pathRef})`),
                    $('<p/>').html(p_name[i].name.replace(/\\n/g, "<br />"))]
                )
            );
        }
    }
}

partner_init();
partner_display();

$(".partner-block p").each(function(){
    if($(this).text().includes("\n")){
        $(this).html($(this).html().replace(/\n/g,'<br/>'));
    }
});

$(function(){

    $("#partner-next-btn").on("click", function(){
        if(p_cur < p_name.length / len_div){
            $(".partner-block").animate({
                left: "-=100%",
            }, 1000);
            p_cur++;
        }
    });

    $("#partner-back-btn").on("click", function(){
        if(p_cur > 1){
            $(".partner-block").animate({
                left: "+=100%",
            }, 1000);
            p_cur--;
        }
    });

    $(window).on("resize", function(){
        partner_init();
    });
    
})