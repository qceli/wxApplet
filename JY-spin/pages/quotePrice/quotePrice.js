// pages/quotePrice/quotePrice.js
Page({
  data: {
    madeArray: [1.1, 1.15],
    workArray: [11000, 12000, 13000, 14000, 15000, 16000],
    cost: '',
    cost2: '',
    cost3: '',
    cost4: '',
    cost5: '',
    costArray: []
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  materialInputEvent: function (e) {
    var that = this
    var material = e.detail.value;
    console.log("material:" + material)
    var madeNum = that.data.index1;
    var made = that.data.madeArray[madeNum];
    console.log("made:" + made)
    console.log("made:" + material * made)
    var scale = that.data.scale / 100;
    this.setData({
      material: e.detail.value
    })
    console.log("material:" + material + "made:" + made + "scale:" + scale)
    if (scale != undefined && scale != '') {
      if (made != undefined && made != '') {
        var cost = material * made * scale;
        var newCost = cost.toFixed(2);
        console.log("cost:" + newCost)
        this.setData({
          cost: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[0] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  madePickerChange: function (e) {
    var that = this
    var material = that.data.material;
    var madeNum = e.detail.value;
    var made = that.data.madeArray[madeNum];
    console.log(made)
    var scale = that.data.scale;
    this.setData({
      index1: e.detail.value
    })
    console.log("material:" + material + ",made:" + made + "scale:" + scale)
    if (material != undefined && material != '') {
      if (scale != undefined && scale != '') {
        var scale = scale / 100;
        var cost = material * made * scale;
        var newCost = cost.toFixed(2);
        this.setData({
          cost: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[0] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  scaleInputEvent: function (e) {
    var that = this
    var material = that.data.material;
    console.log(material)
    var madeNum = that.data.index1;
    var made = that.data.madeArray[madeNum];
    var scale = e.detail.value / 100;
    this.setData({
      scale: e.detail.value
    })
    if (material != undefined && material != '') {
      if (madeNum != undefined && madeNum != '') {
        var cost = material * made * scale;
        var newCost = cost.toFixed(2);
        this.setData({
          cost: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[0] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
              }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  materialInputEvent2: function (e) {
    var that = this
    var material2 = e.detail.value;
    console.log("material2:" + material2)
    var madeNum = that.data.index2;
    var made = that.data.madeArray[madeNum];
    console.log("made:" + made)
    var scale2 = that.data.scale2;
    this.setData({
      material2: e.detail.value
    })
    console.log("material2:" + material2 + "made:" + made + "scale2:" + scale2)
    if (scale2 != undefined && scale2 != '') {
      if (made != undefined && made != '') {
        var scale2 = scale2 / 100;
        var cost2 = material2 * made * scale2;
        var newCost = cost2.toFixed(2);
        console.log("cost2:" + newCost)
        this.setData({
          cost2: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[1] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  madePickerChange2: function (e) {
    var that = this
    var material2 = that.data.material2;
    var madeNum = e.detail.value;
    var made = that.data.madeArray[madeNum];
    console.log(made)
    var scale2 = that.data.scale2;
    this.setData({
      index2: e.detail.value
    })
    console.log("material2:" + material2 + ",made:" + made + "scale2:" + scale2)
    if (material2 != undefined && material2 != '') {
      if (scale2 != undefined && scale2 != '') {
        var scale2 = scale2 / 100;
        var cost2 = material2 * made * scale2;
        var newCost = cost2.toFixed(2);
        this.setData({
          cost2: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[1] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  scaleInputEvent2: function (e) {
    var that = this
    var material2 = that.data.material2;
    console.log(material2)
    var madeNum = that.data.index2;
    var made = that.data.madeArray[madeNum];
    var scale2 = e.detail.value / 100;
    this.setData({
      scale2: e.detail.value
    })
    if (material2 != undefined && material2 != '') {
      if (madeNum != undefined && madeNum != '') {
        var cost2 = material2 * made * scale2;
        var newCost = cost2.toFixed(2);
        this.setData({
          cost2: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[1] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  materialInputEvent3: function (e) {
    var that = this
    var material3 = e.detail.value;
    console.log("material3:" + material3)
    var madeNum = that.data.index3;
    var made = that.data.madeArray[madeNum];
    console.log("made:" + made)
    var scale3 = that.data.scale3;
    this.setData({
      material3: e.detail.value
    })
    console.log("material3:" + material3 + "made:" + made + "scale3:" + scale3)
    if (scale3 != undefined && scale3 != '') {
      if (made != undefined && made != '') {
        var scale3 = scale3 / 100;
        var cost3 = material3 * made * scale3;
        var newCost = cost3.toFixed(2);
        console.log("cost3:" + newCost)
        this.setData({
          cost3: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[2] = newCost;
        console.log("costArray3:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("--------costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  madePickerChange3: function (e) {
    var that = this
    var material3 = that.data.material3;
    var madeNum = e.detail.value;
    var made = that.data.madeArray[madeNum];
    console.log(made)
    var scale3 = that.data.scale3;
    this.setData({
      index3: e.detail.value
    })
    console.log("material3:" + material3 + ",made:" + made + "scale3:" + scale3)
    if (material3 != undefined && material3 != '') {
      if (scale3 != undefined && scale3 != '') {
        var scale3 = scale3 / 100;
        var cost3 = material3 * made * scale3;
        var newCost = cost3.toFixed(2);
        this.setData({
          cost3: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[2] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  scaleInputEvent3: function (e) {
    var that = this
    var material3 = that.data.material3;
    console.log(material3)
    var madeNum = that.data.index3;
    var made = that.data.madeArray[madeNum];
    var scale3 = e.detail.value / 100;
    this.setData({
      scale3: e.detail.value
    })
    if (material3 != undefined && material3 != '') {
      if (madeNum != undefined && madeNum != '') {
        var cost3 = material3 * made * scale3;
        var newCost = cost3.toFixed(2);
        this.setData({
          cost3: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[2] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  materialInputEvent4: function (e) {
    var that = this
    var material4 = e.detail.value;
    console.log("material4:" + material4)
    var madeNum = that.data.index4;
    var made = that.data.madeArray[madeNum];
    console.log("made:" + made)
    var scale4 = that.data.scale4;
    this.setData({
      material4: e.detail.value
    })
    console.log("material4:" + material4 + "made:" + made + "scale4:" + scale4)
    if (scale4 != undefined && scale4 != '') {
      if (made != undefined && made != '') {
        var scale4 = scale4 / 100;
        var cost4 = material4 * made * scale4;
        var newCost = cost4.toFixed(2);
        console.log("cost4:" + newCost)
        this.setData({
          cost4: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[3] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  madePickerChange4: function (e) {
    var that = this
    var material4 = that.data.material4;
    var madeNum = e.detail.value;
    var made = that.data.madeArray[madeNum];
    console.log(made)
    var scale4 = that.data.scale4;
    this.setData({
      index4: e.detail.value
    })
    console.log("material4:" + material4 + ",made:" + made + "scale4:" + scale4)
    if (material4 != undefined && material4 != '') {
      if (scale4 != undefined && scale4 != '') {
        var scale4 = scale4 / 100;
        var cost4 = material4 * made * scale4;
        var newCost = cost4.toFixed(2);
        this.setData({
          cost4: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[3] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  scaleInputEvent4: function (e) {
    var that = this
    var material4 = that.data.material4;
    console.log(material4)
    var madeNum = that.data.index4;
    var made = that.data.madeArray[madeNum];
    var scale4 = e.detail.value / 100;
    this.setData({
      scale4: e.detail.value
    })
    if (material4 != undefined && material4 != '') {
      if (madeNum != undefined && madeNum != '') {
        var cost4 = material4 * made * scale4;
        var newCost = cost4.toFixed(2);
        this.setData({
          cost4: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[3] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  materialInputEvent5: function (e) {
    var that = this
    var material5 = e.detail.value;
    console.log("material5:" + material5)
    var madeNum = that.data.index5;
    var made = that.data.madeArray[madeNum];
    console.log("made:" + made)
    var scale5 = that.data.scale5;
    this.setData({
      material5: e.detail.value
    })
    console.log("material5:" + material5 + "made:" + made + "scale5:" + scale5)
    if (scale5 != undefined && scale5 != '') {
      if (made != undefined && made != '') {
        var scale5 = scale5 / 100;
        var cost5 = material5 * made * scale5;
        var newCost = cost5.toFixed(2);
        console.log("cost5:" + newCost)
        this.setData({
          cost5: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[4] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  madePickerChange5: function (e) {
    var that = this
    var material5 = that.data.material5;
    var madeNum = e.detail.value;
    var made = that.data.madeArray[madeNum];
    console.log(made)
    var scale5 = that.data.scale5;
    this.setData({
      index5: e.detail.value
    })
    console.log("material5:" + material5 + ",made:" + made + "scale5:" + scale5)
    if (material5 != undefined && material5 != '') {
      if (scale5 != undefined && scale5 != '') {
        var scale5 = scale5 / 100;
        var cost5 = material5 * made * scale5;
        var newCost = cost5.toFixed(2);
        this.setData({
          cost5: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[4] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
              console.log("costArray[" + i + "]:" + costArray[i])
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  },
  scaleInputEvent5: function (e) {
    var that = this
    var material5 = that.data.material5;
    console.log(material5)
    var madeNum = that.data.index5;
    var made = that.data.madeArray[madeNum];
    var scale5 = e.detail.value / 100;
    this.setData({
      scale5: e.detail.value
    })
    if (material5 != undefined && material5 != '') {
      if (madeNum != undefined && madeNum != '') {
        var cost5 = material5 * made * scale5;
        var newCost = cost5.toFixed(2);
        this.setData({
          cost5: newCost
        })
        var costTotal = 0;
        var costArray = that.data.costArray;
        costArray[4] = newCost;
        console.log("costArray1.length:" + costArray.length)
        if (costArray.length != 1) {
          for (var i = 0; i < costArray.length; i++) {
            if (costArray[i] == undefined || costArray[i] == '') {
              costArray[i] = 0;
            }
            costTotal = parseFloat(costTotal) + parseFloat(costArray[i]);
          }
        } else {
          costTotal = newCost;
        }
        costTotal = parseFloat(costTotal).toFixed(2);
        this.setData({
          costTotal: costTotal
        })
        var workPrice = 0;
        var salePrice = 0;
        var n = that.data.n;
        if (n != undefined && n != '') {
          salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
        } else {
          salePrice = costTotal;
        }
        salePrice = parseFloat(salePrice).toFixed(2);
        that.setData({
          salePrice: salePrice
        })
      }
    }
  }

  ,
  workPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var n = e.detail.value;
    this.setData({
      n: e.detail.value
    })
    var salePrice = 0;
    var costTotal = that.data.costTotal;
    console.log("costTotal:" + costTotal);
    if (costTotal == undefined || costTotal == '') {
      salePrice = that.data.workArray[n];
    } else {
      salePrice = parseFloat(that.data.workArray[n]) + parseFloat(costTotal);
    }
    salePrice = salePrice.toFixed(2);
    that.setData({
      salePrice: salePrice
    })
  }
})