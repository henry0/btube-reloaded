import Video from "../models/Video.js";

export const home = async(req,res) => {
    try {
        const videos = await Video.find({});
        console.log("videos", videos);
        return res.render("home", { pageTitle: "home", videos });
    } catch {
        return res.render("server-error");
    }
}
export const watch = (req,res) => {
    const { id } = req.params;
    console.log(`id ::: ${id}`);
    return res.render("watch", { pageTitle: `Watching: ${id}` });
}
export const getEdit = (req,res) => {
    const { id } = req.params;
    console.log(`id ::: ${id}`);
    return res.render("edit", { pageTitle: `Editing: ${id}` });
}
export const postEdit = (req,res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log(req.body);
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req,res) => {
    console.log(req.params);
    return res.render("upload", { pageTitle: `Upload Video` });
}
export const postUpload = async(req,res) => {
    const { title, description, hashtags } = req.body;
    const video = await new Video({
        title: title,
        description: description,
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        }
    });
    console.log(video)
    video.save();
    return res.redirect("/");
}
export const search = (req,res) => res.send("Search");
export const deleteVideo = (req,res) => res.send("delete Video");