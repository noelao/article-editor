// ini akan dikirim ke client
// sedangkan di server akan memilihkan parrams sesuai id
var ini = {
    id:"1",
    content:[
        {
            id:"1",
            isi:"<h2>Jerapah</h2>",
            type:"h2",
        },
        {
            id:"2",
            isi:"<h2>Marmoet Marmoet <a href='https://www.youtube.com/' target='_blank'>jarimanis</a></h2>",
            type:"h2",
        },
        {
            id:"3",
            isi:"<h2>Harimau</h2>",
            type:"h2",
        },
        {
            id:"4",
            isi:"<p>Harimau</p>",
            type:"p",
        },
    ]
}

var hapuslah = document.querySelector(".container .wrapper .pilihan")
hapuslah.remove()

function loadAndTampilkanApi(){
    const pilihLaluHapus = document.querySelectorAll(".container .wrapper .pilihan");
    pilihLaluHapus.forEach((ini) => {
        ini.remove()
    })

    for(i in ini.content){
        var wrapper = document.querySelector(".container .wrapper")
    
        // fungsi content.type adalah saat tulis ulang
        const isian = `
                <div class="pilihan" key="${ini.content[i].id}" type="${ini.content[i].type}" style="--delayIni: ${parseInt(ini.content[ini.content.length-parseInt(i)-1].id) / 10}s">
                    ${
                        ini.content[i].type == "h2" ? 
                            `<div class="content">
                                ${ini.content[i].isi}
                            </div>`
                        :
                        ini.content[i].type == "p" ? 
                            `<div class="content">
                                ${ini.content[i].isi}
                            </div>`
                        :    
                        ""
                        }
                    <div class="opsi">
                        <div class="tombol" title="Edit" onclick = editContent(${ini.content[i].id})>
                            <p>E</p>
                        </div>
                        <div class="tombol" title="Delete" onclick = deleteContent(${ini.content[i].id})>
                            <p>D</p>
                        </div>
                    </div>
                </div>
                `
        
        wrapper.innerHTML += isian
    
    }
}
loadAndTampilkanApi();


function tambahkanContent() {
    // check perubahan
    if(perubahan){
        alert("anda belum menyimpan perubahan.")
        return ;
    }

    // cara dapetin id
    // ketika id di delete maka id yang lebih besar dari di di delete akan - 1
    const idIni = ini.content.length + 1


    const defa = {
        id:`${idIni}`,
        isi:"<h2>Harimau Jawir</h2>",
        type:"h2"
    }
    ini.content.push(defa)
    loadAndTampilkanApi();
}

var terpilih
var isinya
var terpilihKey
var terpilihType

var papanTulis

const inputan = document.querySelector(".inputan")

// trigger bila edit tapi tidak confirm
var perubahan = false
function editContent(key){
    // check perubahan
    if(perubahan){
        alert("anda belum menyimpan perubahan.")
        return ;
    }

    perubahan = true
    const keyIni = key
    const pilihan = document.querySelectorAll(".container .wrapper .pilihan");


    pilihan.forEach((inian) => {
        const keys = inian.getAttribute('key');
        if(keys == keyIni){
            terpilih = inian
        }
    })

    papanTulis = inputan.querySelector("input")
    
    terpilihKey = terpilih.getAttribute("key")
    terpilihType = terpilih.getAttribute("type")

    isinya = terpilih.querySelector(`.content ${terpilihType}`).innerHTML

    papanTulis.value = isinya

    papanTulis.focus()

    editContent2(papanTulis)

    console.log(terpilihKey)
}
function checkPerubahan(){
    if(perubahan){
        alert("anda belum menyimpan perubahan.")
        return ;
    }
}


function deleteContent(key){
    console.log("delete key : ", key)

    const valueToRemove = ini.content[parseInt(key)-1]
    
    // cara kebalikan dari push
    // index = ini.content.indexOf[valueToRemove]
    // console.log(valueToRemove)
    // bisa saja 
    index = parseInt(key)-1

    // bisa saja pakai key-1
    if(key-1 > -1){
        console.log(index)
        ini.content.splice(index, 1);
    }
    console.log(ini.content)

    // urutkan id
    for(i in ini.content){
        ini.content[i].id = parseInt(i) + 1
    }

    loadAndTampilkanApi();
}

function editContent2(papanTulis){
    var papanTulis = papanTulis
    papanTulis.addEventListener("keyup", function(){
        terpilih.querySelector(`.content ${terpilihType}`).innerHTML = papanTulis.value
        isinya = papanTulis.value
    })
}
function tulisKeTerpilih(){
    terpilih.querySelector(`.content ${terpilihType}`).innerHTML = papanTulis.value
}

// tombol Confirm
function tulisUlang(){
    perubahan = false

    // ini.content[terpilihKey].isi = `<h2>${isinya}</h2>`
    ini.content[parseInt(terpilihKey)-1].isi = `<${terpilihType}>${isinya}</${terpilihType}>`

    papanTulis.removeEventListener("keyup", tulisKeTerpilih());

    papanTulis.value = ""

    loadAndTampilkanApi();
}
