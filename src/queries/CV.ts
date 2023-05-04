

export const  CV= {
        user: ({user}, _, {db}) => {
            /* const user = db.users.find((user) => user.id === parent.user.id);
            if (!user) {
                throw new Error(`User with ID ${parent.userId} not found`);
            }*/
            return user;
        },
        skills: ({skills}, args, { db }) => {
            return skills;
        },
    }
