/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow

import queryString from 'query-string';
import url from 'url';

export default function shortenUrl(urlToShorten: string): Promise<string> {
  let longUrl = urlToShorten;
  if (!longUrl.startsWith('https://profile.firefox.com/')) {
    const parsedUrl = url.parse(longUrl);
    const parsedUrlOnCanonicalHost = Object.assign({}, parsedUrl, {
      protocol: 'https:',
      host: 'profiler.firefox.com',
    });
    longUrl = url.format(parsedUrlOnCanonicalHost);
  }

  const bitlyQueryUrl =
    'https://api-ssl.bitly.com/v3/shorten?' +
    queryString.stringify({
      longUrl,
      domain: 'perfht.ml',
      format: 'json',
      access_token: 'b177b00a130faf3ecda6960e8b59fde73e902422',
    });
  return fetch(bitlyQueryUrl)
    .then(response => response.json())
    .then(json => json.data.url);
}
