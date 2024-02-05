$(document).ready(function(){


    var sec = 1000;
    var min = sec * 60;
    var iteration;

    $("#run-test").on('click', function(){

        iteration = 0;
        user_number = $("#numUsers").val();
 
        runTestInterval = setInterval(run_test, sec * 30);
 
    }); 
    
    
    function run_test(){
 
            var user_ids= [];
                        
            if(iteration == 60){

                clearInterval(runTestInterval, min * 30);

                console.log('stress test completed!');
                
                alert('stress test complete! ');

            }

            for(let i= 1; i <= user_number; i++){
                user_ids[i -1] = i;
            }

            user_ids.forEach(function(user_id){

                    var url = stg_url + move_history_batch_url + user_id ;
                    
                    var ajaxTime;


                    $.ajax({

                        type: "POST",
                        url: url,
                        async: true,
                        //dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(coordinatesJson),
                        beforeSend: function(){
                            ajaxTime= new Date().getTime();
                        },
                        complete: function (response, status) {

                            var totalTime = new Date().getTime() - ajaxTime;
                        // $(".logs-container table").append("<tr><td>" + user_id + "<td>" + totalTime + "ms <td>" + status);

                            // $(".logs-container table").append("<tr><td>" + user_id + "<td>" + totalTime + "ms <td>" + status);

                            
                        },  
                        success: function (response, status) {
                            
                            var totalTime = new Date().getTime() - ajaxTime;
                            
                            $(".logs-container table").append("<tr><td>" + user_id + "<td>" + totalTime + "ms <td>" + status);

                        }

                    });

            });

            iteration++;

            console.log(coordinatesJson);
            
            
            return;

        }


});
