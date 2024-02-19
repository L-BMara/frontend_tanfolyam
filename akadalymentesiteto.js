const c_white = "rgb(248, 248, 248)";
const c_black = "black";

const c_bg = "transparent";

function resetMenuDisplay(p_element, p_hide){
    let v_html = document.getElementById(p_element);

    if (p_hide == 1){
        v_html.style.display = "none";
    }
    else{
        v_html.style.display = "block";
    }    
}

function resetClassColors(p_class_name, p_reset){
    let v_class = document.getElementsByClassName(p_class_name);

    for(let i = 0; i < v_class.length; i++) {
        if (p_class_name =="set_div" && p_reset == 1){
            v_class[i].style.backgroundColor = c_white;
            v_class[i].style.color = c_black;
        }
        else if (p_reset ==1){
            v_class[i].style.backgroundColor = c_black;
            v_class[i].style.color = c_white;
        }
        else{
            v_class[i].style.background = c_bg;
        }
      }
}

function resetBodyColor(p_reset){
    let v_body = document.querySelector("body");
    let v_html = document.querySelector("html");

    if (p_reset == 1){
        v_body.style.backgroundColor = c_white;
        v_html.style.backgroundColor = c_white;
    }
    else{
        v_body.style.background = c_bg;
        v_html.style.background = c_bg;
    }    
}

function resetSearchBtn(p_elemt_id, p_reset){
    let v_seacrh = document.getElementById(p_elemt_id);
    
    if (p_reset == 1){
        v_seacrh.innerHTML = 'Keresés';
        v_seacrh.style.color = c_black;
    }
    else{
        v_seacrh.innerHTML = '<i class = "fa fa-search"></i>';
    } 
}

function resetPage(){
    let v_access = document.getElementById("access");
    let v_classic = document.getElementById("classic");
    let v_normal = document.getElementById("normal");
    let v_is_checked = document.querySelector('#access').checked;

    v_access.addEventListener('change', function() {
        if (this.checked) {
            v_is_checked = 1;
        } 
        resetMenuDisplay("menu", v_is_checked);
        resetClassColors ("set_footer_header", v_is_checked);
        resetClassColors ("set_div", v_is_checked);
        resetBodyColor(v_is_checked);
        resetSearchBtn("searc_button", v_is_checked);
      });

    
      v_classic.addEventListener('change', function() {
        if (this.checked) {
            v_is_checked = 0;
        } 
        resetMenuDisplay("menu", v_is_checked);
        resetClassColors ("set_footer_header", v_is_checked);
        resetClassColors ("set_div", v_is_checked);
        resetBodyColor(v_is_checked);
        resetSearchBtn("searc_button", v_is_checked);
      });
      
    
    v_normal.addEventListener('change', function() {
        if (this.checked) {
            v_is_checked = 0;
        } 
        resetMenuDisplay("menu", v_is_checked);
        resetClassColors ("set_footer_header", v_is_checked);
        resetClassColors ("set_div", v_is_checked);
        resetBodyColor(v_is_checked);
        resetSearchBtn("searc_button", v_is_checked);
      });


      resetMenuDisplay("menu", v_is_checked);
      resetClassColors ("set_footer_header", v_is_checked);
      resetClassColors ("set_div", v_is_checked);
      resetBodyColor(v_is_checked);
      resetSearchBtn("searc_button", v_is_checked);

}

resetPage();