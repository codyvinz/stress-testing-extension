
new Vue({

    el: '#app',
    data: {
      formData: {

        // set default values
        api: endpointProtocol + stg_url + move_history_batch_url,
        numUsers: 50,
        numIntervals: 30,
        duration: 30,
        durationType: 'minutes',
        intervalType: 'seconds',
        payload: '',
        testIntervalID: null,
        runTestDuration: 30 * minutes,
        endpointProtocol: 'https://'
      },

      submittedData: []
      
    },

    methods: {

      runTest(){

        let intervals   = this.formData.numIntervals;

        //let payload     = this.formData.payload;

        //letpayloadFile = this.formData.file;
        
        var user_ids;

        iteration = 0;
        user_number = $("#numUsers").val();

        runTestInterval =  setInterval(() => {
            
            
          let user_number = this.formData.numUsers;
          var user_ids= [];

          for(let i= 1; i <= user_number; i++){
                user_ids[i -1] = i;
                this.callEndPoint();

            }
        }, sec * 30); // 30 seconds in milliseconds

        setTimeout(() => {
          this.stopTest();
        }, this.runTestDuration);

      },

      stopTest() {
            
        clearInterval(this.runTestInterval);
        console.log('Test completed stopped.');
      
      },

      async callEndPoint(user_id) {

        try {

          let ajaxTime  = new Date().getTime();

          const response = await fetch( this.formData.api + '/' + user_id, {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(coordinatesJson)

          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          if(response.ok){

            var totalTime = new Date().getTime() - ajaxTime;

            

          }
          
        } catch (error) {
          console.error('Error submitting form:', error);
        }

      },

      handleFileUpload(event) {
          // Update the file property when the file input changes
          this.formData.file = event.target.files[0];
      }

    }


  }); 