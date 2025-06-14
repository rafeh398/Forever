import React, { useCallback } from 'react'
import { useForm } from "react-hook-form"
import { Input, Select, Button, RTE } from "../index"
import {service}  from "../../appwrite/config"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { reactHooksModule } from "@reduxjs/toolkit/query/react"


function PostForm({ post }) { // post pe click kro to ee title show hu
    const { register, handleSubmit, watch, getValues, setValue, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",

        }


    });
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            //ager image ha to kuch kro wrna kuch kro
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
            if (file) {
                service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,

            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
            } else {
            const file = await service.uploadFile(data.image[0]);

            //file ager ha to file id lo or data ik property featuredImage ko update kro
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await service.createPost({ ...data, userId: userData.$id })
                //dbpost ha to navigate kr do
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
    //*********slugtransform */

    const slugTransform = useCallback((value) => {
        if (value && typeof value == "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

         
        }
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                //ager name title ha to to slug mein slugTransform jaye
                setValue("slug", slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])



    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
