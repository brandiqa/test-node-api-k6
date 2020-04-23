import { check, sleep } from 'k6';
import http from "k6/http";

// export let options = {
//   duration: "10m",
//   vus: 300,
//   thresholds: {
//     http_req_duration: ["p(95)<500"]
//   }
// };

export let options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '1m', target: 150 },
    { duration: '1m', target: 300 },
    { duration: '1m', target: 500 },
    { duration: '1m', target: 800 },
    { duration: '1m', target: 1000 },
    { duration: '30s', target: 5 },
  ],
};

export default function () {
  let r = http.get(`http://${__ENV.HOSTNAME}/`);
  check(r, {
    'status is 200': r => r.status === 200,
  });
  sleep(2);
}