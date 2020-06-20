

$(function() {
  console.log("hello");
  
  $("div.list-head").click(function() {
    $(this).next(".table").slideToggle(800);
    
  });
  
  
});