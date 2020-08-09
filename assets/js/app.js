jQuery(function($){

    let ipinfo = {
        'ip':'',
        'isp':'',
        'cuntry_name':'',
        'cuntry_code':'',
        'region_name':'',
        'region_code':'',
        'city_name':'',
        'latitude':'',
        'longitude':''
    };
    const set_ip = function(ip) {
        ipinfo.ip = ip;
        $('input[ name="ip"]').val(ip);
    }
    const set_isp = function(isp) {
        ipinfo.isp = isp;
        $('input[ name="isp"]').val(isp);
    }
    const set_country_name = function(cuntry_name) {
        ipinfo.country_name = cuntry_name;
        $('input[ name="country_name"]').val(cuntry_name);
    }
    const set_country_code = function(cuntry_code) {
        ipinfo.country_code = cuntry_code;
        $('input[ name="country_code"]').val(cuntry_code);
    }
    const set_region_name = function(region_name) {
        ipinfo.region_name = region_name;
        $('input[ name="region_name"]').val(region_name);
    }
    const set_region_code = function(region_code) {
        ipinfo.region_code = region_code;
        $('input[ name="region_code"]').val(region_code);
    }
    const set_city_name = function(city_name) {
        ipinfo.city_name = city_name;
        $('input[ name="city_name"]').val(city_name);
    }
    const set_latitude = function(latitude) {
        ipinfo.latitude = latitude;
        $('input[ name="latitude"]').val(latitude);
    }
    const set_longitude = function(longitude) {
        ipinfo.longitude = longitude;
        $('input[ name="longitude"]').val(longitude);
    }

    // https://www.ipify.org/
    const get_ipify = function() {
        $.getJSON("https://api64.ipify.org?format=jsonp&callback=?", function(data){
            set_ip(data.ip);
        });
    }
    // https://ip-api.com/docs/api:json
    const get_ipapi = function() {
        $.getJSON("http://ip-api.com/json/?callback=?", function(data){
            set_ip(data.query);
            set_isp(data.isp);
            set_country_name(data.country);
            set_country_code(data.countryCode);
            set_region_name(data.regionName);
            set_region_code(data.region);
            set_city_name(data.city);
        });
    }

    const get_ip = function(){
        get_ipapi();
    };

    function get_location() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(show_position);
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    
    function show_position(position) {
        set_latitude (position.coords.latitude);
        set_longitude(position.coords.longitude);
    }

    get_ip();
    get_location();
})