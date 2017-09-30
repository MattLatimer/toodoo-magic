/*
Hard coded user info for dev <--------------------------------TODO REMOVE HARDCODE USER WHEN COOKIE PARSING IS DONE--------------------
*/
const full_name   = 'Andy Leung';
const email       = 'andy@email.com';
const pw_hash     = 'l3g1th4sh';
const catId       = 1;
const userId      = 1;

/* DONE renderITem function merge with renderItems eventurally*/
// Helper functions
// function renderItem(item) {
//   $(`.${item.categories_id}`).append($("<li>").text(item.content).append(`<button> Edit</button>`));
// }

// const categoryMap = {
//   "To Watch": "1",
//   "To Read": "2",
//   "To Eat": "3",
//   "To Buy": "4",
//   "Uncategorized": "5"
// };

function renderItems(items) {

  for (let item of items) {
    const containerID = "." + item.categories_id;
    $(containerID)
      .append($("<p>")
        .append($("<a>").text(item.content).attr('href', `/items/edit/${item.id}`)).attr('id', item.id).attr('data-item-id', item.id)
        .append($("<input>").val('X').attr('type', 'submit').attr('class', 'test button alert tiny').attr('itemId', item.id)));
    // $(containerID).append($("<p>").text(item.content).attr('data-item-id', item.id));
  }
}

$(() => {
  $('.row').on('click', '.test', (e) => {
    e.preventDefault();
    const itemId = $(e.target).attr('itemid');
    $.ajax({
      url: '/items/' + itemId,
      method: "DELETE",
      success: function(result) {
        if (result.loggedIn === 'false') {
          location.href = 'http://localhost:8080/register';
        } else {
        // console.log("success");
        // alert('You have deleted the item!',result);
          $('#'+itemId).remove();
        }
      },
      error:function(error){
        console.log("error occurred ",error);
      }
    });
  })
})

// Calls to /general
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

// Calls to /items
$(() => {
  $('#addItem').on('click', (e) => {
    e.preventDefault();
    const itemContent = $('#todoForm').val();
    if (itemContent) {
      $.ajax({
        url: "/items",
        method: "POST",
        data: { itemContent: itemContent, userid: userId }, //<-------------TODO REMOVE HARDCODE USER WHEN COOKIE PARSING DONE------------------
        success: function(item) {
          // loadNewItem(item);
          // console.log(item);
          if (item.loggedIn === 'false') {
            location.href = 'http://localhost:8080/register';
          } else {
            renderItems(item);
            $('#todoForm').val('');
          }
        }
      });
    }
  });
});


// REGISTERING
$(() => {
  $('.register').on('click', (e) => {
    e.preventDefault();
    const name = $('#regName').val();
    const email = $('#regEmail').val();
    const password = $('#regPW').val();
    $.ajax({
      url: '/register',
      method: "POST", 
      data: {email: email, password: password, name: name},
      success: function(result){
        console.log("Success Registration");
      },
      error: function(error){
        $('#errormessage').append($('<p>').text('Email can not be used.'));
        console.log("error occurred while registering ");
      }
    });
  })
})

// $(() => {
//   $('#user1button').on('click', (e) => {
//     e.preventDefault();
//     $.ajax({
//       url: "/login",
//       method: "POST",
//       data: { user_id: 1 }
//     });
//   });

//   $('#user2button').on('click', (e) => {
//     e.preventDefault();
//     $.ajax({
//       url: "/login",
//       method: "POST",
//       data: { user_id: 2 }
//     });
//   });
// });

  // $('#logout').on('click', (e) => {
  //   e.preventDefault();
  //   $.ajax({
  //     url: "/logout",
  //     method: "GET"
  //   })
  // })
// Calls to /users
