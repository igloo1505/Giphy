var oldStuff = [
  "messenger pigeons",
  "cavemen",
  "dialup",
  "horse and buggy",
  "Grandma",
  "polio",
  "Abe Lincoln",
  "jquery",
];
let currentSearch = "";

const searchGif = (searchContent) => {
  if (currentSearch !== searchContent) {
    $(".gifs").html("");
  }

  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search",
    data: {
      api_key: "GqJuWqLDQJ3oQ9EFF3iNt09MsyDSXQ1Y",
      q: searchContent,
      limit: 10,
    },
    success: function (data) {
      for (var i = 0; i < data.data.length; i++) {
        var gif = document.createElement("img");
        gif.src = data.data[i].images.fixed_height_still.url;
        gif.setAttribute("action", data.data[i].images.fixed_height.url);
        gif.setAttribute("still", data.data[i].images.fixed_height_still.url);
        gif.id = "data.data[i].images.";
        $(".gifs").append(gif);
      }
    },
  });
};

const createbtns = () => {
  for (var i = 0; i < oldStuff.length; i++) {
    var $btn = $("<input/>").attr({
      type: "button",
      class: "buttons",
      value: oldStuff[i],
    });
    $(".btns").append($btn);
  }
};
createbtns();
const newbtn = (searchInput) => {
  var $btn = $("<input/>").attr({
    type: "button",
    class: "buttons",
    value: searchInput,
  });
  $(".btns").append($btn);
};

$("#submitbutton").click(() => {
  // I gave up on the jquery here
  let searchValue = document.getElementById("searchBox").value;
  console.log(searchValue);
  if (searchValue !== "") {
    if (oldStuff.indexOf(searchValue) == -1) {
      oldStuff.push(searchValue);
      newbtn(searchValue);
    }
    searchGif(searchValue);
    currentSearch = searchValue;
  }
});
$(".btns").on("click", (e) => {
  //   debugger;
  searchGif(e.target.value);
  currentSearch = e.target.value;
});

$(".gifs").on("click", (e) => {
  console.log(e.target);
  let gif = e.target;
  console.log(gif.src);
  let actionstate = gif.getAttribute("action");
  let stillstate = gif.getAttribute("still");
  if (gif.src === actionstate) {
    gif.setAttribute("src", stillstate);
  } else if (gif.src === stillstate) {
    gif.setAttribute("src", actionstate);
  }
});
