<template>
  <div v-if="originWeatherData === ''" class="spinner-container">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="weather-app-container" v-else>
    <div class="header-container">
      <div class="header-container-top">
        <span class="text-city">東京 今</span>
        <button @click="logout" type="button" class="btn btn-outline-light">
          logout
        </button>
      </div>
      <div class="current-temperature-wrapper">
        <span class="text-current-temperature">{{ currentTemperature }}℃</span>
        <i
          v-if="originWeatherData.current.rain === 1"
          class="weather-icon fa-solid fa-umbrella"
        ></i>
        <i
          v-else-if="
            originWeatherData.current.cloud_cover >= 51 &&
            originWeatherData.current.cloud_cover <= 100 &&
            originWeatherData.current.rain === 0
          "
          class="weather-icon fa-solid fa-cloud"
        ></i>
        <i
          v-else-if="
            originWeatherData.current.cloud_cover >= 1 &&
            originWeatherData.current.cloud_cover <= 50 &&
            originWeatherData.current.rain === 0 &&
            originWeatherData.current.is_day === 1
          "
          class="weather-icon fa-solid fa-cloud-sun"
        ></i>
        <i
          v-else-if="
            originWeatherData.current.cloud_cover >= 1 &&
            originWeatherData.current.cloud_cover <= 50 &&
            originWeatherData.current.rain === 0 &&
            originWeatherData.current.is_day === 0
          "
          class="weather-icon fa-solid fa-cloud-moon"
        ></i>
        <i
          v-else-if="
            originWeatherData.current.cloud_cover === 0 &&
            originWeatherData.current.rain === 0 &&
            originWeatherData.current.is_day === 1
          "
          class="weather-icon fa-regular fa-sun"
        ></i>
        <i
          v-else-if="
            originWeatherData.current.cloud_cover === 0 &&
            originWeatherData.current.rain === 0 &&
            originWeatherData.current.is_day === 0
          "
          class="weather-icon fa-regular fa-moon"
        ></i>
      </div>
      <div class="current-sensory-temperature-wrapper">
        <span class="text-current-sensory-temperature"
          >体感温度{{ apparentTemperature }}℃</span
        >
      </div>
      <div>
        <span class="text-todays-high">最高気温{{ maxTemperature }}℃</span>
        <span class="text-todays_low">最低気温{{ minTemperature }}℃</span>
      </div>
    </div>
    <div class="main-container">
      <span class="text-hourly-weather">1時間ごとの天気</span>
      <div class="hourly-weather-wrapper">
        <div
          v-for="hourlyWeatherItem in hourlyWeatherItems"
          :key="hourlyWeatherItem.id"
          class="hourly-weather-item"
        >
          <div class="hourly-weather-item-temperature">
            {{ hourlyWeatherItem.temperature }}℃
          </div>
          <div class="hourly-weather-item-rainfall-probability">
            {{ hourlyWeatherItem.rainfall_probability }}%
          </div>
          <div>
            <i
              v-if="hourlyWeatherItem.icon === 0"
              class="weather-icon sun-color fa-regular fa-sun"
            ></i>
            <i
              v-else-if="hourlyWeatherItem.icon === 1"
              class="weather-icon moon-color fa-regular fa-moon"
            ></i>
            <i
              v-else-if="hourlyWeatherItem.icon === 2"
              class="weather-icon cloud-color fa-solid fa-cloud"
            ></i>
            <i
              v-else-if="hourlyWeatherItem.icon === 3"
              class="weather-icon umbrella-color fa-solid fa-umbrella"
            ></i>
          </div>
          <div class="hourly-weather-item-time">
            {{ hourlyWeatherItem.time }}
          </div>
        </div>
      </div>
    </div>
    <div class="other-days-weather-container">
      <span class="text-other-days-weather-container">10日間天気予報</span>
      <div
        v-for="(otherDaysWeatherItem, index) in otherDaysWeatherItems"
        :key="otherDaysWeatherItem.id"
      >
        <div
          v-if="index === 0"
          class="other-days-weather-wrapper first-wrapper"
        >
          <div class="other-days-weather-wrapper-left">
            {{ otherDaysWeatherItem.day }}
          </div>
          <div class="other-days-weather-wrapper-right">
            <div class="other-days-weather-wrapper-pre-and-icon">
              <div class="other-days-weather-wrapper-pre">
                {{ otherDaysWeatherItem.precipitation_probability_max }}
              </div>
              <i
                v-if="otherDaysWeatherItem.icon === 0"
                class="weather-icon sun-color fa-regular fa-sun"
              ></i>
              <i
                v-else-if="otherDaysWeatherItem.icon === 1"
                class="weather-icon cloud-color fa-solid fa-cloud"
              ></i>
              <i
                v-else-if="otherDaysWeatherItem.icon === 2"
                class="weather-icon umbrella-color fa-solid fa-umbrella"
              ></i>
            </div>
            {{ otherDaysWeatherItem.temperature_2m_max }} /
            {{ otherDaysWeatherItem.temperature_2m_min }}
          </div>
        </div>
        <div
          v-else-if="index === otherDaysWeatherItems.length - 1"
          class="other-days-weather-wrapper end-wrapper"
        >
          <div class="other-days-weather-wrapper-left">
            {{ otherDaysWeatherItem.day }}
          </div>
          <div class="other-days-weather-wrapper-right">
            <div class="other-days-weather-wrapper-pre-and-icon">
              <div class="other-days-weather-wrapper-pre">
                {{ otherDaysWeatherItem.precipitation_probability_max }}
              </div>
              <i
                v-if="otherDaysWeatherItem.icon === 0"
                class="weather-icon sun-color fa-regular fa-sun"
              ></i>
              <i
                v-else-if="otherDaysWeatherItem.icon === 1"
                class="weather-icon cloud-color fa-solid fa-cloud"
              ></i>
              <i
                v-else-if="otherDaysWeatherItem.icon === 2"
                class="weather-icon umbrella-color fa-solid fa-umbrella"
              ></i>
            </div>
            {{ otherDaysWeatherItem.temperature_2m_max }} /
            {{ otherDaysWeatherItem.temperature_2m_min }}
          </div>
        </div>
        <div v-else class="other-days-weather-wrapper middle-wrapper">
          <div class="other-days-weather-wrapper-left">
            {{ otherDaysWeatherItem.day }}
          </div>
          <div class="other-days-weather-wrapper-right">
            <div class="other-days-weather-wrapper-pre-and-icon">
              <div class="other-days-weather-wrapper-pre">
                {{ otherDaysWeatherItem.precipitation_probability_max }}
              </div>
              <i
                v-if="otherDaysWeatherItem.icon === 0"
                class="weather-icon sun-color fa-regular fa-sun"
              ></i>
              <i
                v-else-if="otherDaysWeatherItem.icon === 1"
                class="weather-icon cloud-color fa-solid fa-cloud"
              ></i>
              <i
                v-else-if="otherDaysWeatherItem.icon === 2"
                class="weather-icon umbrella-color fa-solid fa-umbrella"
              ></i>
            </div>
            {{ otherDaysWeatherItem.temperature_2m_max }} /
            {{ otherDaysWeatherItem.temperature_2m_min }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getAuth, signOut } from "firebase/auth";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      originWeatherData: "" as any,
      hourlyWeatherItems: [] as any,
      otherDaysWeatherItems: [] as any,
    };
  },
  mounted() {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current=temperature_2m,apparent_temperature,is_day,rain,cloud_cover&hourly=temperature_2m,precipitation_probability,rain,cloud_cover_high&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=10`
      )
      .then((response) => {
        console.log(response.data);
        this.originWeatherData = response.data;
        this.toggleBodyColorByWeatherApp();
        this.makeHourlyWeatherItems();
        this.makeOtherDaysWeatherItems();
      })
      .catch((error) => {
        console.error(error);
      });
  },
  beforeUnmount() {
    this.toggleBodyColorByWeatherApp();
  },
  computed: {
    currentTemperature(): number {
      return this.originWeatherData.current.temperature_2m;
    },
    apparentTemperature(): number {
      return this.originWeatherData.current.apparent_temperature;
    },
    maxTemperature(): number {
      return this.originWeatherData.daily.temperature_2m_max[0];
    },
    minTemperature(): number {
      return this.originWeatherData.daily.temperature_2m_min[0];
    },
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // ログアウトが成功した場合の処理
          console.log("User signed out");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          // エラーが発生した場合の処理
          console.error("Error signing out:", error);
        });
    },
    /**
     * WeatherApp によって body のクラスと背景色を切り替える関数
     */
    toggleBodyColorByWeatherApp() {
      const bodyEl = document.getElementsByTagName("body")[0];
      bodyEl.classList.toggle("weatherapp");
      if (this.originWeatherData.current.is_day === 1) {
        bodyEl.classList.toggle("weatherapp-background-color-daytime");
      } else {
        bodyEl.classList.toggle("weatherapp-background-color-night");
      }
    },
    /**
     * 時間毎の天気情報を生成する関数
     */
    makeHourlyWeatherItems() {
      const now = new Date();
      const currentHour = now.getHours();

      // 今日の日没と明日の日の出の時間を取得する
      const sunset = new Date(
        this.originWeatherData.daily.sunset[0]
      ).getHours();
      const sunrise = new Date(
        this.originWeatherData.daily.sunrise[1]
      ).getHours();

      // 現在時刻が日没前かどうかを判定する
      let isBeforeSunset = currentHour < sunset;
      const iconForNow = isBeforeSunset ? 0 : 1;

      // 現在時刻を同じ形式で取得する
      const currentDateTimeString = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now
        .getDate()
        .toString()
        .padStart(2, "0")}T${currentHour.toString().padStart(2, "0")}:00`;

      // 同じ時刻のindexを取得する
      let indexHourlyTime = this.originWeatherData.hourly.time.findIndex(
        (time: string) => time === currentDateTimeString
      );

      // "今"のオブジェクトを配列に追加
      this.hourlyWeatherItems.push({
        id: uuidv4(),
        temperature: this.originWeatherData.current.temperature_2m,
        rainfall_probability:
          this.originWeatherData.hourly.precipitation_probability[
            indexHourlyTime
          ],
        icon: iconForNow,
        time: "今",
      });
      indexHourlyTime++;

      // 現在の時刻から1時間毎にオブジェクトを生成して配列に追加
      for (let t = currentHour + 1; t < currentHour + 25; t++) {
        const time = t % 24; // 時間を24時間制に変換

        // cloud_cover_highが50以上の場合はアイコンを2に設定
        const cloudCoverHigh =
          this.originWeatherData.hourly.cloud_cover_high[indexHourlyTime];
        let icon = cloudCoverHigh >= 50 ? 2 : isBeforeSunset ? 0 : 1;

        // rainが1の場合はアイコンを3に設定
        if (
          this.originWeatherData.hourly.precipitation_probability[
            indexHourlyTime
          ] > 50
        ) {
          icon = 3;
        }

        this.hourlyWeatherItems.push({
          id: uuidv4(),
          temperature:
            this.originWeatherData.hourly.temperature_2m[indexHourlyTime],
          rainfall_probability:
            this.originWeatherData.hourly.precipitation_probability[
              indexHourlyTime
            ],
          icon: icon,
          time: `${time}:00`,
        });

        // 日没前かどうかを更新する
        if (time === sunset) {
          isBeforeSunset = false; // 日没後
        } else if (time === sunrise) {
          isBeforeSunset = true; // 日の出前
        }

        indexHourlyTime++;
      }
    },
    makeOtherDaysWeatherItems() {
      const today = new Date();
      const days = [
        "日曜日",
        "月曜日",
        "火曜日",
        "水曜日",
        "木曜日",
        "金曜日",
        "土曜日",
      ];

      for (let i = 0; i <= 9; i++) {
        const date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i
        );
        const dayOfWeek = i === 0 ? "今日" : days[date.getDay()];
        this.otherDaysWeatherItems.push({
          id: uuidv4(),
          day: dayOfWeek,
          precipitation_probability_max:
            this.originWeatherData.daily.precipitation_probability_max[i] >= 30
              ? this.originWeatherData.daily.precipitation_probability_max[i] +
                "%"
              : "",
          icon:
            this.originWeatherData.daily.weather_code[i] === 0
              ? 0
              : this.originWeatherData.daily.weather_code[i] === 1 ||
                this.originWeatherData.daily.weather_code[i] === 2 ||
                this.originWeatherData.daily.weather_code[i] === 3
              ? 1
              : 2,
          temperature_2m_max:
            this.originWeatherData.daily.temperature_2m_max[i],
          temperature_2m_min:
            this.originWeatherData.daily.temperature_2m_min[i],
        });
      }
    },
  },
});
</script>

<style>
.spinner-container {
  text-align: center;
  margin-top: 100px;
}
.weatherapp {
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0 10%;
  color: white;
}
.weather-app-container {
  width: 1000px;
  margin: 0 auto;
}
.header-container-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;
}
.weatherapp-background-color-daytime {
  background-image: linear-gradient(
    90deg,
    rgba(65, 164, 253, 1),
    rgba(14, 244, 255, 1)
  );
}
.weatherapp-background-color-night {
  background-image: linear-gradient(
    90deg,
    rgba(103, 126, 250, 1),
    rgba(142, 84, 219, 1)
  );
}
.text-city {
  font-size: 1.7rem;
}
.current-temperature-wrapper {
  display: flex;
  justify-content: space-between;
}
.text-current-temperature {
  font-size: 5rem;
}
.weather-icon {
  font-size: 100px;
}
.current-sensory-temperature-wrapper {
  margin-bottom: 20px;
}
.text-current-sensory-temperature {
  font-size: 1.3rem;
}
.text-todays-high {
  font-size: 1.6rem;
}
.text-todays_low {
  margin-left: 20px;
  font-size: 1.6rem;
}
.main-container {
  margin-top: 30px;
}
.text-hourly-weather {
  font-size: 2rem;
}
.hourly-weather-wrapper {
  width: auto;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  color: black;
  white-space: nowrap;
  overflow-x: auto;
  padding-top: 10px;
}
.hourly-weather-wrapper::-webkit-scrollbar {
  display: none;
}
.hourly-weather-item {
  display: inline-block;
  margin: 0 50px;
}
.hourly-weather-item-temperature {
  display: flex;
  justify-content: center;
}
.hourly-weather-item-rainfall-probability {
  display: flex;
  justify-content: center;
}
.sun-color {
  color: orange;
}
.moon-color {
  color: cadetblue;
}
.cloud-color {
  color: lightgray;
}
.umbrella-color {
  color: cornflowerblue;
}
.hourly-weather-item-time {
  display: flex;
  justify-content: center;
}
.other-days-weather-container {
  margin-top: 30px;
}
.text-other-days-weather-container {
  font-size: 2rem;
}
.other-days-weather-wrapper {
  width: auto;
  height: 100px;
  background-color: white;
  color: black;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.other-days-weather-wrapper-left {
  padding-left: 20px;
}
.other-days-weather-wrapper-right {
  display: flex;
  align-items: center;
  padding-right: 20px;
}
.other-days-weather-wrapper-pre-and-icon {
  display: flex;
  align-items: center;
  padding-right: 100px;
}
.other-days-weather-wrapper-pre {
  padding-right: 50px;
}
.first-wrapper {
  border-radius: 20px 20px 5px 5px;
}
.middle-wrapper {
  border-radius: 5px;
}
.end-wrapper {
  border-radius: 5px 5px 20px 20px;
}
</style>
