//封装具体的请求方法

//通过ip地址查询所在城市的请求方法
import request from "./axios";
export const getCityData = () => request.get("/ip?&key=3ed3408441e50bb8f6e9c6197ec55454");

//通过城市名查询adcode的请求方法
export const getWeatherData = (address) => request.get(`/geocode/geo?address=${address}&key=3ed3408441e50bb8f6e9c6197ec55454`)


// 通过adcode查询天气      返回实况天气
export const getWeatherByCode = (code) => request.get(`/weather/weatherInfo?key=3ed3408441e50bb8f6e9c6197ec55454&city=${code}`)

// 通过adcode查询天气    返回未来预报天气
export const getWeatherByCodeAll = (code) => request.get(`/weather/weatherInfo?key=3ed3408441e50bb8f6e9c6197ec55454&city=${code}&extensions=all`)





