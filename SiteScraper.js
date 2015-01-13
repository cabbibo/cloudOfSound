function SiteScraper( depth ){


  this.depth = depth || 2;






}


SiteScraper.prototype.scrapSite = function( url ){
  
  $.getJSON( "http://reddit.com" , function(data){

      //Iterate through the <li> inside of the URL's data
      $.each(data.items, function(item){
        console.log('HELLO' );
        console.log( item );
      });

  });

}
