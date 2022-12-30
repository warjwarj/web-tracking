const checkAuth = require("../middleware/checkAuth");
const router = require("./auth");

function makesampledata(data){
    for (let i in data){
        data[i].driverScore = Math.floor(Math.random() * 10)
    }
    return data
}

let filler = makesampledata([
    {
        "id": 2000000008219,
        "registration": "SJ68ZSR",
        "dateLastUpdated": "2022-12-01T14:59:31",
        "latitude": 53.56366,
        "longitude": -2.450358,
        "speed": 20,
        "heading": 231,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008348,
        "registration": "ME19GUG",
        "dateLastUpdated": "2022-12-09T02:50:25",
        "latitude": 53.550251,
        "longitude": -2.09008,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000009526,
        "registration": "YD72JKN",
        "dateLastUpdated": "2022-12-21T12:19:18",
        "latitude": 53.589405,
        "longitude": -1.850807,
        "speed": 0,
        "heading": 36,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Daniel Lanfranchi"
    },
    {
        "id": 2000000008274,
        "registration": "MW21UWP",
        "dateLastUpdated": "2022-12-22T10:03:18",
        "latitude": 53.275566,
        "longitude": -2.88428,
        "speed": 0,
        "heading": 153,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Alan Simpson                  "
    },
    {
        "id": 2000000008170,
        "registration": "MA70BYW",
        "dateLastUpdated": "2022-12-22T10:03:19",
        "latitude": 53.77013,
        "longitude": -2.389748,
        "speed": 0,
        "heading": 309,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Erfan Nawaz"
    },
    {
        "id": 2000000008426,
        "registration": "DG70FWB",
        "dateLastUpdated": "2022-12-22T10:04:22",
        "latitude": 53.384083,
        "longitude": -2.604718,
        "speed": 0,
        "heading": 277,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Stephen Evans"
    },
    {
        "id": 2000000008167,
        "registration": "BT71AVW",
        "dateLastUpdated": "2022-12-22T10:06:16",
        "latitude": 53.764645,
        "longitude": -2.69822,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Andrew Hall"
    },
    {
        "id": 2000000008210,
        "registration": "SJ68ZTF",
        "dateLastUpdated": "2022-12-22T10:08:52",
        "latitude": 53.563202,
        "longitude": -2.444582,
        "speed": 0,
        "heading": 3,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008146,
        "registration": "MW70DYY",
        "dateLastUpdated": "2022-12-22T10:09:26",
        "latitude": 53.722023,
        "longitude": -1.868848,
        "speed": 0,
        "heading": 262,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Stacey Stevenson"
    },
    {
        "id": 2000000008833,
        "registration": "BK22XZC",
        "dateLastUpdated": "2022-12-22T10:13:49",
        "latitude": 53.758324,
        "longitude": -1.73833,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008254,
        "registration": "MJ71PPV",
        "dateLastUpdated": "2022-12-22T10:13:52",
        "latitude": 53.543858,
        "longitude": -2.640737,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008787,
        "registration": "BK22XYS",
        "dateLastUpdated": "2022-12-22T10:14:18",
        "latitude": 53.401134,
        "longitude": -3.043553,
        "speed": 0,
        "heading": 174,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Dennis Connor"
    },
    {
        "id": 2000000008284,
        "registration": "DF21BUE",
        "dateLastUpdated": "2022-12-22T10:17:06",
        "latitude": 53.374805,
        "longitude": -2.11252,
        "speed": 0,
        "heading": 310,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008445,
        "registration": "MT19KXL",
        "dateLastUpdated": "2022-12-22T10:18:41",
        "latitude": 53.401627,
        "longitude": -2.522965,
        "speed": 0,
        "heading": 69,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Phillip Parker"
    },
    {
        "id": 2000000010062,
        "registration": "KY68HTC",
        "dateLastUpdated": "2022-12-22T10:18:52",
        "latitude": 54.965061,
        "longitude": -1.751717,
        "speed": 0,
        "heading": 260,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008127,
        "registration": "MA71BRZ",
        "dateLastUpdated": "2022-12-22T10:19:19",
        "latitude": 53.599125,
        "longitude": -2.295108,
        "speed": 0,
        "heading": 191,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Elizabeth Ashworth"
    },
    {
        "id": 2000000008171,
        "registration": "DF21BNB",
        "dateLastUpdated": "2022-12-22T10:20:39",
        "latitude": 53.770088,
        "longitude": -2.389778,
        "speed": 0,
        "heading": 252,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Declan Shulman"
    },
    {
        "id": 2000000008184,
        "registration": "GT21KAG",
        "dateLastUpdated": "2022-12-22T10:22:12",
        "latitude": 53.680241,
        "longitude": -2.660683,
        "speed": 0,
        "heading": 277,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Karl Green"
    },
    {
        "id": 2000000008276,
        "registration": "MT19KXJ",
        "dateLastUpdated": "2022-12-22T10:22:32",
        "latitude": 53.401134,
        "longitude": -3.043473,
        "speed": 0,
        "heading": 120,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Nicholas Mcintyre"
    },
    {
        "id": 2000000008420,
        "registration": "ML72EXN",
        "dateLastUpdated": "2022-12-22T10:27:26",
        "latitude": 53.401508,
        "longitude": -2.52345,
        "speed": 0,
        "heading": 344,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "David Forster"
    },
    {
        "id": 2000000008285,
        "registration": "MA70WFU",
        "dateLastUpdated": "2022-12-22T10:27:55",
        "latitude": 53.876801,
        "longitude": -1.90486,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Graham Hamblin"
    },
    {
        "id": 2000000008458,
        "registration": "MW21UWM",
        "dateLastUpdated": "2022-12-22T10:29:03",
        "latitude": 53.395702,
        "longitude": -2.602608,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000010086,
        "registration": "BK72FTZ",
        "dateLastUpdated": "2022-12-22T10:30:22",
        "latitude": 53.0429,
        "longitude": -2.988443,
        "speed": 0,
        "heading": 56,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Emily Brassington"
    },
    {
        "id": 2000000008151,
        "registration": "SJ68ZSO",
        "dateLastUpdated": "2022-12-22T10:32:04",
        "latitude": 53.72332,
        "longitude": -2.659475,
        "speed": 0,
        "heading": 211,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Angela Barber"
    },
    {
        "id": 2000000008264,
        "registration": "MT19KXO",
        "dateLastUpdated": "2022-12-22T10:32:11",
        "latitude": 53.579624,
        "longitude": -2.417533,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000010071,
        "registration": "YN68OMF",
        "dateLastUpdated": "2022-12-22T10:32:33",
        "latitude": 54.130165,
        "longitude": -1.50889,
        "speed": 0,
        "heading": 148,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008344,
        "registration": "MC19JCZ",
        "dateLastUpdated": "2022-12-22T10:33:47",
        "latitude": 53.550014,
        "longitude": -2.090073,
        "speed": 0,
        "heading": 306,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Corey Schofield"
    },
    {
        "id": 2000000008464,
        "registration": "MM70AWX",
        "dateLastUpdated": "2022-12-22T10:34:06",
        "latitude": 53.446117,
        "longitude": -2.722658,
        "speed": 0,
        "heading": 244,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Paul Roberts"
    },
    {
        "id": 2000000008180,
        "registration": "OY67YWZ",
        "dateLastUpdated": "2022-12-22T10:34:18",
        "latitude": 53.087704,
        "longitude": -2.241028,
        "speed": 0,
        "heading": 231,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Nicola Beresford"
    },
    {
        "id": 2000000008215,
        "registration": "MA71LXD",
        "dateLastUpdated": "2022-12-22T10:34:44",
        "latitude": 53.022942,
        "longitude": -2.158245,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008455,
        "registration": "MM71DHE",
        "dateLastUpdated": "2022-12-22T10:35:06",
        "latitude": 53.534256,
        "longitude": -2.524132,
        "speed": 0,
        "heading": 351,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Daniel O'Hara"
    },
    {
        "id": 2000000008438,
        "registration": "MD21XYW",
        "dateLastUpdated": "2022-12-22T10:35:44",
        "latitude": 53.401791,
        "longitude": -2.523485,
        "speed": 0,
        "heading": 18,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008157,
        "registration": "MT19ZGC",
        "dateLastUpdated": "2022-12-22T10:36:29",
        "latitude": 53.488113,
        "longitude": -2.634315,
        "speed": 0,
        "heading": 203,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Alan Beesley                  "
    },
    {
        "id": 2000000008435,
        "registration": "BT71CXP",
        "dateLastUpdated": "2022-12-22T10:36:46",
        "latitude": 53.563202,
        "longitude": -2.444937,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Richard Fox"
    },
    {
        "id": 2000000008237,
        "registration": "SB69SWX",
        "dateLastUpdated": "2022-12-22T10:39:54",
        "latitude": 53.765633,
        "longitude": -2.716395,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008848,
        "registration": "MK20ESO",
        "dateLastUpdated": "2022-12-22T10:44:07",
        "latitude": 53.566677,
        "longitude": -2.438892,
        "speed": 0,
        "heading": 177,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Zubair Bhaiji"
    },
    {
        "id": 2000000008277,
        "registration": "MC19JCU",
        "dateLastUpdated": "2022-12-22T10:44:42",
        "latitude": 53.649643,
        "longitude": -2.987028,
        "speed": 0,
        "heading": 106,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Stephen Walsh"
    },
    {
        "id": 2000000008471,
        "registration": "MT19KXR",
        "dateLastUpdated": "2022-12-22T10:45:29",
        "latitude": 53.401848,
        "longitude": -2.523535,
        "speed": 0,
        "heading": 50,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Nicholas Fletcher"
    },
    {
        "id": 2000000008145,
        "registration": "BD71JDX",
        "dateLastUpdated": "2022-12-22T10:45:38",
        "latitude": 53.758232,
        "longitude": -1.738473,
        "speed": 0,
        "heading": 168,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Malcom Gomersall"
    },
    {
        "id": 2000000008220,
        "registration": "MM70AXR",
        "dateLastUpdated": "2022-12-22T10:45:39",
        "latitude": 53.179546,
        "longitude": -2.92275,
        "speed": 0,
        "heading": 22,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Philip Knight"
    },
    {
        "id": 2000000008256,
        "registration": "MM70AWZ",
        "dateLastUpdated": "2022-12-22T10:46:04",
        "latitude": 53.543831,
        "longitude": -2.640783,
        "speed": 0,
        "heading": 59,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Daniel Mather "
    },
    {
        "id": 2000000008293,
        "registration": "DF69XJY",
        "dateLastUpdated": "2022-12-22T10:47:10",
        "latitude": 52.973488,
        "longitude": -2.088117,
        "speed": 55,
        "heading": 128,
        "ignitionOn": true,
        "vehicleStatus": 3,
        "driverName": "John Fyles"
    },
    {
        "id": 2000000008199,
        "registration": "MW21UWX",
        "dateLastUpdated": "2022-12-22T10:47:42",
        "latitude": 53.764614,
        "longitude": -2.698307,
        "speed": 0,
        "heading": 303,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "David Halliwell"
    },
    {
        "id": 2000000008289,
        "registration": "SB69UJG",
        "dateLastUpdated": "2022-12-22T10:47:51",
        "latitude": 53.096714,
        "longitude": -2.483343,
        "speed": 0,
        "heading": 306,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008441,
        "registration": "MJ20VWA",
        "dateLastUpdated": "2022-12-22T10:48:01",
        "latitude": 53.401859,
        "longitude": -2.523465,
        "speed": 0,
        "heading": 22,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Craig Harris"
    },
    {
        "id": 2000000008329,
        "registration": "MH19YGM",
        "dateLastUpdated": "2022-12-22T10:49:41",
        "latitude": 53.470982,
        "longitude": -2.201792,
        "speed": 0,
        "heading": 252,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Mark Brady"
    },
    {
        "id": 2000000008335,
        "registration": "MT18UOL",
        "dateLastUpdated": "2022-12-22T10:49:41",
        "latitude": 53.471035,
        "longitude": -2.201718,
        "speed": 0,
        "heading": 262,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Marc Wallace"
    },
    {
        "id": 2000000009780,
        "registration": "MJ71RYR",
        "dateLastUpdated": "2022-12-22T10:50:44",
        "latitude": 53.471066,
        "longitude": -2.201868,
        "speed": 0,
        "heading": 356,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Mark Bridge"
    },
    {
        "id": 2000000008437,
        "registration": "MW70DZR",
        "dateLastUpdated": "2022-12-22T10:51:32",
        "latitude": 53.401928,
        "longitude": -2.523497,
        "speed": 0,
        "heading": 74,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Colin Moyle"
    },
    {
        "id": 2000000008457,
        "registration": "MM68YTW",
        "dateLastUpdated": "2022-12-22T10:52:09",
        "latitude": 53.419388,
        "longitude": -2.554295,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Mike Hodgers"
    },
    {
        "id": 2000000008174,
        "registration": "SD68GFO",
        "dateLastUpdated": "2022-12-22T10:52:18",
        "latitude": 53.770138,
        "longitude": -2.389703,
        "speed": 0,
        "heading": 354,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Stephen Pollard"
    },
    {
        "id": 2000000008225,
        "registration": "BD71JEO",
        "dateLastUpdated": "2022-12-22T10:52:53",
        "latitude": 53.456467,
        "longitude": -2.980047,
        "speed": 0,
        "heading": 354,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Julie Ann Harland"
    },
    {
        "id": 2000000008467,
        "registration": "MW21UWA",
        "dateLastUpdated": "2022-12-22T10:53:02",
        "latitude": 53.446072,
        "longitude": -2.722567,
        "speed": 0,
        "heading": 163,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Alan Winstanley"
    },
    {
        "id": 2000000009725,
        "registration": "MJ72XKF",
        "dateLastUpdated": "2022-12-22T10:53:15",
        "latitude": 53.401768,
        "longitude": -2.523283,
        "speed": 0,
        "heading": 51,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "John Jones"
    },
    {
        "id": 2000000008340,
        "registration": "DG20XLR",
        "dateLastUpdated": "2022-12-22T10:53:42",
        "latitude": 53.549938,
        "longitude": -2.08978,
        "speed": 0,
        "heading": 231,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000009136,
        "registration": "BN22YMJ",
        "dateLastUpdated": "2022-12-22T10:53:49",
        "latitude": 53.17955,
        "longitude": -2.922587,
        "speed": 0,
        "heading": 141,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Martin Hodgson"
    },
    {
        "id": 2000000008270,
        "registration": "MH19YGN",
        "dateLastUpdated": "2022-12-22T10:54:13",
        "latitude": 53.566311,
        "longitude": -2.43175,
        "speed": 8,
        "heading": 172,
        "ignitionOn": true,
        "vehicleStatus": 3,
        "driverName": "David Whittle"
    },
    {
        "id": 2000000008258,
        "registration": "MA70BZD",
        "dateLastUpdated": "2022-12-22T10:54:25",
        "latitude": 53.543789,
        "longitude": -2.640678,
        "speed": 0,
        "heading": 202,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Kevin Tye "
    },
    {
        "id": 2000000008136,
        "registration": "MM70AXO",
        "dateLastUpdated": "2022-12-22T10:54:38",
        "latitude": 53.764645,
        "longitude": -2.698357,
        "speed": 0,
        "heading": 94,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Craig Howard"
    },
    {
        "id": 2000000008314,
        "registration": "SJ68ZSY",
        "dateLastUpdated": "2022-12-22T10:54:38",
        "latitude": 53.5518,
        "longitude": -2.401083,
        "speed": 0,
        "heading": 141,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Martin Coyne"
    },
    {
        "id": 2000000008242,
        "registration": "MD21XZE",
        "dateLastUpdated": "2022-12-22T10:54:48",
        "latitude": 53.107578,
        "longitude": -2.015323,
        "speed": 0,
        "heading": 275,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Craig Oldfiled"
    },
    {
        "id": 2000000008453,
        "registration": "MD21NUH",
        "dateLastUpdated": "2022-12-22T10:55:19",
        "latitude": 53.549759,
        "longitude": -2.090313,
        "speed": 0,
        "heading": 286,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Stephen Dublin"
    },
    {
        "id": 2000000009963,
        "registration": "HJ69BXR",
        "dateLastUpdated": "2022-12-22T10:55:26",
        "latitude": 54.393742,
        "longitude": -1.658327,
        "speed": 0,
        "heading": 121,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000009300,
        "registration": "BK72FUE",
        "dateLastUpdated": "2022-12-22T10:55:29",
        "latitude": 53.456387,
        "longitude": -2.979873,
        "speed": 0,
        "heading": 86,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Nicole Flanagan"
    },
    {
        "id": 2000000008137,
        "registration": "MW70DZT",
        "dateLastUpdated": "2022-12-22T10:56:02",
        "latitude": 53.722164,
        "longitude": -1.86895,
        "speed": 0,
        "heading": 290,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Jodi Helliwell"
    },
    {
        "id": 2000000008234,
        "registration": "DF21BUH",
        "dateLastUpdated": "2022-12-22T10:56:04",
        "latitude": 53.043114,
        "longitude": -2.988435,
        "speed": 0,
        "heading": 13,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Craig Jones"
    },
    {
        "id": 2000000008178,
        "registration": "MA71CFE",
        "dateLastUpdated": "2022-12-22T10:57:10",
        "latitude": 53.082195,
        "longitude": -2.261597,
        "speed": 5,
        "heading": 141,
        "ignitionOn": true,
        "vehicleStatus": 3,
        "driverName": "Colin Bolton"
    },
    {
        "id": 2000000008462,
        "registration": "BK22XYW",
        "dateLastUpdated": "2022-12-22T10:57:25",
        "latitude": 53.346199,
        "longitude": -2.900027,
        "speed": 0,
        "heading": 342,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Rachel McKnight"
    },
    {
        "id": 2000000008212,
        "registration": "MM18NDU",
        "dateLastUpdated": "2022-12-22T10:57:35",
        "latitude": 53.566235,
        "longitude": -2.408738,
        "speed": 0,
        "heading": 41,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008265,
        "registration": "BK22XZD",
        "dateLastUpdated": "2022-12-22T10:57:36",
        "latitude": 53.007915,
        "longitude": -2.165687,
        "speed": 0,
        "heading": 57,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Mark Beckett"
    },
    {
        "id": 2000000008433,
        "registration": "DF21BUP",
        "dateLastUpdated": "2022-12-22T10:57:57",
        "latitude": 53.550068,
        "longitude": -2.089855,
        "speed": 0,
        "heading": 210,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    },
    {
        "id": 2000000008139,
        "registration": "MJ71PPF",
        "dateLastUpdated": "2022-12-22T10:58:06",
        "latitude": 53.580864,
        "longitude": -1.781708,
        "speed": 0,
        "heading": 190,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Lynn Morgan"
    },
    {
        "id": 2000000008446,
        "registration": "DG20XKV",
        "dateLastUpdated": "2022-12-22T10:58:12",
        "latitude": 53.722054,
        "longitude": -1.868953,
        "speed": 0,
        "heading": 316,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "David Singh"
    },
    {
        "id": 2000000008461,
        "registration": "MM70AXD",
        "dateLastUpdated": "2022-12-22T10:58:43",
        "latitude": 53.39571,
        "longitude": -2.602648,
        "speed": 0,
        "heading": 198,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Joanne Davies"
    },
    {
        "id": 2000000008346,
        "registration": "SJ68ZSK",
        "dateLastUpdated": "2022-12-22T10:58:57",
        "latitude": 53.399963,
        "longitude": -2.577783,
        "speed": 0,
        "heading": 111,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Julie Leonard"
    },
    {
        "id": 2000000008216,
        "registration": "MW21UWG",
        "dateLastUpdated": "2022-12-22T10:58:59",
        "latitude": 52.910587,
        "longitude": -2.155283,
        "speed": 0,
        "heading": 144,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Calvin Cornwell"
    },
    {
        "id": 2000000008255,
        "registration": "MM70AXP",
        "dateLastUpdated": "2022-12-22T10:59:13",
        "latitude": 53.540821,
        "longitude": -2.632403,
        "speed": 28,
        "heading": 294,
        "ignitionOn": true,
        "vehicleStatus": 3,
        "driverName": "Peter Morgan"
    },
    {
        "id": 2000000008159,
        "registration": "DF21BTV",
        "dateLastUpdated": "2022-12-22T10:59:17",
        "latitude": 53.723301,
        "longitude": -2.659595,
        "speed": 0,
        "heading": 140,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Stephen Robinson"
    },
    {
        "id": 2000000008250,
        "registration": "SD68GGF",
        "dateLastUpdated": "2022-12-22T10:59:18",
        "latitude": 53.516212,
        "longitude": -2.711327,
        "speed": 0,
        "heading": 291,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Vincent Weaver "
    },
    {
        "id": 2000000008246,
        "registration": "MW70DZJ",
        "dateLastUpdated": "2022-12-22T10:59:26",
        "latitude": 53.007835,
        "longitude": -2.165792,
        "speed": 0,
        "heading": 125,
        "ignitionOn": true,
        "vehicleStatus": 1,
        "driverName": null
    },
    {
        "id": 2000000008312,
        "registration": "SD68GFZ",
        "dateLastUpdated": "2022-12-22T10:59:27",
        "latitude": 53.552017,
        "longitude": -2.401122,
        "speed": 0,
        "heading": 85,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": "Heather White"
    },
    {
        "id": 2000000008235,
        "registration": "SJ68ZSD",
        "dateLastUpdated": "2022-12-22T10:59:34",
        "latitude": 53.179573,
        "longitude": -2.922547,
        "speed": 0,
        "heading": 0,
        "ignitionOn": false,
        "vehicleStatus": 10,
        "driverName": null
    }
])



router.get('/', checkAuth, (req, res) => {
    res.render('stats.ejs', {
        sampledata: filler
    })
})

router.get('/data', checkAuth, (req, res) => {
    res.send(filler)
})

module.exports = router