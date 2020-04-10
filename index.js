var nextBtn = document.getElementById("nextButton");
var preBtn = document.getElementById("preButton");
var slider = document.getElementById("slider");
var main= document.querySelector('.main')
var widthItem = document.querySelector(".item").offsetWidth;
var heightItem = document.querySelector(".item").offsetHeight;
var numItem = slider.querySelectorAll(".item").length;
var currentPosition = 0;
let done=true
// 1 biến để giúp ta control được slider đang ở đâu
var widthSlider = numItem * widthItem;
// ta sẽ lấy số lượng item trong slide nhân với width của mỗi item để ra toàn bộ width của slider 
nextBtn.addEventListener("click",nextSlider);
preBtn.addEventListener("click",backSlider);
main.addEventListener('wheel',(e)=>{
    if(e.deltaY < 0){
        backSlider()
    }
    else if(e.deltaY > 0){
        nextSlider()
    }
    
})

slider.addEventListener("webkitTransitionEnd",()=>{
    done=true
})


const createClone = function genClone() {
    const numItems = slider.getElementsByClassName("item").length;
    const firstChild = slider.getElementsByClassName("item").item(0); // xác định first slide
    const lastChild = slider.getElementsByClassName("item").item(numItems -1); // xác định last slide
    const cloneLastChild = lastChild.cloneNode(true); // thực hiện tạo ra 1 last slide mới 
    const cloneFirstChild = firstChild.cloneNode(true); // thực hiện tạo ra 1 first slide mới 
    cloneLastChild.classList += " clone"; // 
    cloneFirstChild.classList += " clone"; // add class clone (bạn có thể add bất cứ class gì bạn muốn)
    slider.insertBefore(cloneLastChild,firstChild); // thêm last slide vào phía trước slide đầu tiên 
    slider.insertBefore(cloneFirstChild,lastChild.nextSibling); // thêm first slide vào cuối slider 
    numItem += 2;
}
createClone(); // gọi hàm createClone đầu tiên để slide khởi tạo sẽ tạo clone trước 

function nextSlider(){
    if(done==false) return
    currentPosition -= widthItem;
    done=false  
    checkPosition();
}

function backSlider(){
    if(done==false) return
    currentPosition += widthItem;
    done=false
    checkPosition(); 
}

// currentPosition là vị trí hiện tại của slider
// mỗi lần slide , slider sẽ di chuyển 1 đoạn đúng bằng với width của 1 slide item (widthItem)
// hàm checkPosition thực hiện di chuyển slider 

function checkPosition() {
    distantSlide = "translate("+ (currentPosition) + "px)";
    slider.style.transform = distantSlide; 
   if(currentPosition == -(widthItem*(numItem -2)))  {
        slider.style.transform = "translateX(" + currentPosition + "px)";         
        setTimeout(function(){
            slider.style.transition = "0s";
            currentPosition = 0;
            done=true
            slider.style.transform = "translateX(" + currentPosition + "px)"; 
        }, 400);
   }else {
        slider.style.transition = "0.5s";
   }
    // khi slider tới vị trí của slide cuối cùng nếu bấm next slide tiếp thì sẽ thực hiện translate đến vị trí của clone element cuối slide 
    // clone element cuối slide ở đây là 
    // <div class="item red clone">1</div>
    // ngay khi slide đến clone element cuối ngay lập tức remove transition của slider và dịch chuyển về slide đầu tiên của slider 
    // và sau khi dịch chuyển về slide đầu tiên add transition trở lại slider
    // hình dưới đây sẽ giãi thích vì sao cần remove transition

    if(currentPosition == widthItem) {
        slider.style.transform = "translateX(" + currentPosition + "px)";
        
        setTimeout(function(){
            slider.style.transition = "0s";
            currentPosition = -(widthItem*(numItem -3));
            done=true
            slider.style.transform = "translateX(" + currentPosition + "px)"; 
        }, 400);
    }
    else {
        slider.style.transition = "0.5s";
    }
    // khi slider lùi tới vị trí của slide đầu tiên  nếu bấm back slide tiếp thì sẽ thực hiện translate đến vị trí của clone element đầu slide
    // clone element cuối cùng ở đây là:
    // <div class="item yellow clone">3</div>
    // ngay khi slide đến clone element đầu slide ngay lập tức remove transition của slider và dịch chuyển về slide cuối  của slider 
    // và sau khi dịch chuyển về slide cuối add transition trở lại slider
    // hình dưới đây sẽ giãi thích vì sao cần remove transition
}