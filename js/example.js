var userProfile = {};

/**
 * displayTopBrands
 * 
 * Displays the top brands in the webpage
 * @param topBrands The Items in the response JSON
 */
function displayTopBrands (topBrands) {
    var $topBrand = $('.topBrands .detail');
    var $topBrandList = $('.topBrandList');
    
    $topBrand.prepend('<p>Retrieved ' + topBrands.length + ' elements</p>');

    $.each(topBrands, function (index, item) {
        $topBrandList.append('<li><img href="' + item.brand.umage_url + '"><br>' + item.brand.name + '</li>')
    });
    $('.topBrands .detail').slideDown('slow');
}

/**
 * getTopBrands
 * 
 * Retrieves the not personalized top brands
 * from the zalando myFeed API
 */
function getTopBrands () {
    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/feeds/MALE/sources/brand_reco/streams/top/items",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        success: function (data) {
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
function getProfile () {
    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/auth/me",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        success: function (data) {
            userProfile.email = data.email;
            userProfile.feed_id = data.feed_id;
            userProfile.gender = data.gender;
            userProfile.name = data.name;
            $('.profileName').append(userProfile.name);
            $('.profileEmail').append(userProfile.email);
            $('.profileGender').append(userProfile.gender);
            $('.profileFeedId').append(userProfile.feed_id);
            $('.profile .detail').fadeIn();
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
function login () {
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
            $('.profile').fadeIn();
            $('.topBrands').fadeIn();
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
    $('#getProfile').on('click', getProfile);
    $('#getTopBrands').on('click', getTopBrands);
});