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
export const watch = async(req, res) => {
    const { id } = req.params;
    console.log(`id ::: ${id}`)
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", { pageTitle: `Video not found` });
    }
    return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
}
export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", { pageTitle: `Video not found` });
    }
    res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
}
export const postEdit = async(req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({_id: id });
    if(!video){
        return res.render("404", { pageTitle: `Video not found` });
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    /*
    video.title = title;
    video.description = description;
    video.hashtags = hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`);
    await video.save();
    */
    console.log(req.body)
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    console.log(req.params);
    return res.render("upload", {pageTitle: "Upload Video"});
}
export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
            meta: {
                views: 0,
                rating: 0,
            }
        });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
}
export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("delete video");