$(document).ready(function(){

    //define the client ID
    var clientID ="542626922368-4ksovac7hqtk9i4odqguejnhktq6ngqr.apps.googleusercontent.com" 

    //define the Redireact URI
    var RedirectURI="http://localhost/SSDOAuthAssignment/fileUpload.html"

    //define the scope
    var scope="https://www.googleapis.com/auth/drive"

    //declare URL Variable
    var URL=""


    //SIGN IN ON CLICK FUNCTION
    $("#signin").click(function(){

        signIn(clientID,RedirectURI,scope,URL);
    
    
    })

    
    function signIn(clientID,RedirectURI,scope,URL){

        //define the URL
        URL = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+RedirectURI
        +"&prompt=consent&response_type=code&client_id="+clientID+"&scope="+scope
        +"&access_type=offline";

        window.location = URL;
        
    }


});