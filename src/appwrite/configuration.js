import config from '../config/Config.js'
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service
{
    client = new Client();
    databases;
    bucket;

    constructor()
    {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,  slug, content, featuresImage, status, userId})
    {
        try {
            return await this.databases.createDocument(config.appDatabaseId, config.appCollectionId, slug, {
                title,
                content,
                featuresImage,
                status,
                userId
            })
        } catch (error) {
            console.log("Appwrite services :: createpost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuresImage, status})
    {
        try {
            return await this.databases.updateDocument(config.appDatabaseId, config.appCollectionId, slug, {
                title,
                content,
                featuresImage, 
                status
            })
        } catch (error) {
            console.log("Apperite services :: updatepost :: error", error)
        }
    }

    async deletePost(slug)
    {
        try {

            await this.databases.deleteDocument(config.appDatabaseId, config.appCollectionId, slug)
            return true;
            
        } catch (error) {
            console.log("Appwrite services :: deletepost :: error", error)
            return false;
        }
    }

    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(config.appDatabaseId, config.appCollectionId, slug)
            
        } catch (error) {
            console.log("Appwrite services :: getpost :: error", error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')])
    {
        try {
            return await this.databases.listDocuments(config.appDatabaseId, config.appCollectionId, queries)
        } catch (error) {
            console.log("Appwrite services :: getposts :: error", error);
            return false   
        }
    }

    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(config.appbucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite services :: uploadfile :: error", error)
            return false
        }
    }

    async deleteFile(fileId)
    {
        try {
            await this.bucket.deleteFile(config.appbucketId, fileId)
            return true
        } catch (error) {
            console.log("Appwrite services :: deletefile :: error", error)
        }
    }

    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(config.appbucketId, fileId)
    }
}

const service = new Service();

export default service;

