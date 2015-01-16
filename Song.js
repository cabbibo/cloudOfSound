function Song( whichSong , user , info ){

  this.user = user;
  this.info = info;
  this.id = whichSong;

  this.percentage = this.id / user.numOfTracks;

  this.url =  'http://api.soundcloud.com/tracks/' +
              info.id+
              '/stream?client_id=2400df97862fa2c06f486af524e4f974';


  this.playing = false;

  var mesh = new THREE.Mesh( 
    G.geometries.icosahedron1, 
    G.materials.neutralMat 
  );
  mesh.hoverMat   = G.materials.hoverMat;
  mesh.neutralMat = G.materials.neutralMat;
  mesh.playingMat = G.materials.playingMat;
  mesh.scale.multiplyScalar( .1 );

  mesh.hoverOver = function(){

 
    if( !this.playing ){
      this.mesh.material = this.mesh.hoverMat;
      this.mesh.materialNeedsUpdate = true;

      //this.loadSongs();
      this.title.material.opacity = 1;
    }


  }.bind( this );

  mesh.hoverOut = function(){

    if( !this.playing ){
      this.mesh.material = this.mesh.neutralMat;
      this.mesh.materialNeedsUpdate = true;

      this.title.material.opacity = .2;
    }
  }.bind( this );

  mesh.select = this.select.bind( this );

  controlsLeft.add( mesh );
  controlsRight.add( mesh );

  this.user.mesh.add( mesh );


  mesh.position.x = ( Math.random() - .5 )  * 5;
  mesh.position.y = ( Math.random() - .5 )  * 5;
  mesh.position.z = ( Math.random() - .5 )  * 5;

  mesh.position.normalize();
  mesh.position.multiplyScalar( 2 );


  this.mesh = mesh;

  this.title = textCreator.createMesh( info.title );
  this.title.scale.multiplyScalar( .01 );
  this.title.position.y = 2.;
  this.title.material.opacity = .2;
  this.mesh.add( this.title );


}

Song.prototype.select = function(){

  if( this.playing ){
    this.stop();
  }else{
    this.play();
  }


}

Song.prototype.play = function(){

  console.log( 'ABOUT TO PLAY' );

  this.user.stopAllSongs();

  console.log('STOPPING' )
  audio.src = this.url;
  source.mediaElement.play( 0 );

  this.mesh.material = this.mesh.playingMat;
  this.mesh.materialNeedsUpdate = true;
    
  this.title.material.opacity = 1;


  this.playing = true;

  console.log('PLAYINGS' )


  console.log( source );
  //songInfo.innerHTML = this.artist + "  -  " +this.title 

}

Song.prototype.stop = function(){

  this.mesh.material = this.mesh.neutralMat;
  this.mesh.materialNeedsUpdate = true;
    
  this.title.material.opacity = .2;

  console.log('ABOUT TO PAUSE');
  this.playing = false;
  source.mediaElement.pause(0);
  console.log('PAUSED');

}
