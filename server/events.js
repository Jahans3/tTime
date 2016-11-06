/**
 * Created by jahansj on 23/10/2016.
 */
module.exports = function(io) {
  const cout = () => console.log(`-----------------------------------------`);
  const dec = dec => dec.toFixed(2);

  io.on('connection', (socket) => {
    console.log('New user connected.');
    
    socket.on('something', (sock) => {
      cout();
      console.log('Event: Something:');
      console.log(sock);

      socket.emit('another', 'some data');
    });

    socket.on('calculate', (sock) => {
      const type = sock.typeOfBreaks;
      const hoursPerWeek = sock.hoursPerWeek;
      const lengthOfBreaks = sock.lengthOfBreaks;
      const breaksPerWeek = sock.breaksPerWeek;
      const pay = sock.pay;
      const weeklyPay = dec(pay / 52);
      const payPerHour = dec(weeklyPay / hoursPerWeek);
      const timePerWeek = dec((lengthOfBreaks * breaksPerWeek) / 60);
      const payPerWeek = dec(payPerHour * timePerWeek);
      const timePerYear = dec(timePerWeek * 52);
      const timePerMonth = dec(timePerYear / 12);
      const payPerYear = dec(payPerWeek * 52);
      const payPerMonth = dec(payPerYear / 12);

      // Store this as a record in MongoDB, needs identifying info, pre-req: user login & accounts
      cout();
      console.log(`Calculate pay for ${type} breaks`);
      console.log(`Pay: ${pay}`);
      console.log(`Hourly rate: £${payPerHour}`);
      console.log(`Weekly pay: £${weeklyPay}`);
      console.log(`Hours per week: ${hoursPerWeek}`);
      console.log(`Length of breaks: ${lengthOfBreaks}m`);
      console.log(`Breaks per week: ${breaksPerWeek}`);
      console.log(`Total time of ${type} breaks per week: ${timePerWeek}hrs`);
      console.log(`Total time of ${type} breaks per month: ${timePerMonth}hrs`);
      console.log(`Total time of ${type} breaks per year: ${timePerYear}hrs`);
      console.log(`Amount paid for ${type} breaks each week: £${payPerWeek}`);
      console.log(`Amount paid for ${type} breaks each month: £${payPerMonth}`);
      console.log(`Amount paid for ${type} breaks each year: £${payPerYear}`);

      io.emit('calculated', {
        pay: pay,
        typeOfBreaks: type,
        hourlyRate: payPerHour,
        weeklyRate: weeklyPay,
        hoursPerWeek: hoursPerWeek,
        lengthOfBreaks: lengthOfBreaks,
        breaksPerWeek: breaksPerWeek,
        timePerWeek: timePerWeek,
        timePerMonth: timePerMonth,
        timePerYear: timePerYear,
        payPerWeek: payPerWeek,
        payPerMonth: payPerMonth,
        payPerYear: payPerYear
      });
    });
  });
};