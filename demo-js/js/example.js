var userProfile = {};

/**
 * refreshFeed
 * 
 * Removes previously added feed and replaces it with a fresh dataset. Call it after
 * liking/disliking a product or brand to see the changes on the profile
 */
function refreshFeed() {
    $('.myFeedList li, .feedCounter').remove();
    getMyFeed();
    $('#refreshFeed').hide();
}

/**
 * brandLike
 * 
 * Likes a brand and fades it out
 * @param brandId
 */
function brandLike(brandId) {
    $.ajax({
        type: "PUT",
        url: 'https://api.dz.zalan.do/customer-profiles/' + userProfile.feed_id + '/preferences/brand%3A' + brandId,
        headers: {
            'Content-Type': "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        data: JSON.stringify({"opinion": "LIKE"}),
        success: function () {
            $('#refreshFeed').show();
            $('#' + brandId).find('.dislikeBrand').fadeTo('slow',0);
            $('#' + brandId).find('.likeBrand').addClass('liked');
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * brandDislike
 * 
 * Dislikes the brand and fades out the brand
 * @param brandId
 */
function brandDislike(brandId) {
    $.ajax({
        type: "PUT",
        url: 'https://api.dz.zalan.do/customer-profiles/' + userProfile.feed_id + '/preferences/brand%3A' + brandId,
        headers: {
            'Content-Type': "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        data: JSON.stringify({"opinion": "DISLIKE"}),
        success: function () {
            $('#refreshFeed').show();
            $('#' + brandId).closest('li').fadeTo('slow',0.25);
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * articleLike
 * 
 * Likes an article and removes dislike button
 * @param articleId
 */
function articleLike(articleId) {
    $.ajax({
        type: "PUT",
        url: 'https://api.dz.zalan.do/customer-profiles/' + userProfile.feed_id + '/preferences/article%3A' + articleId,
        headers: {
            'Content-Type': "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        data: JSON.stringify({"opinion": "LIKE"}),
        success: function () {
            $('#refreshFeed').show();
            $('#' + articleId).find('.dislikeArticle').fadeTo('slow',0);
            $('#' + articleId).find('.likeArticle').addClass('liked');
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * articleDislike
 * 
 * Dislikes an article and fades it out
 * @param articleId
 */
function articleDislike(articleId) {
    $.ajax({
        type: "PUT",
        url: 'https://api.dz.zalan.do/customer-profiles/' + userProfile.feed_id + '/preferences/article%3A' + articleId,
        headers: {
            'Content-Type': "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        data: JSON.stringify({"opinion": "DISLIKE"}),
        success: function () {
            $('#refreshFeed').show();
            $('#' + articleId).closest('li').fadeTo('slow',0.25);
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * displayBrand
 * 
 * Outputs a single brand to an li element
 * @param $element ul element to attach to
 * @param item brand object
 */
function displayBrand($element, item) {
    $element.append('<li><div class="brandContainer"><img src="' + item.brand.umage_url + '"></div>' + item.brand.name + 
        '<div class="opinion" id="' + item.id + '"><a class="dislikeBrand"></a><a class="likeBrand"></a></div></li>');
}

/**
 * displayArticleComposition
 *
 * Outputs a single article to an li element
 * @param $element ul element to fill
 * @param item article_composition object
 */
function displayArticleComposition ($element, item) {
    $element.append('<li><img src="' + item.article_composition.umage_url +
        '" alt="' + item.article_composition.style_name + '">' +
        item.article_composition.style_name + '</li>');
}

/**
 * displaySingleArticle
 * 
 * Outputs a single article to an li element
 * @param $element ul element to fill
 * @param item single article object
 */
function displaySingleArticle($element, item) {
    $element.append('<li><img src="' + item.article.umage_url +
        '" alt="' + item.article.description + '">' +
        item.article.description + '<br>' + item.article.price.original_price.formatted +
        '<div class="opinion" id="' + item.id + '"><a class="dislikeArticle"></a><a class="likeArticle"></a></div></li>');
}

/**
 * addLikeDislikeEvents
 * 
 * Helper function for registering events
 */
function addLikeDislikeEvents() {
    $('.dislikeArticle').on('click', function () {
        var articleId = $(this).parent().attr('id');
        articleDislike(articleId);
    });
    $('.likeArticle').on('click', function () {
        var articleId = $(this).parent().attr('id');
        articleLike(articleId);
    });
    $('.dislikeBrand').on('click', function () {
        var brandId = $(this).parent().attr('id');
       brandDislike(brandId);
    });
    $('.likeBrand').on('click', function () {
        var brandId = $(this).parent().attr('id');
        brandLike(brandId);
    });
}

/**
 * displayPersonalReco
 *
 * Displays the top brands in the webpage. The webpage was run
 * on an secured connection, else the images are unavailable
 * @param myFeed The Items in the response JSON
 */
function displayMyFeed(myFeed) {
    var $myFeed = $('.feed .detail');
    var $myFeedList = $('.myFeedList');

    $myFeed.prepend('<p class="feedCounter">Retrieved ' + myFeed.length + ' elements</p>');

    $.each(myFeed, function (index, item) {
        if (item.article_composition !== undefined) {
            displayArticleComposition($myFeedList, item);
        } else if (item.article !== undefined) {
            displaySingleArticle($myFeedList, item);
        } else if (item.brand !== undefined) {
            displayBrand($myFeedList, item);
        }
    });
    $myFeedList.slideDown('slow');
    addLikeDislikeEvents();
}

/**
 * getMyFeed
 *
 * Retrieves the personal feed with brands, products, reco...
 * from the zalando myFeed API
 */
function getMyFeed() {
    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/feeds/" + userProfile.feed_id + "/items",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        success: function (data) {
            $('#getFeed').remove();
            displayMyFeed(data.items);
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * displayPersonalReco
 *
 * Displays the top brands in the webpage. The webpage was run
 * on an secured connection, else the images are unavailable
 * @param personalReco The Items in the response JSON
 */
function displayPersonalReco(personalReco) {
    var $recoBrand = $('.recoBrands .detail');
    var $recoList = $('.recoList');

    $recoBrand.prepend('<p>Retrieved ' + personalReco.length + ' elements</p>');

    $.each(personalReco, function (index, item) {
        $recoList.append('<li><div class="brandContainer"><img src="' + item.brand.umage_url + '"></div>' + item.brand.name + '</li>');
    });
    $recoBrand.slideDown('slow');
}

/**
 * getPersonalReco
 *
 * Retrieves personalized recommendations
 * from the zalando myFeed API
 */
function getPersonalReco() {
    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/feeds/" + userProfile.feed_id + "/sources/brand_reco/streams/personalized/items",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        success: function (data) {
            $('#getReco').remove();
            displayPersonalReco(data.items);
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * displayTopBrands
 * 
 * Displays the top brands in the webpage. The webpage has to run
 * on an secured connection, else the images are unavailable
 * @param topBrands The Items in the response JSON
 */
function displayTopBrands(topBrands) {
    var $topBrand = $('.topBrands .detail');
    var $topBrandList = $('.topBrandList');
    
    $topBrand.prepend('<p>Retrieved ' + topBrands.length + ' elements</p>');

    $.each(topBrands, function (index, item) {
        $topBrandList.append('<li><div class="brandContainer"><img src="' + item.brand.umage_url + '"></div>' + item.brand.name + '</li>');
    });
    $topBrand.slideDown('slow');
}

/**
 * getTopBrands
 * 
 * Retrieves the not personalized top brands
 * from the zalando myFeed API
 */
function getTopBrands() {
    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/feeds/MALE/sources/brand_reco/streams/top/items",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        success: function (data) {
            $('#getTopBrands').remove();
            displayTopBrands(data.items);
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * getProfile()
 * 
 * Retrieves the profileinformation with feed id for
 * the currently authenticated user.
 */
function getProfile(useMeProfile) {
    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/auth/me",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        success: function (data) {
            userProfile.email = data.email;
            if (useMeProfile) {
                userProfile.feed_id = 'me';
            } else {
                userProfile.feed_id = data.feed_id;
            }
            userProfile.gender = data.gender;
            userProfile.name = data.name;
            $('.profileName').append(userProfile.name);
            $('.profileEmail').append(userProfile.email);
            $('.profileGender').append(userProfile.gender);
            $('.profileFeedId').append(userProfile.feed_id);
            $('.profile .detail, .recoBrands, .feed').fadeIn();
            $('#getProfile, #meProfile').remove();
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
}

/**
 * login
 * 
 * authenticates the user and saves the authentication token
 * in userProfile
 * @returns {boolean}
 */
function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var base64encodedCredentials = btoa(username + ':' + password);

    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/auth/token",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: "Basic" + base64encodedCredentials
        },
        success: function (data) {
            $('.login fieldset').append('<small>Successfully login. Token received.</small>');
            userProfile.access_token = data.access_token;
            userProfile.access_type = data.access_type;
            $('.login form').slideUp('slow');
            $('.profile, .topBrands').fadeIn();
        },
        error: function (data) {
            window.console.log('ERROR');
            window.console.log(data);
        }
    });
    return false;
}

$(document).ready(function () {
    $('#login').on('click', login);
    $('#getProfile').on('click', function () {
        getProfile(false);
    });
    $('#meProfile').on('click', function () {
        getProfile(true)
    });
    $('#getTopBrands').on('click', getTopBrands);
    $('#getReco').on('click', getPersonalReco);
    $('#getFeed').on('click', getMyFeed);
    $('#refreshFeed').on('click', refreshFeed);
});