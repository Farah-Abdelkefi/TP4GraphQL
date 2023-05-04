
export const  Skill= {
    
    cvs: ({ id } , args, { db }) => {

        const cv_found = db.cvs.filter((cv)=>{
            return include(cv.skills,"id",id);
        } )
        return cv_found;
    },
}
function include (array ,attribut,value){
    return array.some((element) => element[attribut] == value );
}