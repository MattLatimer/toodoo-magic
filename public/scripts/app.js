/*
Hard coded user info for dev
*/
const full_name   = 'Andy Leung';
const email       = 'andy@email.com';
const pw_hash     = 'l3g1th4sh';
const catId       = 1;
const userId      = 1;

// Helper functions
function renderItem(item) {
  $(`.${item.categories_id}`).append($("<li>").text(item.content).append(`<button> Edit</button>`));
}

// function loadNewItem() {
//   $.ajax({
//     url: "/items",
//     method: "GET",
//     success: (item) => {
//       renderItem(item);
//     }
//   })
// }

// Calls to /general


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

// Calls to /users
$(() => {
  $('.edit')
})