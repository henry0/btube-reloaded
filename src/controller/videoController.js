import Video from "../models/Video";

export const home = async(req, res) => {
    try{
        const videos = await Video.find({});
        console.log("videos", videos);
        return res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("server-error");
    }
}
export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watching ${video.title}` });
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    res.render("edit", { pageTitle: `Editing: ${video.title}`});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log(req.body)
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    console.log(req.params);
    return res.render("upload", {pageTitle: "Upload Video"});
}
export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    await Video.create({
        title,
        description,
        createAt: Date.now(),
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        }
    });
    return res.redirect("/");
}
export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("delete video");