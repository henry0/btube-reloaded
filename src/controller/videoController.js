
const mockUser = {
    username: "bnb",
    loggedIn: true
}
const videos = [
    {
        title: "First Video",
        rating:5,
        comments:2,
        createAt:"2 minuate ag",
        views:52,
        id:1
    },
    {
        title: "Second Video",
        rating:5,
        comments:2,
        createAt:"2 minuate ag",
        views:1,
        id:2
    },
    {
        title: "Third Video",
        rating:5,
        comments:2,
        createAt:"2 minuate ag",
        views:52,
        id:3
    },
];
export const trending = (req, res) => {

    return res.render("home", { pageTitle: "Home", mockUser, videos });
}
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: `Watching ${video.title}`, mockUser, video });
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    res.render("edit", { pageTitle: `Editing: ${video.title}`, video, mockUser});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log(req.body)
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
    console.log(req.params);
    return res.render("upload", {pageTitle: "Upload Video"});
}
export const postUpload = (req, res) => {
    console.log(req.body);
    const { title } = req.body;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createAt: "just now",
        views: 0,
        id: videos.length + 1,
    };
    videos.push(newVideo);
    // here we will add a video to the videos array.
    return res.redirect("/");
}
export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("delete video");