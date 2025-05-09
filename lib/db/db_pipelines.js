const groupByHourPipeline = (startDate) => {
  return [
    { $match: { date: { $gte: startDate } } },
    {
      $project: {
        year: { $year: "$date" },
        month: { $month: "$date" },
        day: { $dayOfMonth: "$date" },
        hour: { $hour: "$date" },
        pm25: 1,
        pm10: 1,
        temp: 1,
        hum: 1
      }
    },
    {
      $group: {
        _id: {
          y: "$year",
          m: "$month",
          d: "$day",
          h: "$hour"
        },
        pm25: { $avg: "$pm25" },
        pm10: { $avg: "$pm10" },
        temp: { $avg: "$temp" },
        hum: { $avg: "$hum" }
      }
    },
    {
      $addFields: {
        date: {
          $dateFromParts: {
            year: "$_id.y",
            month: "$_id.m",
            day: "$_id.d",
            hour: "$_id.h"
          }
        },
        pm25: { $trunc: ["$pm25", 2] },
        pm10: { $trunc: ["$pm10", 2] },
        temp: { $trunc: ["$temp", 2] },
        hum: { $trunc: ["$hum", 2] }
      }
    },
    { $sort: { date: 1 } },
    { $project: { _id: 0 } }
  ];
};

const groupByDayPipeline = (startDate) => {
  return [
    { $match: { date: { $gte: startDate } } },
    {
      $project: {
        year: { $year: "$date" },
        month: { $month: "$date" },
        day: { $dayOfMonth: "$date" },
        pm25: 1,
        pm10: 1,
        temp: 1,
        hum: 1
      }
    },
    {
      $group: {
        _id: {
          y: "$year",
          m: "$month",
          d: "$day"
        },
        pm25: { $avg: "$pm25" },
        pm10: { $avg: "$pm10" },
        temp: { $avg: "$temp" },
        hum: { $avg: "$hum" }
      }
    },
    {
      $addFields: {
        date: {
          $dateFromParts: {
            year: "$_id.y",
            month: "$_id.m",
            day: "$_id.d"
          }
        },
        pm25: { $trunc: ["$pm25", 2] },
        pm10: { $trunc: ["$pm10", 2] },
        temp: { $trunc: ["$temp", 2] },
        hum: { $trunc: ["$hum", 2] }
      }
    },
    { $sort: { date: 1 } },
    { $project: { _id: 0 } }
  ];
};

module.exports = {
  groupByHourPipeline,
  groupByDayPipeline,
}