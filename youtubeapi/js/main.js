run();
async function run(){
var channelId = 'UCimIdsDPn0mE03Cb7C6aR8Q';
var key = 'AIzaSyALvM3i_oXBwh0utMvgnzFhoQkcjg82h1M';

var token = null;
const temp=window.location.href;
const lang=temp.substring(temp.indexOf("/courses"));

const result = await fetch(lang, {
    method: 'POST',
}).then((res) => res.json())
const cid=result.data.cid;
const result2=await fetch('/increment', {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cid
        })
}).then((res) => res.json());
var playlistId = result.data.vlink;
console.log(playlistId);
$(document).ready(function () {

    // Event Listeners for articles
    $('main').on('click', 'article', function (e) {
        if ($(e.currentTarget).hasClass('item')) {
            var id = $(this).attr('data-key');
            displayVid(id);
        }
    });

    // Load Videos On Page Load
    loadVids(token);
    //Load More Videos On Click
    $('.load-more').on("click", function (e) {
        e.preventDefault();
        var next = $(this).attr('data-key');

        if (next !== "") {
            loadVids(next);
        }
    });


    //Get Request
    function loadVids(token) {
        $.get(
            'https://www.googleapis.com/youtube/v3/playlistItems', {
                part: 'snippet',
                key: key,
                maxResults: 10,
                playlistId: playlistId,
                pageToken: token
            },
            function (data) {
                var nextPage = data.nextPageToken;
                resultsLeft(nextPage);
                resultsLoop(data);
            }
        );
    }

    //Check if there are any results left
    function resultsLeft(nextPage) {
        if (nextPage === undefined) {
            $('.load-more').attr("data-key", "").html('No More Results').addClass('disabled');
        } else {
            $('.load-more').attr("data-key", nextPage);
        }
    }

    //Loop through results and display them on the dom.
    function resultsLoop(data) {
        $.each(data.items, function (i, item) {
            var count=1;
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var vid = item.snippet.resourceId.videoId;
            if(count==1)
            displayVid(vid)
            count++;
            if (item.snippet.description.length > 100) {
                var desc = item.snippet.description.substring(0, 100) + ' ...';
            } else {
                var desc = item.snippet.description;
            }

            $('main').append(`
            <article id="item${i + 1}" class="item" data-key="${vid}">
                <div class="thumb-container">
                    <img src="${thumb}" class="thumb">
                </div>
                <div class="vid-details">
                    <h1>${title}</h1>
                    <p class="description">${desc}</p>
                </div>
            </article>`);
        });
    }

    // Select Video Function
    function displayVid(id) {
        $('#video').html(`<iframe class="video" src="https://www.youtube.com/embed/${id}?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=0" frameborder="0" allowfullscreen></iframe>`);
    }


    //--------------------
    // Aspect ratio for video
    //-------------------- 
    var $allVideos = $("iframe[src^='//www.youtube.com'], object, embed"),
        $fluidEl = $("figure");

    $allVideos.each(function () {

        $(this)
            // jQuery .data does not work on object/embed elements
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');
    });

    $(window).resize(function () {

        var newWidth = $fluidEl.width();
        $allVideos.each(function () {
            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.attr('data-aspectRatio'));
        });
    }).resize();
});
}
