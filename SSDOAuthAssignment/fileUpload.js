$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    //Define  Redirect URI
    const redirectURI = "http://localhost/SSDOAuthAssignment/fileUpload.html" 

    //Define  Client Secret
    const ClientSecret = "w9c9FPzDsECXgiggvYDyBhLS"; 

    //Define  Scope
    const scope = "https://www.googleapis.com/auth/drive";

    //Define  Access Token
    var access_token= "";
    
    //Define Client ID
    var clientID = "542626922368-4ksovac7hqtk9i4odqguejnhktq6ngqr.apps.googleusercontent.com"

    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v3/token",
        data: {code:code
            ,redirectURI:redirectURI,
            ClientSecret:ClientSecret,
            clientID:clientID,
        scope:scope,
        grant_type:"authorization_code"},
        dataType: "json",
        success: function(resultData) { 
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           window.history.pushState({}, document.title, "/GoogleLoginApp/" + "fileUpload.html");
         
        }
  });

    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }   

    var Uploadfile = function (file) {
        this.file = file;
    };
    
    Uploadfile.prototype.getType = function() {
        localStorage.setItem("type",this.file.type);
        return this.file.type;
    };
    Uploadfile.prototype.getSize = function() {
        localStorage.setItem("size",this.file.size);
        return this.file.size;
    };
    Uploadfile.prototype.getName = function() {
        return this.file.name;
    };
    Uploadfile.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();
    
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
    
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                alert("File is uploading....");
                console.log(data);
                
            },
            error: function (error) {
                console.log(error);
            },
            
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };
    
    Uploadfile.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#progress-wrp";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
           
        }
        //alert box
        alert("You are successfully uploded!");
        //progress bar details
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
        
    };
    

    //upload onclick function
    $("#upload").on("click", function (e) {
        var file = $("#files")[0].files[0];
        var upload = new Uploadfile(file);
       // run the upload
        upload.doUpload();
       // alert("You are successfully uploded!");

       
    });
});