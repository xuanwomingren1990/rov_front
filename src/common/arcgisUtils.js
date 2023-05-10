/**
 * 创建线
 * @param Graphic 实例对象
 * @param paths 路径经纬度数组
 * @param color 路径的颜色
 * @param borderWidth 路径的宽度
 * @param id  该图形的 ID，用于判断点击的图形
 * @returns {*}
 */
export function createLineGraphic (Graphic, paths, color, borderWidth, id) {
    return new Graphic({
      geometry: {
        type: 'polyline',
        paths: paths
      },
      symbol: {
        type: 'simple-line',
        color: color, // 颜色 rgb or rgba [255, 0, 0, 0.5] or 16进制
        width: borderWidth
      },
      attributes: {
        id: id
      }
    })
  }
  
  /**
   * 创建点
   * @param Graphic
   * @param lng 点的位置
   * @param lat
   * @param markerUrl 图片的 url
   * @param width 点的大小
   * @param height
   * @param id
   * @returns {*}
   */
  export function createPointGraphic (Graphic, lng, lat, markerUrl, width, height, id) {
    return new Graphic({
      geometry: {
        type: 'point',
        longitude: lng,
        latitude: lat
      },
      symbol: {
        type: 'picture-marker',
        url: markerUrl,
        width: width,
        height: height
      },
      attributes: {
        id: id
      }
    })
  }
  
  /**
   * 生成 'Graphic实例' 数组
   * @param Graphic Graphic类
   * @param graphicsData 生成 Graphic 实例的数据
   * @returns {[]}
   */
  export function manyGraphics (Graphic, graphicsData) {
    const graphics = []
    graphicsData.forEach(item => {
      if (item.paths) {
        graphics.push(createLineGraphic(Graphic, ...Object.values(item)))
      } else if (item.lng) {
        graphics.push(createPointGraphic(Graphic, ...Object.values(item)))
      }
    })
    return graphics
  }
  