$(document).ready(function(){

    var iteration;
    var api, intervalType, payload, testIntervalID, runTestDuration, endpointProtocol, runTestInterval, interval; 
    var users = [];

    $("#api").val(stg_url + move_history_batch_url);
    
    endpointProtocol = $("#endpointProtocol").val();

    $("#numUsers").val(50);
    $("#endpointProtocol").val();

    $("#numIntervals").val(30);
    $("#duration").val(30);
    $("#durationType").val('minutes');


    $("#numIterations").val(120); 

    $("#interval").val(30);
    $("#intervalType").val('seconds');
    $("#payload").val('');

    $("#stop-test").on('click', function(){

        clearInterval(runTestInterval);
        
        stopTimer();

        console.log('Test has been now stopped.');
            
    });

    $("#run-test").on('click', function(){

        startTimer();

        iteration = 0;
         
        // cast type int bug here

        user_cnt = $("#numUsers").val();
        
        offset=  OFFSET_USER_CNT;

        user_cnt = TEST_USERS_CNT;
   
        intervalTypeVal = getTimeTypeValue($("#intervalType").val());

        // cast type int bug here

        let interval = parseFloat($("#numIntervals").val()  * intervalType); 

        interval = sec * 30;

        // cast type int bug here

        durationTypeVal = getTimeTypeValue($("#durationType").val());

        runTestDuration = 30 * durationTypeVal;

        runTestDuration = TEST_DURATION;


        //* display users ids in the table


        for(let i= 1; i <= user_cnt; i++){

            userId = i + offset;

            users.push([userId, 0, 0]);

            // user_ids[i][USER_ID] = i + offset;
            
            $("#logs-container table").append(`
            <tr id='user_`+ i +`'>
                <th class='py-2 px-4'>User: `+ i + `</th>
                <th class='py-2 px-4' id='user_success_cnt_`+ i +`'></th>
                <th class='py-2 px-4' id='user_fail_cnt_`+ i +`'></th>
            </tr>`);

            // user_ids[i][FAIL_COUNT] = 0;
            // user_ids[i][SUCCESS_COUNT] = 0;

        }

        console.log(users);

        run_test();

        runTestInterval = setInterval(run_test, interval);
        
        // Set expiration for test
        
        setTimeout(function(){

            clearInterval(runTestInterval);
            stopTimer();

            console.log('Test has been completed, test run now stopped.');

        }, runTestDuration);
          

 
    }); 
    
    
    function run_test(){

        // alert(users);
             //* if by iteration
  
            if(iteration == 60){

                //clearInterval(runTestInterval);

                console.log('stress test completed!');
                
                alert('stress test complete! ');

            }
            
            console.log('iteration ' + iteration);

            user_number = parseInt(user_number + 350);
             

            users.forEach((user) =>{
             

                    var url = endpointProtocol + stg_url + move_history_batch_url + user[USER_ID];
                    
                    //console.log(url);
                     
                    $.ajax({

                        type: "POST",
                        userID: user[USER_ID],
                        user: user,
                        ajaxTime:  new Date().getTime(),
                        url: url,
                        async: true,
                        //dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(coordinatesJson),
                        beforeSend: function(){
                            // ajaxTime=;
                        },
                        complete: function (response, status) {

                        // $(".logs-container table").append("<tr><td>" + user_id + "<td>" + totalTime + "ms <td>" + status);

                            // $(".logs-container table").append("<tr><td>" + user_id + "<td>" + totalTime + "ms <td>" + status);

                            let totalTime = new Date().getTime() - this.ajaxTime;
                            
                            // $("#user_" + this.userID).append("<tr><td>" + this.userID + "<td>" + totalTime + "ms <td>" + status);
                      
                            if(status == 'success'){

                            
                                $("#user_success_cnt_"+this.user[USER_ID]).html(this.user[SUCCESS_COUNT]);
    
                            }else{
                                $("#user_fail_cnt_"+this.user[USER_ID]).html(this.user[FAIL_COUNT]);
     
                            }

                            
                            $("#user_success_cnt_"+this.user[USER_ID]).html(this.user[SUCCESS_COUNT]);
                            $("#user_fail_cnt_"+this.user[USER_ID]).html(this.user[FAIL_COUNT]);

                            // console.log("Success:" + this.user[SUCCESS_COUNT]);
                            // console.log("Fail:" + this.user[FAIL_COUNT]);
        
                        },  
                        success: function (response, status) {

                            this.user[SUCCESS_COUNT]++;

                            // var totalTime = new Date().getTime() - ajaxTime;
                            
                            // $(".logs-container table").append("<tr><td>" + user_id + "<td>" + totalTime + "ms <td>" + status);


                        },
                        error: function(xhr, status, error){
                            this.user[FAIL_COUNT]++;

                        }

                    });
        
            });

            

            //iteration++;
            
            
            return;

        }


});
