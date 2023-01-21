const d = document,
  $weather = d.getElementById("weather"),
  $clima = d.getElementById("ciudad"),
  $info = d.getElementById("inforamcion"),
  $template = d.getElementById("clima-template").content,
  $fragment = d.createDocumentFragment(),
  DOMAIN =
    "https://api.openweathermap.org/data/2.5/forecast?id=3435810&appid=4221734d8faa46e775b07f2383ece9f7&units=metric&lang=sp",
  DOMINIO =
    "https://api.openweathermap.org/data/2.5/weather?id=3435810&appid=4221734d8faa46e775b07f2383ece9f7&units=metric&lang=sp";

function getCiudad() {
  fetch(DOMINIO)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      $clima.querySelector(".ciudad-nombre").innerHTML = json.name;
      $clima.querySelector(".ciudad-fecha").innerHTML =
        new Date().toLocaleString();
      $clima.querySelector(
        ".ciudad-clima"
      ).src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
      $clima.querySelector(".ciudad-temp").innerHTML = `${Math.round(
        json.main.temp
      )}°`;
      $clima.querySelector(
        ".clima-desc"
      ).innerHTML = `Descripcion: ${json.weather[0].description}`;
      $clima.querySelector(
        ".humedad"
      ).innerHTML = `Humedad: ${json.main.humidity}%`;
      $clima.querySelector(
        ".sensacion-term"
      ).innerHTML = `Sensacion termica: ${Math.round(json.main.feels_like)}°`;
      $info
        .querySelector(".termica")
        .insertAdjacentHTML(
          "beforeend",
          `<p> Sensacion termica: ${Math.round(json.main.feels_like)}°</p>`
        );
      $info
        .querySelector(".humidity")
        .insertAdjacentHTML(
          "beforeend",
          `<p>Humedad: ${json.main.humidity}%</p>`
        );
      $info
        .querySelector(".nubes")
        .insertAdjacentHTML("beforeend", `<p>Nubes: ${json.clouds.all}%</p>`);
      function getDeg() {
        if (json.wind.deg === 0) return "N";
        if (json.wind.deg > 0 && json.wind.deg < 90) return "NE";
        if (json.wind.deg === 90) return "E";
        if (json.wind.deg > 90 && json.wind.deg < 190) return "SE";
        if (json.wind.deg === 180) return "S";
        if (json.wind.deg > 180 && json.wind.deg < 270) return "SO";
        if (json.wind.deg === 270) return "O";
        if (json.wind.deg > 270 && json.wind.deg < 360) return "NO";
      }
      $info
        .querySelector(".viento")
        .insertAdjacentHTML(
          "beforeend",
          `<p>Viento: ${Math.round(json.wind.speed)} km/h ${getDeg()}</p>`
        );
      $info
        .querySelector(".visibilidad")
        .insertAdjacentHTML(
          "beforeend",
          `<p>Visibilidad: ${json.visibility.toString().substr(0, 2)} km</p>`
        );
      $info
        .querySelector(".presion")
        .insertAdjacentHTML(
          "beforeend",
          `<p>Presion: ${json.main.sea_level} hPa</p>`
        );
    })
    .catch((error) => {
      console.warn(error);
    });
}

function getClima() {
  fetch(DOMAIN)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      /* console.log(json); */
      let lista = json.list;
      let list = lista.slice(28);
      /* console.log(list); */
      list.forEach((el) => {
        $template.querySelector(
          ".clima-icon"
        ).src = `http://openweathermap.org/img/wn/${el.weather[0].icon}.png`;
        $template.querySelector(".clima-temp").innerHTML = `${Math.round(
          el.main.temp
        )}°`;
        $template.querySelector(".clima-date").innerHTML = el.dt_txt.substr(
          11,
          5
        );

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });

      $weather.appendChild($fragment);
    })
    .catch((err) => {
      console.error(err);
    });
}
d.addEventListener("DOMContentLoaded", getCiudad);
d.addEventListener("DOMContentLoaded", getClima);
