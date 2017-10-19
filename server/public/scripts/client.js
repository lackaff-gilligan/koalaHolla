console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click and submit to server/database
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    var nameIn = $('#nameIn').val();
    var ageIn = $('#ageIn').val();
    var genderIn = $('#genderIn').val();
    var readyForTransferIn = $('#readyForTransferIn').val();
    var notesIn = $('#notesIn').val();

    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: nameIn,
      age: ageIn,
      gender: genderIn,
      readyForTransfer: readyForTransferIn,
      notes: notesIn,
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){ //getting koala data append in done
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas',
  }).done(function(response){
    console.log(response);
    var koalas = response;
    console.log(koalas);
    appendToDom(koalas);
  }).fail(function (error){
    alert('something went wrong');
}); // display on DOM with buttons that allow edit of each
} // end getKoalas  

function appendToDom(array) {
  for (var i = 0; i < array.length; i++) {
    koala = array[i];
    var $tr = $('<tr></tr>');
    $tr.append('<td>' + koala.name + '</td>');
    $tr.append('<td>' + koala.age + '</td>');
    $tr.append('<td>' + koala.gender + '</td>');
      if (koala.transfer == true ) {
          $tr.append('<td>Ready for Transfer</td>');
      }
      else { //need to finish button
        $tr.append('<td><button class="ready">Mark Ready for Transfer</button></td>');
      }
    $tr.append('<td>' + koala.notes + '</td>');
    $tr.append('<td><button class="edit" data-id="' + koala.id + '">Edit</button></td>');
    $tr.append('<td><button class="remove" data-id="' + koala.id + '">Remove</button></td>');
    $('#viewKoalas').append($tr);
  }
}

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    }) // end success
    .done(function(response){
      getKoalas();
    })
    .fail(function(error){
      console.log('error', error);
      
  }); //end ajax
}
