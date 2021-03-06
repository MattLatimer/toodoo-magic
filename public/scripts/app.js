//Looping function that adds all the items onto the app//
function renderItems(items) {

  for (let item of items) {
    const containerID = "." + item.categories_id;
    $(containerID)
      .append($("<p>")
      .append($("<a>").text(item.content).attr('href', `/items/edit/${item.id}`)).attr('id', item.id).attr('data-item-id', item.id)
      .append($("<input>").val('X').attr('type', 'submit').attr('class', 'test button alert tiny').attr('itemId', item.id)));
  }
}

//Function listening on the click for deleting items//
$(() => {
  $('.row').on('click', '.test', (e) => {
    e.preventDefault();
    const itemId = $(e.target).attr('itemid');
    $.ajax({
      url: '/items/' + itemId,
      method: "DELETE",
      success: function(result) {
          $('#'+itemId).remove();
      },
      error:function(error){
        console.log("error occurred ",error);
      }
    });
  })
})

// Calls for /general // Function that loads items using ajax and a renderItems looping function//
function loadItems(){
  $.ajax({
    url: "/items",
    method: "GET",
    dataType: "json",
    success: function(items) {
      renderItems(items);
    }
  })
}

$(() => {
  loadItems();
});

// Calls to /items // Function listening on click for adding items into the database//
$(() => {
  $('#addItem').on('click', (e) => {
    e.preventDefault();
    const itemContent = $('#todoForm').val();
    if (itemContent) {
      $.ajax({
        url: "/items",
        method: "POST",
        data: { itemContent: itemContent },
        success: function(item) {
          renderItems(item);
          $('#todoForm').val('');
        }
      });
    }
  });
});


// Function for registering new users's name, email and password//
$(() => {
  $('.register').on('click', (e) => {
    e.preventDefault();
    const name = $('#regName').val();
    const email = $('#regEmail').val();
    const password = $('#regPW').val();
    $.ajax({
      url: '/register',
      method: "POST", 
      data: { email: email, password: password, name: name },
      success: function(result){
        location.href = 'http://localhost:8080/';        
      },
      error: function(error){
        $('#registrationMessage').append($('<p>').text('Email can not be used.'));
        console.log("error occurred while registering ");
      }
    });
  })
})