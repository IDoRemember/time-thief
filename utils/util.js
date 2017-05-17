/**
  * 将时间转换为字符串
  */
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24
function getLocalDateTime(utcTimeStamp, beFull) {

    if (!utcTimeStamp) {
        return "unKnowTime"
    }

    const diffValue = Date.now() - utcTimeStamp

    //首先判断要显示的时间在未来还是在以前
    if (diffValue > 0) {
        //如果是一个以前的时间
        const weekC = diffValue / (7 * day)
        if (weekC > 4.5) {
            const time = new Date(utcTimeStamp)
            return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
        } else if (weekC >= 1) {
            return parseInt(weekC) + '周前'
        } else {
            const dayC = diffValue / day
            if (dayC >= 1) {
                return parseInt(dayC) + '天前'
            } else {
                const hourC = diffValue / hour
                if (hourC >= 1) {
                    return parseInt(hourC) + '时前'
                }
                else {
                    const minC = diffValue / minute
                    if (minC >= 1) {
                        return parseInt(minC) + '分前'
                    } else {
                        return Math.ceil(diffValue / 1000) + '秒前'
                    }
                }
            }
        }
    } else {
        //否则是一个未来的时间
        const then = new Date(utcTimeStamp),
            thenyear = then.getFullYear(),
            thenmonth = then.getMonth() + 1,
            thendate = then.getDate(),
            thenhour = then.getHours()

        let thenminute = then.getMinutes()

        if (thenminute < 10) {
            thenminute = "0" + thenminute
        }
        if (beFull) {
            return thenyear + "/" + thenmonth + "/" + thendate + " " + thenhour + ":" + thenminute
        } else {
            return thenyear + "/" + thenmonth + "/" + thendate
        }
    }

}


module.exports = {
  formatTime: formatTime,
  getLocalDateTime: getLocalDateTime
}
