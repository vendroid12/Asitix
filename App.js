//Importer des données
//Import data
const {data} = require('./data.js');
// Obtenir des arguments passés au processus de nœud
// Getting arguments passed to Node Process
let  Arguments = process.argv.slice(2);
//S'il n'y a aucun argument passé, nous devons montrer un message à l'utilisateur et arrêter.
//If there's no arguments passed, we need to show a message to the user and stop.
if(Arguments.length == 0){
  console.log("Processus Nodejs Nécessite des arguments supplémentaires pour continuer, vous devez probablement écrire le node app.js --abc pour continuer");
  return false;
}

console.log();

//check if data is an array or not before filter
//vérifier si les données sont un tableau ou non avant le filtre
if(data.length!=0){


    //Filtrer le tableau de données
    //filter array of data

    const FilterArray = () =>{
        let NewArray = [];
    //Getting Information whose animals contain `ry`;

    const SearchPattern = "ry";
    //Use map to loop thru the array (boucle à travers un tableau)
      data.map(o=>{ 
         //Clone the object. So any changes will not affect the original array.
        //(Clonez l'objet. Ainsi, toute modification n'affectera pas la matrice d'origine)
        o = Object.assign({},o);   
         //Use map to loop through array of people
         // boucle à travers un tableau de personnes
        o.people.filter(p=>{   

            // Trouver le nom de l'animal qui contient 'ry'
            //Find animal name that has 'ry' in it
           p.animals = p.animals.filter( a => a.name.includes(SearchPattern));  

          //We ignore other results whose animals returned empty array []
          //Nous ignorons les autres résultats dont les animaux ont renvoyé un tableau vide []
           if(p.animals.length != 0){
             let Animal_Match = { name: o.name, p}
             NewArray.push(Animal_Match);
           }

        });
    });


    console.log(JSON.stringify(NewArray, undefined, 2));
    }



    //Count Data
    //Compter
     const CountDataArray = (DataArray) =>{

        //we first reduce the array to a single value
        //nous réduisons d'abord le tableau à une seule valeur
        return DataArray.reduce((count, node) => {
             
            //Parent array (people)
            //Tableau parent (personnes)
            if (node.people) {
                //if we found people's array, we need to call CountDataArray function to count children there
                //si nous avons trouvé le tableau des personnes, nous devons appeler la fonction CountDataArray pour y compter les enfants
                var People_subcount = CountDataArray(node.people);
                node.name += ` [${People_subcount}]`;// get name and append counted children (// récupère le nom et ajoute les enfants comptés)
                return count + People_subcount;
            }


            //animals is children of peoples but since we used reduce we can access it on parent node.
           // We call also CountDataArray function to count children found

             //  animaux sont des enfants de peuples mais puisque nous avons utilisé réduire, nous pouvons y accéder sur le nœud parent.
            // Nous appelons également la fonction CountDataArray pour compter les enfants trouvés

            if (node.animals) {
                var Animal_subcount = CountDataArray(node.animals);
                node.name += ` [${Animal_subcount}]`; // get name and append counted children(// récupère le nom et ajoute les enfants comptés)
            }

            return count + 1; 
        }, 0);

     }


    if( Arguments[0] == "--filter=ry"){
        
        FilterArray();

    }else if(Arguments[0] == "--count"){

        CountDataArray(data);

        console.log(JSON.stringify(data, undefined, 2));

    }else{
        console.log("Arguments non valides");
    }

    
      
}