var animated = true;

$(window).on('scroll resize', check_if_in_view);
$(window).trigger('scroll');

$("#partner-btn").on("click", function(){
    $(this).hide();
    $(".partner-list").each(function(){
        if($(this).css("display") == "none"){
            $(this).css("display", "flex");
            check_if_in_view();
        }
    });
});

function check_if_in_view(){
    $(".animation-element").each(function(){
        animated = true;
        if(!$(this).hasClass("in-view")){
            animated = false;
            return false;
        }
    });
    if(!animated){
        var window_height = $(window).height();
        var window_top_position = $(window).scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        
        $(".animation-element").each(function(){
            var element_height = $(this).outerHeight();
            var element_top_position = $(this).offset().top;
            var element_bottom_position = (element_top_position + element_height);

            if((element_bottom_position >= window_top_position) &&(element_top_position <= window_bottom_position - 60)){
                $(this).addClass('in-view');
            }
        });
    }
}