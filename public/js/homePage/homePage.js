/**
 * HomePage JavaScript - Các chức năng dành riêng cho trang chủ
 * Bao gồm: Weather API, Location, Day/Night icon
 * 
 * LƯU Ý: Dự án Next.js hiện tại đã có logic weather trong Header.tsx (React)
 * File này cung cấp phiên bản vanilla JS để sử dụng nếu cần
 */

(function () {
    "use strict";

    /*==================================================================
    [ Weather Configuration ]*/
    var weatherConfig = {
        updateInterval: 30 * 60 * 1000, // 30 phút
        fallbackLat: 21.0285, // Hà Nội
        fallbackLon: 105.8542,
        dayIconPath: '/images/icons/icon-day.svg',
        nightIconPath: '/images/icons/icon-night.png'
    };

    /*==================================================================
    [ Get Location from Geolocation API ]*/
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    getWeatherData(lat, lon);
                },
                function (error) {
                    console.error('Error getting location:', error);
                    // Fallback: Hà Nội
                    getWeatherData(weatherConfig.fallbackLat, weatherConfig.fallbackLon);
                }
            );
        } else {
            // Fallback: Hà Nội
            getWeatherData(weatherConfig.fallbackLat, weatherConfig.fallbackLon);
        }
    }

    /*==================================================================
    [ Get Weather Data from Open-Meteo API ]*/
    async function getWeatherData(lat, lon) {
        try {
            // Lấy tên địa điểm từ Nominatim
            var geoResponse = await fetch(
                'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon,
                { headers: { 'User-Agent': 'WeatherApp/1.0' } }
            );
            var geoData = await geoResponse.json();

            // Hiển thị vị trí - cập nhật cả desktop và mobile
            if (geoData.address) {
                var city = geoData.address.city || geoData.address.town || geoData.address.village || 'Unknown';
                var country = geoData.address.country_code ? geoData.address.country_code.toUpperCase() : '';
                var locationText = '<span>' + city + ', ' + country + '</span>';

                // Cập nhật desktop
                updateElement('location', locationText);

                // Cập nhật mobile
                updateElement('location-mobile', locationText);
            }

            // Lấy thời tiết từ Open-Meteo
            var weatherResponse = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true&temperature_unit=celsius'
            );
            var weatherData = await weatherResponse.json();

            if (weatherData.current_weather) {
                var temp = Math.round(weatherData.current_weather.temperature);
                var weatherText = 'HI ' + temp + '° LO ' + (temp - 3) + '°';

                // Hiển thị nhiệt độ - cập nhật cả desktop và mobile
                updateElement('weather', weatherText);
                updateElement('weather-mobile', weatherText);

                // Cập nhật icon ngày/đêm
                updateDayNightIcon(weatherData.current_weather.is_day);
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
            var errorLocationText = '<span>Không thể tải vị trí</span>';
            var errorWeatherText = '<span>N/A</span>';

            // Cập nhật desktop
            updateElement('location', errorLocationText);
            updateElement('weather', errorWeatherText);

            // Cập nhật mobile
            updateElement('location-mobile', errorLocationText);
            updateElement('weather-mobile', errorWeatherText);

            // Fallback icon dựa trên giờ hiện tại
            updateDayNightIconByTime();
        }
    }

    /*==================================================================
    [ Update Day/Night Icon based on API data ]*/
    function updateDayNightIcon(isDay) {
        var iconSrc = isDay === 1
            ? weatherConfig.dayIconPath
            : weatherConfig.nightIconPath;
        var iconAlt = isDay === 1 ? 'Day' : 'Night';

        // Cập nhật desktop
        updateIconElement('weather-icon', iconSrc, iconAlt);

        // Cập nhật mobile
        updateIconElement('weather-icon-mobile', iconSrc, iconAlt);
    }

    /*==================================================================
    [ Fallback: Update Icon based on local time ]*/
    function updateDayNightIconByTime() {
        var hour = new Date().getHours();

        // Ngày: 6am - 6pm, Đêm: 6pm - 6am
        var iconSrc = (hour >= 6 && hour < 18)
            ? weatherConfig.dayIconPath
            : weatherConfig.nightIconPath;
        var iconAlt = (hour >= 6 && hour < 18) ? 'Day' : 'Night';

        // Cập nhật desktop
        updateIconElement('weather-icon', iconSrc, iconAlt);

        // Cập nhật mobile
        updateIconElement('weather-icon-mobile', iconSrc, iconAlt);
    }

    /*==================================================================
    [ Helper: Update Element innerHTML ]*/
    function updateElement(id, content) {
        var element = document.getElementById(id);
        if (element) {
            element.innerHTML = content;
        }
    }

    /*==================================================================
    [ Helper: Update Image Element ]*/
    function updateIconElement(id, src, alt) {
        var element = document.getElementById(id);
        if (element) {
            element.src = src;
            element.alt = alt;
        }
    }

    /*==================================================================
    [ Initialize Weather ]*/
    function initWeather() {
        // Hiển thị icon ngày/đêm ngay lập tức
        updateDayNightIconByTime();

        // Lấy dữ liệu thời tiết
        getLocation();

        // Cập nhật mỗi 30 phút
        setInterval(getLocation, weatherConfig.updateInterval);
    }

    /*==================================================================
    [ Export functions to window ]*/
    window.initHomePageJS = initWeather;
    window.refreshWeather = getLocation;

    /*==================================================================
    [ Auto init when DOM ready ]*/
    // Chỉ auto-init nếu chưa có React component xử lý weather
    // Trong dự án Next.js hiện tại, Header.tsx đã xử lý weather
    // Uncomment dòng dưới nếu muốn sử dụng vanilla JS thay vì React
    
    // window.addEventListener('DOMContentLoaded', function() {
    //     initWeather();
    // });

})();
