
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const url = 'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new'
  
    fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(resp => resp.json())
    .then(function(data) {
      console.log(data);

      // finish here https://guides.emberjs.com/release/models/
    });
  }
});

