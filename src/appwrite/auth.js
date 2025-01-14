import config from "../config/Config";

import {Client, Account, ID} from 'appwrite'


export class AuthService{
    client = new Client();
    account;

    constructor()
    {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, name, password})
    {
        try {
            const userAccount = this.account.create(ID.unique(), email, password, name);
            if(userAccount)
            {
                // call another method to direct login
                this.login(email, password);
            }
            else{
                return userAccount; 
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password})
    {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser()
    {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }

        return null;
    }

    async logout()
    {
        try {
            await this.account.deleteSessions(); 
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService();

export default authService