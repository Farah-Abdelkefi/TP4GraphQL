import { GraphQLError } from "graphql";


export const Query = {
    allCVs: (_, __, { db }) => {

        return db.cvs;
    },
    oneCV: (_, { id }, { db }) => {
      
        const foundCV = db.cvs.find((cv) => cv.id === id);
        if (!foundCV) throw new GraphQLError("CV not found");
        return foundCV;
    },

    allSkills: (_, __, { db }) => {
        return db.skills;
    },
}

