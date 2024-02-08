        // Timer Countdown

        let timerInterval;
        let seconds_timer = 0, minutes_timer = 0, hours_timer = 0;
    
        function startTimer() {
            timerInterval = setInterval(updateTimer, 1000);
        }
    
        function stopTimer() {
            clearInterval(timerInterval);
        }
    
        function resetTimer() {
            clearInterval(timerInterval);
            seconds_timer = 0;
            minutes_timer = 0;
            hours_timer = 0;
            updateTimer();
        }
    
        function updateTimer() {
            seconds_timer++;
            if (seconds_timer === 60) {
                seconds_timer = 0;
                minutes_timer++;
                if (minutes_timer === 60) {
                    minutes_timer = 0;
                    hours_timer++;
                }
            }
    
            const formattedTime = padNumber(hours_timer) + ":" + padNumber(minutes_timer) + ":" + padNumber(seconds_timer);
            document.getElementById("timer").innerText = formattedTime;
        }
    
        function padNumber(number) {
            return (number < 10 ? '0' : '') + number;
        }
    
