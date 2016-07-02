const apps = window.apps;
const init = () => {
    let elem_apps = document.getElementById("apps");
    for (let i = 0, l = apps.length; i < l; ++i) {
        let elem_li = document.createElement("li");
            let elem_div1 = document.createElement("div");
                let elem_a = document.createElement("a");
                elem_a.href = `apps/${apps[i].id}/index.html`;
                    let elem_icon = document.createElement("img");
                    elem_icon.src = `image/apps/${apps[i].id}.png`;
                    elem_icon.alt = apps[i].title;
                elem_a.appendChild(elem_icon);
            elem_div1.appendChild(elem_a);
        elem_li.appendChild(elem_div1);
            let elem_div2 = document.createElement("div");
            elem_div2.innerText = apps[i].title;
        elem_li.appendChild(elem_div2);
        elem_apps.appendChild(elem_li);
    }
}
init();
