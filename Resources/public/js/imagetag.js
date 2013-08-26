$(document).ready(function() {

    $('img').each(function(){
        if ( $(this).attr('class') == 'imageMap')    {
            $(this).click(function(e){

                var mapper = $('.mapper', $(this).parent());

                var image_left = $(this).offset().left;
                var click_left = e.pageX;
                var left_distance = click_left - image_left;

                var image_top = $(this).offset().top;
                var click_top = e.pageY;
                var top_distance = click_top - image_top;

                var mapper_width = mapper.width();
                var imagemap_width = $(this).width();

                var mapper_height = mapper.height();
                var imagemap_height = $(this).height();

                if((top_distance + mapper_height > imagemap_height) && (left_distance + mapper_width > imagemap_width)){
                    $(mapper).css("left", (click_left - mapper_width - image_left  ))
                        .css("top",(click_top - mapper_height - image_top  ))
                        .css("width","40px")
                        .css("height","40px")
                        .show();
                }
                else if(left_distance + mapper_width > imagemap_width){


                    $(mapper).css("left", (click_left - mapper_width - image_left  ))
                        .css("top",top_distance)
                        .css("width","40px")
                        .css("height","40px")
                        .show();

                }
                else if(top_distance + mapper_height > imagemap_height){
                    $(mapper).css("left", left_distance)
                        .css("top",(click_top - mapper_height - image_top  ))
                        .css("width","40px")
                        .css("height","40px")
                        .show();
                }
                else{


                    $(mapper).css("left",left_distance)
                        .css("top",top_distance)
                        .css("width","40px")
                        .css("height","40px")
                        .show();
                }


                mapper.resizable({ containment: "parent" });
                mapper.draggable({ containment: "parent" });

            });
        }
    })

    $('.mappercolor').click(function(){
        var context = '#' + $(this).parent().parent().parent().parent().parent().attr('id');

        $('.mapper', context).css({'border-color':$(this).css('backgroundColor')});
    });

});

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

$(document).on("click", ".edit_tag", function(e){
   editTag(this);
});

$(document).on("click", ".delete_tag", function(e){
    e.stopPropagation();
    deleteTag(this);
});

$(document).on("click", ".tagged", function(){
    if (!$(this).parent().hasClass('live')) {
        var context = '#' + $(this).parent().parent().parent().parent().attr('id');

        $(this, context).find(".tagged_box").html("<img class='delete_tag openDialog' src='/bundles/palapimagetag/images/del.png' value='Delete'  />"
            + "<img class='edit_tag' src='/bundles/palapimagetag/images/save.png' value='Save' />");



        var img_scope_top = $(".imageMap", context).offset().top + $(".imageMap", context).height() - $(this, context).find(".tagged_box", context).height() - 10;
        var img_scope_left = $(".imageMap", context).offset().left + $(".imageMap", context).width() - $(this, context).find(".tagged_box", context).width() - 10;

        $(this).draggable({ containment:[$(".imageMap", context).offset().left,$(".imageMap", context).offset().top,img_scope_left,img_scope_top]  });
    }
});

var addTag = function(context){
    var position = $('.mapper', context).position();


    var pos_x = position.left;
    var pos_y = position.top;
    var pos_width = $('.mapper', context).width();
    var pos_height = $('.mapper', context).height();

    // border-top-color instead of borderColor for mozilla compatibility
    var bordercolor = $('.mapper', context).css('border-top-color');

    $('.tagz', context).append('<div class="tagged" style="border: 5px none '+bordercolor+';width:'+pos_width+'px;height:'+
        pos_height+'px;left:'+pos_x+'px;top:'+pos_y+'px;" ><div class="tagged_box" style="width:'+pos_width+'px;height:'+
        pos_height+'px;display:none;" ></div><div class="tagged_title" style="top:'+(pos_height+5)+'px;display:none;" >'+
        $(".title", context).val()+'</div></div>');
    $(".tagged", context).css("border-style", "none");

    $(".tagged", context).css("border-style","none");
    $(".tagged", context).find(".tagged_box").css("display","none");
    $(".tagged", context).find(".tagged_title").css("display","none");
    $(".tagged", context).find(".delete_tag").remove();
    $(".tagged", context).find(".edit_tag").remove();


    $(".mapper", context).hide();
    $(".title", context).val('');
    $(".form_panel", context).hide();

    ajaxRequest(false, context);
};

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

var deleteTag = function(obj){

    var context = '#' + $(obj).parent().parent().parent().parent().parent().parent().attr('id');

    $(obj).parent().parent().remove();

    ajaxRequest(false, context);
};

var editTag = function(obj){

    var context = '#' + $(obj).parent().parent().parent().parent().parent().parent().attr('id');

    $(obj).parent().parent().draggable( 'disable' );
    $(obj).parent().parent().removeAttr( 'class' );
    $(obj).parent().parent().addClass( 'tagged' );
    $(obj).parent().parent().css("border-style","none");
    $(obj).parent().css("display","none");
    $(obj).parent().parent().find(".tagged_title").css("display","none");
    $(obj).parent().html('');

    ajaxRequest(false, context);
}

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

