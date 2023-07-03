window.onload = function(){

let checkbox = document.getElementById("check-slide-item-0");
let firstcat= document.getElementById("firstcat");

// $(".input-label").on("checked", function(e){
//     console.log("실행");
// });
checkbox.addEventListener("click", function(){
    console.log("실행");
    console.log(checkbox.checked);
    if(checkbox.checked){
        firstcat.style.display="block";
    } else{
        firstcat.style.display="none";
    }
});

};