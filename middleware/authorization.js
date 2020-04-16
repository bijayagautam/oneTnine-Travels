const dashBoardHelper = (req,res)=>{

    if(req.session.userInfo.type=="Admin")
    {
        res.render("room/roomDashboard");
    }
    
    else
    {
        res.redirect("/user/userDashboard");
    }

}

module.exports = dashBoardHelper;