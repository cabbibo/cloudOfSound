function User( info ){

  this.info = info;


  this.id = info.id;
  this.numOfTracks = info.track_count;


  this.songs = [];

  // Song limit ( arbi
  if( this.numOfTracks > 50 ){


  }

  this.selected = false;
  console.log( info );
  var mesh = new THREE.Mesh( 
    G.geometries.icosahedron1, 
    G.materials.neutralMat 
  );
  mesh.hoverMat   = G.materials.hoverMat;
  mesh.neutralMat = G.materials.neutralMat;
  mesh.selectedMat = G.materials.selectedMat;
  mesh.scale.multiplyScalar( .1 );

  mesh.hoverOver = function(){

    if( !this.selected ){

      this.mesh.material = this.mesh.hoverMat;
      this.mesh.materialNeedsUpdate = true;

      //this.loadSongs();
      this.title.material.opacity = 1;

    }

  }.bind( this );

  mesh.hoverOut = function(){

    if( !this.selected ){
      this.mesh.material = this.mesh.neutralMat;
      this.mesh.materialNeedsUpdate = true;

      this.title.material.opacity = .2;
    }

  }.bind( this );

  mesh.select = this.selectUser.bind( this );

  controlsLeft.add( mesh );
  controlsRight.add( mesh );

  scene.add( mesh );


  mesh.position.x = ( Math.random() - .5 )  * 5;
  mesh.position.y = ( Math.random() - .5 )  * 5;
  mesh.position.z = ( Math.random() - .5 )  * 5;

  mesh.position.normalize();
  mesh.position.multiplyScalar( 2 );

  this.ogPosition = mesh.position.clone();

  this.mesh = mesh;

  this.title = textCreator.createMesh( info.username );
  this.title.scale.multiplyScalar( .03 );
  this.title.position.y = 2.;
  this.title.material.opacity = .2;
  this.mesh.add( this.title );

}


User.prototype.loadSongs = function(){

  SC.get('/users/' + this.id + '/tracks' , { limit:50 }, function(tracks) {

    console.log('HELLO');
    console.log( tracks );

    console.log( this );
    for( var i = 0; i < tracks.length; i++ ){

      this.songs.push( new Song( i , this,  tracks[i] ) );

    }

  }.bind( this ));
}

User.prototype.update = function(){

  this.mesh.lookAt( camera.position );

}
User.prototype.createSongsLine = function(){



}

User.prototype.stopAllSongs = function(){

  for( var i = 0; i < this.songs.length; i++ ){

    this.songs[i].stop();


  }

}

User.prototype.selectUser = function(){

  if( this.selected == false ){
    for( var i = 0; i < followings.length; i++ ){


      if( followings[i].selected == true ){

        followings[i].deselect();

      }

    }

    this.select();
  }else{

    this.deselect();

  }
  

}


User.prototype.select = function(){

  this.selected = true;
  this.loadSongs();

  this.mesh.material = this.mesh.selectedMat;
  this.mesh.materialNeedsUpdate = true;

  this.title.material.opacity = 1.;

  toPosition = camera.position.clone();

  var offset = new THREE.Vector3( 0 , 0 , -.5 );

  offset.applyQuaternion( camera.quaternion );
  toPosition.add( offset );

  var p = this.mesh.position;
  var f = toPosition;
  var from  = { x: p.x , y: p.y , z: p.z }
  var to    = { x: f.x , y: f.y , z: f.z }

  var tween = new TWEEN.Tween( p ).to( to , 1000 );

  tween.onUpdate( function(){


  }.bind( this ));

  tween.onUpdate( function(){

    this.mesh.lookAt( camera.position );
   

  }.bind( this ));

  tween.onComplete( function(){

    console.log( 'DONE');

  }.bind( this ) );

  tween.start();

}

User.prototype.deselect = function(){

  this.selected = false;
 
  this.stopAllSongs();
  this.loadSongs();

  this.mesh.material = this.mesh.neutralMat;
  this.mesh.materialNeedsUpdate = true;

  this.title.material.opacity = .2;


  toPosition = camera.position.clone();

  var offset = new THREE.Vector3( 0 , 0 , -.5 );

  offset.applyQuaternion( camera.quaternion );
  toPosition.add( offset );

  var p = this.mesh.position;
  var f = this.ogPosition;

  var from  = { x: p.x , y: p.y , z: p.z }
  var to    = { x: f.x , y: f.y , z: f.z }

  var tween = new TWEEN.Tween( p ).to( to , 1000 );

  tween.onUpdate( function(){


  }.bind( this ));

  tween.onUpdate( function(){

    this.mesh.lookAt( camera.position );
   

  }.bind( this ));

  tween.onComplete( function(){

    console.log( 'DONE');

  }.bind( this ) );

  tween.start();

}
