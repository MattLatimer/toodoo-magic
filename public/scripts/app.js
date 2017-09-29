/*
Hard coded user info for dev
*/
const full_name   = 'Andy Leung';
const email       = 'andy@email.com';
const pw_hash     = 'l3g1th4sh';
const catId       = 1;
const userId      = 1;

/* TODO renderITem function merge with renderItems eventurally*/
// Helper functions
function renderItem(item) {
  $(`.${item.categories_id}`).append($("<li>").text(item.content).append(`<button> Edit</button>`));
}

const categoryMap = {
  "To Watch": "1",
  "To Read": "2",
  "To Eat": "4",
  "To Buy": "3",
  "Uncategorized": "5"
}

function renderItems(items) {
  for (let item of items){
    const containerID = "." + categoryMap[item.title]
    $(containerID).append($("<li>").text(item.content));
  }
}

// Calls to /general
function loadItems(){
  $.ajax({
    url: "/items",
    method: "GET",
    dataType: "json",
    success: (items) => {
      // console.log(items);
      renderItems(items);
    }
  })
}

$(() => {
  loadItems();
})

// Calls to /items
$(() => {
  $('#addItem').on('click', (e) => {
    e.preventDefault();
    const itemContent = $('#todoForm').val();
    $.ajax({
      url: "/items",
      method: "POST",
      data: { itemContent: itemContent, catid: catId, userid: userId },
      success: function(item) {
        // loadNewItem(item);
        console.log(item);
        renderItem(item);
        $('#navbar').find('textarea[name="text"]').val('');
      }
    })
  })
})

$('#user1button').on('click', (blah) => {
  blah.preventDefault();
  $.ajax({
    url: "/login",
    method: "PUT",
    data: {user_id: 1}
  })
})

$('#user2button').on('click', (blah) => {
  blah.preventDefault();
  $.ajax({
    url: "/login",
    method: "PUT",
    data: {user_id: 2}
  })
})



// Calls to /users
