var p_cur = 1,
    p_name = ["臺北醫學大學",
    "臺北市信義區大道\n社區發展協會",
    "台北市萬華區\n忠貞里中正新城\n社區發展協會",
    "台北市北投區林泉\n社區發展協會",
    "台北市文山區德芳\n社區發展協會",
    "臺北市文山區樟新\n社區發展協會",
    "社團法人\n中華基督教\n合一宣教協會",
    "臺北市興隆老人\n日間照顧中心",
    "佛光山大慈佛社\n",
    "台北市文山區\n順興社區發展協會",
    "臺北市文山區\n萬興里辦公室",
    "臺北市文山區\n試院里辦公室",
    "財團法人\n信義公益基金會",
    "社團法人台南市\n基督教青年會",
    "財團法人伊甸\n社會福利基金會\n(宜蘭社區服務中心)",
    "台北市政府社會局\n文山景美社會福利\n服務中心",
    "台北市文山區\n明興社區發展協會",
    "財團法人基督教\n救世軍內湖隊",
    "國立政治大學\n大學社會責任辦公室",
    "屏東縣私立柏愛\n老人養護中心"],
    len_div;

function partner_init(){
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

partner_init();

for(var i = 0; i < p_name.length; i++){
    if(p_name[i] == ""){
        $(".partner-block").append($('<div/>').addClass("partner-card"));
    }
    else{
        $(".partner-block").append(
            $('<div/>').addClass("partner-card").append(
                [$('<div/>').addClass("partner-activity-img").css("background-image", "url(./img/activity/activity" + (i + 1) + ".jpg)"),
                $('<p/>').text(p_name[i])]
            )
        );
    }
}

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