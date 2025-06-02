import conf from "../conf/conf";


import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            //jb tak account create ni hota wait kro

            if (userAccount) {    //ager userAccount exist kr gia to sath ee login
                //call another method
                return this.login({email,password})
            }
            else {
                return userAccount;
            }

        } catch (error) {
            throw error;

        }
    }    //hmne iik method bna diya create account ka ab ye user se same cheeze ee mang rha ha email password name..
    //nichy jo account.createid wo appwrite ka ha.kal ko appwrite na rhy koi or service yha use kr lo

    async login({email,password}){
        try {
          return  await this.account.createEmailPasswordSession(email, password);


        } 
        catch (error) {
            throw error;
        }

    }
    
    async getCurrentUser(){ //ab method k ap login hu ya nai hu ye b to dekhna

        try{
            return await this.account.get();
        }
        catch(error){
        throw error
            
        }
        return null;  //ager try-catch na chly to null return hu
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}




export const authservice = new Authservice();   // is object k dot se sb access kr skty ab like authservice.login()