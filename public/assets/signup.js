$(document).ready(function(){


    
    $('#myForm').on('submit', function(){
     
var info = {
    username: $('#username').val(),
    password: $('#password').val(),
    confirmPassword: $('#confirmPassword').val()
}
        
        
    
        
        
        

        $.ajax({
            type: 'POST',
            url: '/signup',
            data: info,
            //datatype: 'json',
            success: (data) => {
                //do something with the data via front-end framework 
                console.log(data);
                location.reload();
            }
        })
        
        return false;
        });
    })

