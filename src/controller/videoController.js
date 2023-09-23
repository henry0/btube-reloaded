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
export const watch = async(req,res) => {
    const { id } = req.params;
    console.log(`id ::: ${id}`);
    const video = await Video.findById(id).exec();
    console.log(`video ::: ${video}`);
    return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
}
export const getEdit = async(req,res) => {
    const { id } = req.params;
    console.log(`id ::: ${id}`);
    const video = await Video.findById(id).exec();
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
}
export const postEdit = async(req,res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    console.log(req.body);
    console.log(`hashtags ::: ${hashtags}`);
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: hashtags.split(",").map((word)=>word.startsWith("#") ? word : `#${word}`)
    });
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