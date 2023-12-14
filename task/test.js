const fs = require('fs');

// Read the JSON file
const rawData = fs.readFileSync('../testData/input.json');
const jsonData = JSON.parse(rawData);
const output = []

//input to select the start time
arr_time = ['2023-04-29T00:00:00', '2023-04-30T00:00:00', '2023-05-01T00:00:00', '2023-05-02T00:00:00']

//Iterating for evry start time
for (i = 0; i <= arr_time.length - 2; i++) {

    startTime_ = arr_time[i]
    endTime_ = arr_time[i + 1];

    //Filter json data based on a specific day
    console.log(startTime_, endTime_)
    const filtered_data = jsonData.filter(

        entry => (entry.timestamps.startTime >= startTime_) && (entry.timestamps.endTime <= endTime_)
    )

    //console.log('filtered_data: ', filtered_data)

    // Push all the beatsperMinute values into an array
    const arr = [];
    filtered_data.forEach(element => {

        arr.push(element.beatsPerMinute)
    });

    //console.log("arr : ", arr);

    //Logic to Minimum,Maximum, latestDataTimestamp, Median, date
    min = Math.min.apply(null, arr)
    max = Math.max.apply(null, arr)
    latestDataTimestamp = filtered_data[filtered_data.length - 1];
    const date = startTime_.split('T')
    const median = arr => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    // console.log('date:', date[0])
    // console.log('median: ', median(arr));
    // console.log('minimum:', min);
    // console.log('latestDataTimestamp:', latestDataTimestamp.timestamps.endTime)
    // console.log('maximum:', max);

    //Json Formatted key & Value in a spcific node
    constNode = {
        "date": date[0],
        "min": min,
        "max": max,
        "median": median(arr),
        "latestDataTimestamp": latestDataTimestamp.timestamps.endTime
    }
    output.push(constNode)
}

console.log("output > ", output)
fs.writeFileSync('../testData/output.json', JSON.stringify(output))