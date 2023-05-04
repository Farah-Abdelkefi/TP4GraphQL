
export const Mutation = {
  createCV: (_parent:never, { input }:any, { pubSub, db }) => {
    const { name, age, job, skillIds, userId } = input;
    const id = db.cvs.length + 1;
    const skills = db.skills.filter((skill) => skillIds.includes(skill.id));
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const newCV = {
      id,
      name,
      age,
      job,
      skills,
      user,
    };
    db.cvs.push(newCV);

    pubSub.publish('CVUpdates', newCV);
    return newCV;
  },
  updateCV: (_parent:never, { id, input }:any, { pubSub, db }) => {
    const {  skillIds, userId } = input;
    const cvIndex = db.cvs.findIndex((cv) => cv.id === id);
    if (cvIndex === -1) {
      throw new Error(`CV with ID ${id} not found.`);
    }
    let skills = []
    if ( skillIds )
    { 
       skills = db.skills.filter((skill) => skillIds.includes(skill.id));
    }
      
    if ( userId)
      {
        const user = db.users.find((user) => user.id === userId);
      if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
      }
    }
    else {
      const cv = db.cvs.find((cv) => cv.id === id);
      if(!cv){
        throw new Error(` cv d'id ${id} n'existe pas `);
      }else {
        for(let key in input){
          if(key != skillIds)
            cv[key] = input[key];
          else
            cv.skills = skills; 
        }


    pubSub.publish('CVUpdates', cv );
    return cv;
  }
}
},
  deleteCV: (_parent: never, { id }: { id: number }, { db, pubSub }) => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      throw new Error(`CV with ID ${id} not found`);
    }
    const deletedCV = db.cvs.splice(index, 1)[0];

    // Remove the CV from the skills table
    db.skills.forEach((cvSkill) => {
      if (cvSkill.id === id) {
        const skillIndex = db.skills.findIndex((skill) => skill.id === cvSkill.id);
        if (skillIndex !== -1) {
          db.skills[skillIndex].cvs = db.skills[skillIndex].cvs.filter((cv) => cv.id !== id);
        }
      }
    });
    db.skills = db.skills.filter((cvSkill) => cvSkill.id !== id);

    // Remove the CV from the user's CVs
    const userIndex = db.users.findIndex((user) => user.id === deletedCV.user.id);
    if (userIndex !== -1) {
      db.users[userIndex].cvs = db.users[userIndex].cvs.filter((cv) => cv.id !== id);
    }

    pubSub.publish('CVUpdates', deletedCV);
    return true;
  }
}

