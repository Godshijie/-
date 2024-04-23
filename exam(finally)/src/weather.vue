//高德的开放文档
getCity() {
            let that = this;
            let city=null;
            AMap.plugin('AMap.CitySearch', function() {
                var citySearch = new AMap.CitySearch();
                citySearch.getLocalCity(function(status, result) {
                    if (status === 'complete' && result.info === 'OK') { 
                       console.log(result,'城市信息')
                    }
                });
            });
        }



  // 获取天气
  //需要上个接口传个当前的城市名称之后再调用
        getWeather(city) {
            //加载天气查询插件
            AMap.plugin('AMap.Weather', function() {
                //创建天气查询实例
                let weather = new AMap.Weather();
                //执行实时天气信息查询
                weather.getLive(city, function(err, data) {
                    console.log(err, data);
                    if (data.info == 'OK') {
                    }
                });
            });
        }

            