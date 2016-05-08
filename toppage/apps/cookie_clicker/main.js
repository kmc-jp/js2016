let pointer_num = 1, cookie_num = 0;
let price = 50;
let update = () => {
    document.getElementById("cookie_num").innerText = cookie_num;
    document.getElementById("pointer_num").innerText = pointer_num;
};
let bake = () => {
    cookie_num = cookie_num + pointer_num;
    update();
};
let buy = () => {
    if (cookie_num >= price) {
        cookie_num = cookie_num - price;
        pointer_num = pointer_num + 1;
        update();
    }
};
document.getElementById("bake").addEventListener("click", (e) => {
    bake();
});
document.getElementById("btn_buypointer").addEventListener("click", (e) => {
    buy();
});
document.getElementById("btn_buypointer").innerText = `購入 (${price} Cookie)`;
