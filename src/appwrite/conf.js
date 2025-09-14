import { Client, ID,Databases,Storage, Query } from "appwrite";
import config from "../config/config";

export class Service{
    client=new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteEndPoint)
        .setProject(config.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);
    }
    async createPost({title,slug,description,featuredImage,status,userId})
    {
        try {
            return await this.databases.createDocument({
            databaseId:config.appwriteDatabaseId,
            collectionId:config.appwriteCollectionId,
            documentId:slug,
            data:{
                title,
                description,
                featuredImage,
                status,
                userId
            }               
        })
        } catch (error) {
            console.log("createpost::error",error)
        }
    }
    async updatePost(slug,{title,description,featuredImage,status})
    {
        try {
            return await this.databases.updateDocument({
                databaseId:config.appwriteDatabaseId,
                collectionId:config.appwriteCollectionId,
                documentId:slug,
                data:{
                    title,
                    description,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("updatepost::error",error)
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId:config.appwriteDatabaseId,
                collectionId:config.appwriteCollectionId,
                documentId:slug,
            })
            return true;
        } catch (error) {
            console.log("deletepost::error",error)
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId:config.appwriteDatabaseId,
                collectionId:config.appwriteCollectionId,
                documentId:slug,
            })
        } catch (error) {
            console.log("getpost::error",error)
            return false
        }
    }
    async ListPost(queries=[Query.equal("status","active")])
    {
        try {
            return await this.databases.listDocuments({
                databaseId:config.appwriteDatabaseId,
                collectionId:config.appwriteCollectionId,
                queries:queries,
            })
        } catch (error) {
            console.log("deletepost::error",error)
        }
    }

    //file upload

    async uploadFile(file)
    {
        try {
            return await this.storage.createFile({
                bucketId:config.appwriteBucketId,
                fileId:ID.unique(),
                file:file,
            })
        } catch (error) {
            console.log("uploadfile::error",error)
            return false;
        }
    }
    async deleteFile(fileId)
    {
        try {
            return await this.storage.deleteFile({
                bucketId:config.appwriteBucketId,
                fileId:fileId,
            })
            return true;
        } catch (error) {
            console.log("deletefile::error",error)
            return false;
        }
    }
    previewFile(fileId){
        try {
            return this.storage.getFileView({
                bucketId:config.appwriteBucketId,
                fileId:fileId,
            })
        } catch (error) {
            console.log("previewfile::error",error)
            return false;
        }
    }
}
const service=new Service();
export default service