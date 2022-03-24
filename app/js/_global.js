
const burger = document.querySelector("#BurgerMenue"); 
const menue = document.querySelector("div.nlc");
const body = document.body;
// Global
app.global = {
    init: function(){ // Load all global functions here
        console.log("load global functions");
        // app.global.MobMenue();
    },
    MobMenue: function(){ // Some specific function
        console.log("MobMenue()");

        if (body.classList.contains("MobMenue") ){
            body.classList.remove("MobMenue");
        } else {
            body.classList.add("MobMenue");
        }
         
    }
}

// Run the global stuff
app.global.init();

burger.addEventListener('click', () => {
    console.log("clickeddd");
    app.global.MobMenue()
});