const {data} = require('./data.js');

let  Arguments = process.argv.slice(2); //get arguments(obtenir des arguments)

if(Arguments.length == 0){ //if not arguments return false(sinon les arguments retournent faux)
    console.log("Processus Nodejs Nécessite des arguments supplémentaires pour continuer, vous devez probablement écrire le node app.js --abc pour continuer");
    return false;
  }

  if( Arguments[0] == "--filter=ry"){
     //search animal name that has "ry" in it(rechercher le nom de l'animal qui contient "ry")
        let Results = data.map(({people}) => people.filter(e => {
            e.animals = e.animals.filter(a => a.name.includes("ry"));
            if(e.animals.length!=0){
            return e;
            }
        }));

        let f_Results = Results.flat(); // creates a new array with found animals(crée un nouveau tableau avec des animaux trouvés)
        console.log(JSON.stringify(f_Results, undefined, 2));

}else if(Arguments[0] == "--count"){
    
    //Count Children found in Array(Compter les éléments enfants trouvés dans le tableau)
      const Counted_Array = data.map(e => {
        e.name  = `${e.name} [${e.people.length}]`;
        e.people.filter(p=> p.name = `${p.name} [${p.animals.length}]`);
        return e;
      });
    
    console.log(JSON.stringify(Counted_Array, undefined, 2));

}else{
    console.log("Arguments non valides");
}
