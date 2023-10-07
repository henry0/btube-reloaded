export const getJoin = (req, res) => {
    console.log("getJoin ::: {}", req.body);
    res.render("join", { pageTitle: "Join"});
}
export const postJoin = (req, res) => {
    res.redirect("/");
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
