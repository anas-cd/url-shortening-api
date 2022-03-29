// doc elements
const body = document.body;
const burger = document.querySelector("#BurgerMenue"); 
const menue = document.querySelector("div.nlc");
const cbtn = document.getElementsByClassName("copy");
const url = document.querySelector("#url");
const urlbtn = document.querySelector("form button");
const form = document.querySelector("form");
const LinkList = document.querySelector(".LinkList"); 

// api variables
const api_url = 'https://api.shrtco.de/v2/shorten?url='; 
let url_link; 

// variables 
let LinksHistory = [];
let LinkPast =[];


// Global
app.global = {
    init: function(){ // Load all global functions here
        console.log("app initiated");

        
        let arr = [];

        try {
            arr = JSON.parse(localStorage.getItem("itemarr"));
        } catch (error) {
            console.log(error);
        }
        
        if (arr) {  
            console.log("getting data from local storage");

            for (let i = 0; i < arr.length; i++) {

                LinksHistory.push(arr[i]);
    
                app.global.populate(arr[i][0],arr[i][1]);
                
            }
            console.log(arr);
        }

        

        
    },
    MobMenue: function(){ // Some specific function
        console.log("MobMenue()");

        if (body.classList.contains("MobMenue") ){
            body.classList.remove("MobMenue");
        } else {
            body.classList.add("MobMenue");
        }
         
    },
    shortly: async function (url) {
        console.log("shortly accessed");

        url_link = api_url + url; 

        const responce = await fetch(url_link); 

        let data = await responce.json(); 

        LinksHistory.push([data.result.original_link,data.result.full_short_link]);

        console.log("saving to local storage");
        localStorage.setItem("itemarr", JSON.stringify(LinksHistory));


        await app.global.populate(data.result.original_link,data.result.full_short_link);

       
        
    },
    populate: function (original_link,full_short_link) {

        let div = document.createElement("div");
        let aLink = document.createElement("a");
        let aSLink = document.createElement("a"); 
        let cpybtn = document.createElement("button"); 

        div.classList.add("LinkElement");
        aLink.classList.add("link"); 
        aSLink.classList.add("SLink"); 
        cpybtn.classList.add("copy"); 

        aLink.href = original_link; 
        aSLink.href = full_short_link;

        let LinkNode = document.createTextNode(original_link);
        let SLinkNode = document.createTextNode(full_short_link); 
        let cpybtntxt = document.createTextNode("Copy");

        aLink.appendChild(LinkNode);
        aSLink.appendChild(SLinkNode);
        cpybtn.appendChild(cpybtntxt); 

        div.appendChild(aLink);
        div.appendChild(aSLink);
        div.appendChild(cpybtn);

        LinkList.prepend(div); 

        // updating event listeners for copy button 
        for (let i = 0; i < cbtn.length; i++) {
        
        const element = cbtn[i];
        let histcount = LinksHistory.length - (i + 1); 
        element.addEventListener('click', async () => {

            navigator.clipboard.writeText(LinksHistory[histcount][1]);

            element.innerHTML = "Copied!";
            setTimeout(() => {
                element.innerHTML = "Copy";
            }, 2000);
        });
            
        }

    }
}

// Run the global stuff
app.global.init();

burger.addEventListener('click', () => {

    app.global.MobMenue()
});

urlbtn.addEventListener('click', () => {
    let link = url.value;

    if (link) {
        console.log("link found");

        (form.classList.contains("nolink"))? form.classList.remove("nolink") : '';

        app.global.shortly(link);

    }else form.classList.add("nolink");
    
});

