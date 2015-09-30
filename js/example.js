var userProfile = {};

/**
 * getProfile()
 * 
 * Retrieves the profileinformation with feed id for
 * the currently authenticated user.
 */
function getProfile () {
    window.console.log(userProfile);

    $.ajax({
        type: "GET",
        url: "https://api.dz.zalan.do/auth/me",
        headers: {
            Accept: "application/x.zalando.myfeed+json;version=2",
            Authorization: userProfile.access_type + " " + userProfile.access_token
        },
        success: function (data) {
            $('.login fieldset').append('<small>Successfully received profile.</small>');
            userProfile.email = data.email;
            userProfile.feed_id = data.feed_id;
            userProfile.gender = data.gender;
            userProfile.name = data.name;
            userProfile.profile_id = data.profile_id;
            $('.profileName').append(userProfile.name);
            $('.profileEmail').append(userProfile.email);
            $('.profileGender').append(userProfile.gender);
            $('.profileFeedId').append(userProfile.feed_id);
            $('.profileId').append(userProfile.profile_id);
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
            $('.login form').fadeOut();
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
});