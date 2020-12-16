   function validate() {
    document.getElementById("error").innerHTML = "";

    if( document.myForm.Name.value == "" ) {
       document.getElementById("error").innerHTML = "Please provide your name! <br>";
       document.getElementById("error").style.visibility = "visible";
       document.myForm.Name.focus() ;
       return false;
    }
    if( document.myForm.EMail.value == "" ) {
        document.getElementById("error").innerHTML = "Please provide your Email!" ;
        document.getElementById("error").style.visibility = "visible";
        document.myForm.EMail.focus() ;
        return false;
    }else{
        if(document.myForm.EMail.value != ""){
            var emailID = document.myForm.EMail.value;
            atpos = emailID.indexOf("@");
            dotpos = emailID.lastIndexOf(".");
            
            if (atpos < 1 || ( dotpos - atpos < 2 )) {
                document.getElementById("error").innerHTML ="Please enter correct email ID";
                document.getElementById("error").style.visibility = "visible";
                document.myForm.EMail.focus() ;
                return false;
            }
        }
    }

    if( document.myForm.Password.value == "" ){
        document.getElementById("error").innerHTML = "Please provide a Password";
        document.getElementById("error").style.visibility = "visible";

        document.myForm.Password.focus();
        return false;
    }
    if(isNaN(document.myForm.Password.value)){
        document.getElementById("error").innerHTML = "Password must be a number!";
        document.getElementById("error").style.visibility = "visible";

        document.myForm.Password.focus();
        return false;
    }
    if(document.myForm.Password.value.length <= 5 ) {
        document.getElementById("error").innerHTML = "Please provide a Password with more than 5 characters";
        document.getElementById("error").style.visibility = "visible";

        document.myForm.Password.focus();
        return false;
    }
   
    if( document.myForm.Country.value == "-1" ) {
        document.getElementById("error").innerHTML ="Please provide your country!";
        document.getElementById("error").style.visibility = "visible";

         return false;
    }
    document.getElementById("success").innerHTML = "Success";   
    document.getElementById("error").style.visibility = "hidden";
    document.getElementById("success").style.visibility = "visible";


    return( true );
 }

