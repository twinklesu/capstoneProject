function previous() {
    
}

function next() {
    
}

function hi() {
    console.log('hi');
  }

// document.getElementById("start").onclick = hi();

// document.addEventListener('DOMContentLoaded', function () {
//     //var btns = document.querySelectorAll('button');
//    // for (var i = 0; i < btns.length; i++) {
//         //let btn = btns[i];
//     if(btn.id == "start") {
//         btn.addEventListener('click', hi);
//     }
    
//   //  }
//     });

document.addEventListener('DOMContentLoaded', function(){
    var start = document.getElementById("start");
    start.addEventListener("click", function(){
        console.log("hi");
    });
});
