var commentIDs = new Array;
function displayComments(currentComments) {
    var content, userName, userID, time;
    entries = $(currentComments).find("entry");

    for(var i = entries.length-1; i >= 0; i--){

        entry = entries[i];

        //HERE IS WHERE WE DO STUFF WITH EACH COMMENT
        userName = $(entry).find("name").text()
        userID = $(entry).find("userId").text();

        //Get ID
        temp = $(entry).find("id").text();
        commentID = temp.substring(temp.indexOf("comment:") + 8, temp.length)
        //Store ID
        commentIDs[i] = commentID;

        //Check if reply or original post
        links = $(entry).find("link");
        if (links.length == 4) { //Reply
            url = $(links[2]).attr("href");
            //Get ID of comment replying too
            replyCommentID = url.substring(url.indexOf("comments/") + 9, url.length);
            //Find the comment number that this corresponds to
            commentNum = jQuery.inArray(replyCommentID, commentIDs);
            content = '<div style="text-indent:20px" id="' + commentID + '">' + "Comment " + i + " : " + "In reply to comment number " + commentNum + " : " + userName + " : " + $(entry).find("content").text() + "</div>";
            $("#" + replyCommentID).append(content);


        }
        else {
            //Easy temporary make comment visible.
            content = '<div id="' + commentID + '">' + "Comment " + i + " : " + userName + " : " + $(entry).find("content").text() + "</div>";
            $("#comments").prepend(content);
            //return currentComments;}) //for testing right now
        }
    }
}


function getCommentID(index) {
    return commentIDs[index];
}


//ATTEMPT TO GET PROFILE PICS. STRUGGLIGN TO GET URL FROM THUMBNAIL FOR SOME REASON
/*
$.ajax({
    url: 'http://gdata.youtube.com/feeds/api/users/Xkf3kRpFeAx9mDCbfMS0MA',
    processData: false,
    type: "GET",
    cache: "false",
    async: "true",
    beforeSend: function (xhr) {
        xhr.setRequestHeader('GData-Version', 2);
    },
    success: function (response) {
        //console.log(response);
        userProfile = response;
    }


    ,
    error: function (response) {
        console.log("FAILURE");
    }
})

.done(function () {
    
    console.log(userProfile);
    //console.log(userAvatarURL.attr('url'));
  //  console.log($(userAvatarURL));
    if (userProfile != undefined)
        $("body").append('<img src= "' + userAvatarURL + '" />');

    //Easy temporary make comment visible.
    content = userName + " : " + $(entry).find("content").text() + "</br>";

    $("body").append(content);
}); 
*/
