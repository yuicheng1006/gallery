// 從遠端取得 API 資料

let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        // console.log(this.responseText);
    }
});

xhr.open("GET", "https://emma.pixnet.cc/album/elements?set_id=4555593&user=jiney&format=json");

xhr.send();

xhr.onload = function () {
    if (xhr.status != 200) {
        return;

    }
    imgAry = JSON.parse(xhr.responseText);


    getUserName();
    getImgInfo();

}
// 取得作者名字
let getUserName = () => {
    let userName = document.querySelector('.user-name');
    userName.innerHTML = `<div class="user-name">${imgAry.set.user.name}'s</div>`;
}

// 取得照片資訊

let getImgInfo = () => {
    let gallery = document.querySelector('.gallery');
    let str = "";
    console.log('imgAry', imgAry);
    imgAry.elements.forEach(element => {
        str += `
                <li class="gallery-item">
                    <div class="item-image" id="${element.id}" style="background-image:url('${element.thumb}')"></div>
                    <div class="item-name">
                        <span>${element.title}</span>
                    </div>
                </li>
    `
    });
    gallery.innerHTML = str;
}


// 當前圖片
let galleryItem = document.querySelector('.gallery');
// lightbox 的背景
let backgroundCover = document.querySelector('.background-cover');
// 輪播圖
let lightBox = document.querySelector('.lightbox');
// 顯示目前的照片
let slideImg = document.querySelector('.slide-img');
// title
let imgName = document.querySelector('.img-name');
// 當前頁
let photoCurren = document.querySelector('.photo-curren');
// 照片總數量
let photoTotal = document.querySelector('.photo-total');



// 顯示當前圖片
let getLightBox = (e) => {
    imgAry.elements.forEach(event => {
        if (e.target.id == event.id) {
            backgroundCover.style.display = 'block';
            lightBox.style.display = 'flex';
            slideImg.style.backgroundImage = `url('${event.thumb}')`;
            imgName.textContent = event.title;
            photoCurren.textContent = parseInt(event.position) + 1;
            slideImg.dataset.num = event.position;

        };
        photoTotal.textContent = imgAry.elements.length;
    });
};
galleryItem.addEventListener('click', getLightBox);



// 切換上一張照片

// 前一個按鈕監聽
let preArrow = document.querySelector('.pre-arrow');
let sum = 0;
preArrow.addEventListener('click', () => {
    sum = parseInt(slideImg.dataset.num);
    console.log('sum', sum);
    if (slideImg.dataset.num == 0) {
        slideImg.dataset.num = 7;
        photoCurren.textContent = 8;
        imgName.textContent = imgAry.elements[7].title;
        slideImg.style.backgroundImage = `url('${imgAry.elements[7].thumb}')`;
        sum = 8;
    } else {
        slideImg.dataset.num = sum - 1;
        photoCurren.textContent = sum;
        imgName.textContent = imgAry.elements[sum - 1].title;
        slideImg.style.backgroundImage = `url('${imgAry.elements[sum-1].thumb}')`;
        sum = sum - 1;
    }


});


// 切換下一張照片

// 後一個按鈕監聽
let nextArrow = document.querySelector('.next-arrow');
nextArrow.addEventListener('click', () => {
    sum = parseInt(slideImg.dataset.num);
    if (slideImg.dataset.num == 7) {
        photoCurren.textContent = 1;
        slideImg.dataset.num = 0;
        imgName.textContent = imgAry.elements[0].title;
        slideImg.style.backgroundImage = `url('${imgAry.elements[0].thumb}')`;
        sum = 0;
    } else {
        slideImg.dataset.num = sum + 1;
        photoCurren.textContent = sum + 2;
        imgName.textContent = imgAry.elements[sum + 1].title;
        slideImg.style.backgroundImage = `url('${imgAry.elements[sum+1].thumb}')`;
        sum = sum + 1;
    }
});


// 先判斷按下去的按鈕取得的值是多少
// 再去做接下來的判斷

// 點擊外面背景關閉 lightbox

backgroundCover.addEventListener('click', () => {
    backgroundCover.style.display = 'none';
    lightBox.style.display = 'none';
});