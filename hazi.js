
/*Újrakeresés funkció miatt, hogy ne kelljen az oldalt újra betölteni tárolom constanban az eredeti html kódot*/
const old_html = document.querySelector("#page").innerHTML;

function countWords(p_name) {
    /*getElementsByName használata hogy a nevesített megfelelő div-et megtaláljam, és betöltsem egy collcection-be*/
    let v_html= document.getElementById(p_name);
    /*objektumból csak a szöveges tartalom kiszedése, valmaint vágása. Collection 0. eleme tartalmazza a html részletet ami nekem kell
    A text egy tömb amibe tároljuk a honlap szöveges tartalmát*/
    console.log(v_html);
    let v_text = v_html.textContent.split(" ");
    let v_count = 0;

    /*szó számolás regurálissal*/
    for(v_word of v_text) {
            /*kis és nagybetűk vaamint számokat tartalmazhat regulárisan kifejezve a szó.
            A teszt kifejezetten a regulárishoz tartozik JS-ben és ha egyezés van true lesz az értéke*/
        if(/[a-zA-Z0-9]/.test(v_word)){
            v_count = v_count+1;
        }
    }   

    return v_count;
}

function calcReadingTime(p_page_word_count){

    /*olvasási sebesség kalkulálása*/ 
    let v_read_speed = p_page_word_count/200;
    let v_read_speed_string = v_read_speed.toString() + 0;
    /*vágás perc másodperc-re*/ 
    let v_read_min = v_read_speed_string.substr(0,v_read_speed_string.indexOf("."));
    let v_read_sec = v_read_speed_string.substr(v_read_speed_string.indexOf(".")+1,2);
    /*ellenőrző log*/ 
    console.log("read_speed_string: " + v_read_speed_string);
    console.log("read_min: " + v_read_min);
    console.log("read_sec: " + v_read_sec);
    
    /*végső kalkuláció percben megadva*/
    v_read_min = Number(v_read_min) + Number(v_read_sec/60);

    /*kerekítés*/
    return Math.round(v_read_min);
}

function addReadingTimeToHtml(p_name, p_where)
{
    let v_page_count_word = countWords(p_name);
    console.log("count:" + v_page_count_word);

    let v_page_read_speed_min = calcReadingTime(v_page_count_word);
    console.log("readspeed:" + v_page_read_speed_min);

    let v_place = document.querySelector(p_where);
    let v_paragraph = document.createElement("p");
    /*kicsit más a szövegezése a teljes valamitn a rész egységeknek*/
    if (p_name === "arctile")
    {
        v_paragraph.textContent = "Az oldal " + v_page_count_word + " szót tartalmaz. Az elolvasása " + v_page_read_speed_min + " percbe fog telni. Jó olvasást!";
    }
    else
    {
        v_paragraph.textContent = "A cikk szakasz " + v_page_count_word + " szót tartalmaz. Az elolvasása " + v_page_read_speed_min + " percbe fog telni.";
    }
    v_place.append(v_paragraph);
}

function searcher(){

    let v_serached_str = "";
    let v_html = document.querySelector("#page");
    let v_content = v_html.innerText;
    /*új soronként darabolom a html-em, hogy meg tudjam keresni és ki tudjam cserélni a megfelelő részeket*/
    let v_content_array = document.querySelector("#page").innerHTML.split(/\r?\n/);

    /*Az előzőleg CreateElement-tel létrehozott és setAttribute al search_input id-val rendelkező input értékének kiszedése string-be a kereséshez.*/
    v_serached_str = document.getElementById("search_input").value;

    if (v_serached_str.length < 2)
    {
        confirm("Kérlek legalább 2 karakterű szöveget adj meg");
    }
    else if (v_content.search(v_serached_str) === -1)
    {
        confirm(`Nem található a cikkben a keresett szöveg: ${v_serached_str}`);
    }
    else
    {
        /*ciklussal végigmegyek a \n-enként darabolt html kódomon, hogy megkeressem és kicseréljem <span...-el a kereett szövegrészt*/
        for(let i=0; i<v_content_array.length; i++)
        {
            /*Ha nem img tag vagy div tag és van találat akkor cseréljük ki egy változóba a megtalált szövegrészt <span... -al, majd ezt tegyük be megfelelő helyen az innerHTML-be*/
            if (v_content_array[i].search(v_serached_str) != -1 && v_content_array[i].search("<img") === -1 && v_content_array[i].search("<div") === -1)
            {
                let v_chamged = v_content_array[i].replace(v_serached_str,`<span class="highlighter">${v_serached_str}</span>`);
                document.querySelector("#page").innerHTML = document.querySelector("#page").innerHTML.replace(v_content_array[i], v_chamged);
            }
        }
    }
    addReadingTimeToHtml("arctile", "#readspeed");
    addReadingTimeToHtml("div_violin", "#readspeed_violin");
    addReadingTimeToHtml("div_viola", "#readspeed_viola");
    addReadingTimeToHtml("div_chello", "#readspeed_chello");
}

function addSeracher ()
{
    /*kereső textarea hozzáadása*/

    let v_searcherColumn = document.querySelector("#search");
    let v_input = document.createElement("INPUT");
    v_input.placeholder = "Keresés";
    v_input.style.margin = "15px";
    v_searcherColumn.append(v_input);
    v_input.setAttribute('id', 'search_input')
    document.getElementById("search_input").style.margin = "20px";  
    document.getElementById("search_input").style.resize = "none";  
    document.getElementById("search_input").style.width = "20em";  

    /*kereső gomb*/
    var v_search_btn = document.createElement("BUTTON");
    v_search_btn.setAttribute('id', 'searc_button')
    v_search_btn.innerHTML = '<i class = "fa fa-search"></i>';
    v_searcherColumn.append(v_search_btn);

}

function search(){

     addSeracher();

     /*keresés*/
     document.getElementById("search_input").addEventListener("keypress" , (event) => {if (event.key === 'Enter'){
                                                            /*keresés előtt visszaírom eredeti állapotára a html kódom*/
                                                            document.querySelector("#page").innerHTML = old_html;
                                                            searcher();
    }});

                                                    document.getElementById("searc_button").addEventListener("click", (event) => {document.querySelector("#page").innerHTML = old_html;
                                                    searcher()});                    /*gombbal is csak mert :)*/    
}

addReadingTimeToHtml("arctile", "#readspeed");
addReadingTimeToHtml("div_violin", "#readspeed_violin");
addReadingTimeToHtml("div_viola", "#readspeed_viola");
addReadingTimeToHtml("div_chello", "#readspeed_chello");

search();

/*api hívás*/

/*random szám generálás az json elem emghatározásához*/
function generateRandom(p_length)
{
    let v_rnd = Math.round(Math.random() * p_length);
    console.log(v_rnd);
    return v_rnd;
}

/*Szerző div létrehozása*/

function createAuthorPart (p_data)
{
    let v_place = document.querySelector('#arctile');
    let v_author_div = document.createElement('div');
       
    v_author_div.id = 'author';
    v_place.appendChild(v_author_div);
    document.getElementById('author').classList.add("set_div", "re_size");

    v_author_div.innerHTML+="<p>A cikket " + p_data["name"] + " írta.</p>";
    v_author_div.innerHTML+='<ul>Elérhetőségei:<li> email: <a href="mailto:' + p_data["email"] + '">' + p_data["email"] + '</a></li> <li>telefon: ' + p_data["phone"] + '</li></ul>';
    v_author_div.innerHTML+="<p>A cég ahol dolgozik: " + p_data["company"]["name"] + "</p>";
}

/*api hívás async + elem kiváklasztása*/

/*aszinkron hívást emgvalósító fv mely visszatér a válasszal*/
async function fetchUrl(p_url) {
    const c_response = await fetch(p_url);
    const c_data = await c_response.json();
    console.log(c_data);
    return c_data;
  }
  
function setAuthorData(p_url){
  /*meghavíjuk async fv kiiratjuk, tároljuk változóban amivel visszatérünk.*/  

  fetchUrl(p_url).then(v_data => {
    let v_rnd = generateRandom(Object.keys(v_data).length);
    createAuthorPart(v_data[v_rnd]);
  });
} 

setAuthorData('https://jsonplaceholder.typicode.com/users');
