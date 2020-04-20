import { check, sleep } from 'k6';
import http from "k6/http";

export let options = {
  duration: "1m",
  vus: 50,
  thresholds: {
    http_req_duration: ["p(95)<500"]
  }
};

export default function () {
  let r = http.get(`http://${__ENV.HOSTNAME}/`);
  check(r, {
    'status is 200': r => r.status === 200,
  });
  sleep(3);
}