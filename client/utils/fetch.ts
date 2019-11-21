import 'unfetch/polyfill';

export default async function(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input);
  return res;
}
