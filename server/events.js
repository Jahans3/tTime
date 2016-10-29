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
      const hoursPerWeek = sock.hoursPerWeek;
      const lengthOfBreaks = sock.lengthOfBreaks;
      const breaksPerWeek = sock.breaksPerWeek;
      const pay = sock.pay;
      const weeklyPay = dec(pay / 52);
      const payPerHour = dec(weeklyPay / hoursPerWeek);
      const toiletTimePerWeek = dec((lengthOfBreaks * breaksPerWeek) / 60);
      const toiletPayPerWeek = dec(payPerHour * toiletTimePerWeek);
      const toiletTimePerYear = dec(toiletTimePerWeek * 52);
      const toiletTimePerMonth = dec(toiletTimePerYear / 12);
      const toiletPayPerYear = dec(toiletPayPerWeek * 52);
      const toiletPayPerMonth = dec(toiletPayPerYear / 12);

      // Store this as a record in MongoDB, needs identifying info, pre-req: user login & accounts
      cout();
      console.log(`Event: Calculate:`);
      console.log(`Pay: ${pay}`);
      console.log(`Hourly rate: £${payPerHour}`);
      console.log(`Weekly pay: £${weeklyPay}`);
      console.log(`Hours per week: ${hoursPerWeek}`);
      console.log(`Length of breaks: ${lengthOfBreaks}m`);
      console.log(`Breaks per week: ${breaksPerWeek}`);
      console.log(`Toilet time per week: ${toiletTimePerWeek}hrs`);
      console.log(`Toilet time per month: ${toiletTimePerMonth}`);
      console.log(`Total time of breaks per year: ${toiletTimePerYear}hrs`);
      console.log(`Amount paid to use the toilet each week: £${toiletPayPerWeek}`);
      console.log(`Amount paid to use the toilet each month: £${toiletPayPerMonth}`);
      console.log(`Amount paid to use the toilet each year: £${toiletPayPerYear}`);

      io.emit('calculate', {
        pay: pay,
        hourlyRate: payPerHour,
        weeklyRate: weeklyPay,
        hoursPerWeek: hoursPerWeek,
        lengthOfBreaks: lengthOfBreaks,
        breaksPerWeek: breaksPerWeek,
        toiletTimePerWeek: toiletTimePerWeek,
        toiletTimePerMonth: toiletTimePerMonth,
        toiletTimePerYear: toiletTimePerYear,
        toiletPayPerWeek: toiletPayPerWeek,
        toiletPayPerMonth: toiletPayPerMonth,
        toietPayPerYear: toiletPayPerYear
      });
    });
  });
};