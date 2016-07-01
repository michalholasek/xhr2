function createRejectObject(status, statusText) {
  return {
    status,
    statusText: status === 0 ? 'Error' : statusText
  };
}

function normalizeOptions(opts) {
  const defaults = {
    method: 'GET',
    timeout: 30000
  };

  function isBodiLess(method) {
    return method === 'GET' || method === 'HEAD';
  }

  const options = Object.assign({}, defaults, opts);
  options.method = options.method.toUpperCase();

  if (isBodiLess(options.method) && options.data) {
    throw new Error('Body (data) is not allowed for GET or HEAD requests.');
  }

  return options;
}

function parseHeaders(headers) {
  return headers.trim().split('\n').reduce((result, pair) => {
    const parts = pair.split(/:(.+)/).map(part => part.trim());
    return Object.assign({}, result, { [parts[0]]: parts[1] });
  }, {});
}

function setup(resolve, reject, opts) {
  opts = normalizeOptions(opts);

  let xhr = new XMLHttpRequest();
  xhr.open(opts.method, opts.url, true, opts.username, opts.password);
  xhr.timeout = opts.timeout;

  if (opts.headers) {
    Object.keys(opts.headers).map((header) => {
      xhr.setRequestHeader(header.name, header.value);
    });
  }

  if (opts.mimeType) {
    xhr.overrideMimeType(opts.mimeType);
  }

  if (opts.responseType) {
    xhr.responseType = opts.responseType;
  }

  xhr.addEventListener('readystatechange', (e) => {
    const status = e.target.status;

    if (e.target.readyState === 4 && (status >= 200 && status <= 204 || status === 304)) {
      resolve({
        headers: parseHeaders(e.target.getAllResponseHeaders()),
        data: e.target.response,
        status,
        statusText: e.target.statusText
      });
    }

    if (e.target.readyState === 4 && status >= 400) {
      reject(createRejectObject(status, e.target.statusText));
    }

  }, false);

  xhr.addEventListener('timeout', (e) => {
    reject(createRejectObject(e.target.status, e.target.statusText));
  }, false);

  xhr.addEventListener('error', (e) => {
    reject(createRejectObject(e.target.status, e.target.statusText));
  }, false);

  xhr.send(opts.data);
}

export default function (opts = {}) {
  return new Promise((resolve, reject) => {
    setup(resolve, reject, opts);
  });
}
