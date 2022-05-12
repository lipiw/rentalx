import fs from "fs";

export const deleteFile = async(filename: string) =>{

    //STAT verifica se o arquivo ja existe, UNLINK remove
    try{
        await fs.promises.stat(filename);
    }catch{
        return;
    }

    await fs.promises.unlink(filename);
};