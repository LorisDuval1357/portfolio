let bouton1=0;
let bouton2=0; //Création de 3 boutons.
let bouton3=0; 
document.getElementById("b1").addEventListener("click",() => {
    if (bouton1==0){ document.getElementById("t1").textContent="Melee Burger, SmashFries & SmashDrink";
        bouton1=1;
    }                                                              //ici dans ce if else, je test si l'on a cliqué sur le bouton ou pas, 
                                                                //si l'on clique sur le bouton cela nous affiche le texte noté dans le TextContent, 
    else
    {                                                      //si il n'est pas cliqué rien ne s'affiche
        document.getElementById("t1").textContent="";
        bouton1=0; 
    }
})
document.getElementById("b2").addEventListener("click",() => {
    if (bouton1==0){ document.getElementById("t2").textContent="Brawl Tacos, SmashFries & SmashDrink ";
        bouton1=1;
    }
    else
    {
        document.getElementById("t2").textContent="";
        bouton1=0; 
    }
})
document.getElementById("b3").addEventListener("click",() => {
    if (bouton1==0){ document.getElementById("t3").textContent="Melee Burger, Brawl Tacos, SmashFries & SmashDrink ";
        bouton1=1;
    }
    else
    {
        document.getElementById("t3").textContent="";
        bouton1=0; 
    }
})

s