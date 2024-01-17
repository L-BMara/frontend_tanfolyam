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