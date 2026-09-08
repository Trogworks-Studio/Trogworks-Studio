import { config } from "@fortawesome/fontawesome-svg-core";

// Next.js ile birlikte kullanirken FontAwesome'un kendi CSS'ini otomatik
// eklemesini kapatiyoruz; stil src/app/layout.tsx icinde elle import edilir.
// Bu, sayfa yuklenirken ikonlarin "buyuk" gorunup sonra kuculmesi (FOUC)
// sorununu engeller.
config.autoAddCss = false;
