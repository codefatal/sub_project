window.onload = function(){

let checkbox = document.getElementById("check-slide-item-0");
let firstcat= document.getElementById("firstcat");


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