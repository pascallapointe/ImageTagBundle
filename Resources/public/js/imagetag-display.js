$(document).on("mouseover", ".tagged", function(){
    if($(this).find(".openDialog").length == 0){
        $(this).css("border-style","solid");
        $(this).find(".tagged_box").css("display","block");
        $(this).find(".tagged_title").css("display","block");
    }
});

$(document).on("mouseout", ".tagged", function(){
    if($(this).find(".openDialog").length == 0){
        $(this).find(".tagged_box").css("display","none");
        $(this).css("border-style","none");
        $(this).find(".tagged_title").css("display","none");
    }
});

var showTags = function(context){

    $(".tagged", context).each(function(){
        $(this).css("border-style","solid");
        $(this).find(".tagged_box").css("display","block");
        $(this).find(".tagged_title").css("display","block");
    });
};

var hideTags = function(context){

    $(".tagged", context).each(function(){
        $(this).find(".tagged_box").css("display","none");
        $(this).css("border-style","none");
        $(this).find(".tagged_title").css("display","none");
    });
};

var ajaxRequest = function(init, context) {

    var ajaxRoute = $('.ajaxRoute', context).val();
    var imageWidth = $(".imageMap", context).width();
    var imageHeight = $(".imageMap", context).height();

    $.ajax({
        url: ajaxRoute + '&init=' + init + '&width=' + imageWidth + '&height=' + imageHeight + '&htmlcontent=' + encodeURIComponent($('.tagz', context).html())
    }).done(function ( data ) {

        $('.tagz', context).html(decodeURIComponent(data));

    });
}

