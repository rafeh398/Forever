import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export default class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                //data
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, userId }) {  //ye to hm user se mang rhy
        try {
            return await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                //data  ye updat document ka 4th option ha
                title,
                content,
                featuredImage,
                status,
            })
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug) {  //delete k liye just slug chaiye 
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
            return true
        }
        catch (error) {
            throw error;
            return false

        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug)
        }
        catch(error) {
            throw error;
    
        }
    
    }

    async getPosts(queries= [Query.equal("status","active")]){  //wo value chaiye jinka active status ha isliye to index liya tha appwrite mein

        try {
          return  await this.databases.listDocuments(conf.appWriteDatabaseId,conf.appWriteCollectionId,queries)
            
        } catch (error) {
            throw error;
            return false
        }
    }
   

    //**********storage */
async uploadFile(file){
try {
    return await this.bucket.createFile(conf.appWriteBucketId, ID.unique(),file )   //ye service use kr re
} catch (error) {
     console.log( "error",error);
     return false
    
}
}
async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(conf.appWriteBucketId, fileId)
    } catch (error) {
        throw error;
        return false
    }
}

async getFilePreview(fileId){
    try {
        await this.bucket.getFilePreview(conf.appWriteBucketId, fileId)
    } catch (error) {
        throw error;
        return false
    }
}

}

export const service = new Service();