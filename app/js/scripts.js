(function(){


  $('.type-button').click(function(){
    $(this).siblings().removeAttr('id');
    $(this).attr('id', 'selected');

  });

}());
