const dashBoardHelper = (req,res)=>{

    if(req.session.userInfo.type=="Admin")
    {
        res.render("Room/roomDashboard");
    }
    
    else
    {
        res.render("user/userDashboard");
    }

}

module.exports = dashBoardHelper;