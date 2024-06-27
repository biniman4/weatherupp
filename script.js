
        const apiKey = "3f8413c13581d5e7ca3b55e7cbad7aac";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey;
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city) {
            try {
                console.log("Requesting weather data...");
                const response = await fetch(`${apiUrl}&q=${city}`);
                console.log("Response status:", response.status);
                if (response.status === 401) {
                    throw new Error("Unauthorized: Check your API key");
                }
                if (response.status === 404) {
                    throw new Error("City not found");
                }
                const data = await response.json();

                // Accessing specific data
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const windSpeed = data.wind.speed;
                const cityName = data.name;
                const humidity = data.main.humidity;

                // Update HTML elements
                document.querySelector(".temp").textContent = `${temperature}°C`;
                document.querySelector(".city").textContent = cityName;
                document.querySelector(".wind").textContent = `${windSpeed} km/h`;
                document.querySelector(".humidity").textContent = `${humidity}%`;

                const weatherCondition = data.weather[0].main.toLowerCase();

                if (weatherCondition === "clouds") {
                    weatherIcon.src = "imge/pngegg (42).png";
                } else if (weatherCondition === "clear") {
                    weatherIcon.src = "imge/pngegg (41).png";
                } else if (weatherCondition === "rain") {
                    weatherIcon.src = "imge/rain.png";
                } else if (weatherCondition === "mist") {
                    weatherIcon.src = "imge/pngegg (42).png";
                } else {
                    weatherIcon.src = "imge/pngegg (42).png"; // Default icon
                }

                document.querySelector(".weather").style.display = "block";

            } catch (error) {
                console.error("Error fetching weather data:", error);
                alert(error.message);
            }
        }

        searchBtn.addEventListener("click", () => {
            const city = searchBox.value.trim();
            if (city) {
                checkWeather(city);
            } else {
                alert("Please enter a city name");
            }
        });
    