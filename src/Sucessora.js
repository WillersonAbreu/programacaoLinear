class sucessorClass {
  sucessor(atual2) {
   
    let changelog = [];
    let remain = [];

    let atual = [];

    atual['turmasAlocadas']     = atual2['turmasAlocadas'].map((arr) => arr.slice());
    atual['salasRemanescentes'] = [...atual2['salasRemanescentes']];
   

    for(let i = 0; i < atual['turmasAlocadas'].length; i++) remain.push(i);

    for(let i = 0; i < atual['turmasAlocadas'].length; i++) {
      let tryRemanescentes = false;

      let indexOrg = i;
      
      if(changelog.indexOf(indexOrg) !== -1) continue;


      if(atual['turmasAlocadas'].length - changelog.length >= 2) {

        let indexDest = -1;
        let notAllwd = [...changelog];
        
        do {
        
          indexDest = Math.floor(Math.random() * atual['turmasAlocadas'].length - 1) + 1;
          
          if(indexOrg == indexDest || notAllwd.indexOf(indexDest) !== -1) continue;
          else {
            let turmaOrg  = atual['turmasAlocadas'][indexOrg];
            let turmaDest = atual['turmasAlocadas'][indexDest];
            
            if(turmaOrg[0] >= turmaDest[1] && turmaDest[0] >= turmaOrg[1]) {

              let aux = turmaOrg[0];
              turmaOrg[0] = turmaDest[0];
              turmaDest[0] = aux;

              atual['turmasAlocadas'][indexOrg]  = turmaOrg;
              atual['turmasAlocadas'][indexDest] = turmaDest;

              changelog.push(indexOrg, indexDest);
              break;
            } else {
              
              notAllwd.push(indexDest);
              
              if(atual['turmasAlocadas'].length - notAllwd.length <= 1) {
                tryRemanescentes = true;
                break;
              }
            }
          }
        } while(indexOrg == indexDest || notAllwd.indexOf(indexDest) !== -1);
      }
      else if (atual['turmasAlocadas'].length - changelog.length == 1) {
        tryRemanescentes = true;
      }
      else break;

      if(tryRemanescentes) {
        let notAllwd = [];
        let indexDest = -1;

        do {
          indexDest = Math.floor(Math.random() * atual['salasRemanescentes'].length - 1) + 1;

          if(notAllwd.indexOf(indexDest) !== -1) continue;
          else {
            let turmaOrg  = atual['turmasAlocadas'][indexOrg];
            let turmaDest = atual['salasRemanescentes'][indexDest];
            
            if(turmaDest >= turmaOrg[1]) {
            
              let aux = turmaOrg[0];
              turmaOrg[0] = turmaDest;
              turmaDest = aux;

              atual['turmasAlocadas'][indexOrg]  = turmaOrg;
              atual['salasRemanescentes'][indexDest] = turmaDest;

              changelog.push(indexOrg);
              break;
            } else {
             
              notAllwd.push(indexDest);
              
              if(atual['salasRemanescentes'].length - notAllwd.length <= 1) break;
            }
          }
        } while(notAllwd.indexOf(indexDest) !== -1);
      }
    }
    

  
    return atual;
  }
}

export default new sucessorClass();
