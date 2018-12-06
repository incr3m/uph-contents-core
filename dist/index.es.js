import React from 'react';
import data from 'emoji-mart/data/emojione.json';
import { NimbleEmojiIndex, Emoji } from 'emoji-mart';
import 'lodash/get';

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var emojiIndex = new NimbleEmojiIndex(data);

var getCustomEmojis = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', [{
              name: 'Octocat',
              short_names: ['octocat'],
              text: '',
              emoticons: [],
              keywords: ['github'],
              imageUrl: 'https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7'
            }, {
              name: 'Parrot',
              short_names: ['parrot'],
              text: '',
              emoticons: [],
              keywords: ['parrot'],
              imageUrl: 'https://cultofthepartyparrot.com/parrots/hd/parrot.gif'
            }]);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCustomEmojis() {
    return _ref.apply(this, arguments);
  };
}();

var getCustomEmoji = function () {
  var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
    var emojis;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getCustomEmojis();

          case 2:
            emojis = _context2.sent;
            return _context2.abrupt('return', emojis.find(function (emoji) {
              return emoji.short_names.includes(key);
            }));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getCustomEmoji(_x) {
    return _ref2.apply(this, arguments);
  };
}();

function searchEmoji(code) {
  console.log('emojiIndex', emojiIndex); //TRACE
  return emojiIndex.search(code);
}

var index = /*#__PURE__*/Object.freeze({
  getCustomEmojis: getCustomEmojis,
  getCustomEmoji: getCustomEmoji,
  searchEmoji: searchEmoji
});

var trimRegex = new RegExp('^[:]+|[:]+$', 'g');
var LOADING_EMOJI = {
  name: 'Loader',
  short_names: ['gif_loader'],
  text: '',
  emoticons: [],
  keywords: [],
  imageUrl: 'https://storage.sustainatrade.com/file/eco-trade-assets/0a938baac1613a29309e162e229bf727a6e933c6.gif'
};
function CustomEmoji(_ref) {
  var _this = this;

  var emoji = _ref.emoji,
      rest = objectWithoutProperties(_ref, ['emoji']);

  var _React$useState = React.useState(null),
      _React$useState2 = slicedToArray(_React$useState, 2),
      emojiData = _React$useState2[0],
      setEmojiData = _React$useState2[1];

  React.useEffect(function () {
    asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var emojiCode, eData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              emojiCode = emoji.replace(trimRegex, '');
              _context.next = 3;
              return getCustomEmoji(emojiCode);

            case 3:
              eData = _context.sent;

              console.log('eData', eData); //TRACE
              setEmojiData(eData);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }, [emoji]);
  return React.createElement(Emoji, _extends({}, rest, { emoji: emojiData || LOADING_EMOJI }));
}

function EmojiWithCustomFallback(props) {
  return React.createElement(Emoji, _extends({}, props, {
    fallback: function fallback() {
      //Try custom
      return React.createElement(CustomEmoji, props);
    }
  }));
}

function Iconify(_ref3) {
  var type = _ref3.type,
      emojiStyle = _ref3.emojiStyle,
      rest = objectWithoutProperties(_ref3, ['type', 'emojiStyle']);

  console.log('type', type); //TRACE
  // const data = searchEmoji(emojiCode);
  // console.log('emoji data', data); //TRACE
  return React.createElement(
    'span',
    rest,
    React.createElement(EmojiWithCustomFallback, { emoji: type, set: 'emojione', size: 16, style: emojiStyle })
  );
}

export { Iconify as Icon, index as EmojiProvider };
//# sourceMappingURL=index.es.js.map
