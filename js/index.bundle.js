/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../script/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../script/index.js":
/*!**************************!*\
  !*** ../script/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

tinymce.init({
  selector: 'textarea#textarea_01',
  contextmenu: false,
  forced_root_block: false,
  menubar: false,
  height: 500,
  // contextmenu_never_use_native: true,
  content_style: "\n    body { font-family:Helvetica,Arial,sans-serif; font-size:14px }\n    .left { text-align: left; }\n    .bold { font-weight: bold; } \n    .tablerow1 { background-color: #D3D3D3; }\n    .bgBlue { padding: 8px; background-color: #f5e9f7 }\n    .bgRed { padding: 8px; background-color: #fee5e5 }\n    ",
  formats: {
    bold: {
      inline: 'span',
      classes: 'bold'
    },
    h1: {
      block: 'h1',
      classes: 'h1'
    },
    h2: {
      block: 'h2',
      classes: 'h2'
    },
    para: {
      block: 'p',
      classes: 'para'
    },
    bgBlue: {
      selector: 'p',
      classes: 'bgBlue'
    },
    bgRed: {
      selector: 'p',
      classes: 'bgRed'
    }
  },
  style_formats: [{
    title: '黒枠',
    selector: 'p',
    styles: {
      'padding': '8px',
      'border': '1px solid #333'
    },
    classes: 'bdrBlack'
  }],
  toolbar: 'undo redo | para bold forecolor | myHeading textBg',
  color_map: ['333333', 'Black', 'FF0000', 'Red', '0000FF', 'Blue'],
  custom_colors: false,

  /**
   * 
   * @param {*} editor 
   * 
   */
  setup: function setup(editor) {
    editor.ui.registry.addButton('para', {
      icon: 'format',
      tooltip: '通常の文字',
      onAction: function onAction(_) {
        editor.execCommand('mceToggleFormat', false, 'p');
      },
      onSetup: function onSetup(api) {
        editor.formatter.formatChanged('p', function (state, elem) {// console.log(e)
          // api.setActive(state);
        });
      }
    });
    /**
     * 見出し
     */

    editor.ui.registry.addMenuButton('myHeading', {
      text: 'タイトル',
      fetch: function fetch(callback) {
        var items = [{
          type: 'menuitem',
          text: '大見出し',
          onAction: function onAction(_) {
            editor.execCommand('mceToggleFormat', false, 'h1');
          },
          onSetup: function onSetup(api) {
            editor.formatter.formatChanged('h1', function (state) {// api.setActive(state);
            });
          }
        }, {
          type: 'menuitem',
          text: '中見出し',
          onAction: function onAction(_) {
            editor.execCommand('mceToggleFormat', false, 'h2');
          },
          onSetup: function onSetup(api) {
            editor.formatter.formatChanged('h2', function (state) {// api.setActive(state);
            });
          }
        }, {
          type: 'menuitem',
          text: '小見出し',
          onAction: function onAction(_) {
            editor.execCommand('mceToggleFormat', false, 'h3');
          },
          onSetup: function onSetup(api) {
            editor.formatter.formatChanged('h3', function (state) {// api.setActive(state);
            });
          }
        }];
        callback(items);
      }
    });
    /**
     * 座布団
     */

    editor.ui.registry.addMenuButton('textBg', {
      text: '座布団',
      fetch: function fetch(callback) {
        var items = [{
          type: 'menuitem',
          text: '青座布団',
          onAction: function onAction(_) {
            editor.formatter.remove('bgRed');
            editor.formatter.toggle('bgBlue');
          },
          onSetup: function onSetup(api) {
            return function () {};
          }
        }, {
          type: 'menuitem',
          text: '赤座布団',
          onAction: function onAction(_) {
            editor.formatter.remove('bgBlue');
            editor.formatter.toggle('bgRed');
          },
          onSetup: function onSetup(api) {
            return function () {};
          }
        }];
        callback(items);
      } // fetch

    }); // https://www.tiny.cloud/docs/ui-components/contexttoolbar/

    editor.ui.registry.addContextToolbar('textselection', {
      predicate: function predicate(node) {
        return !editor.selection.isCollapsed();
      },
      items: 'bold',
      position: 'selection',
      scope: 'node'
    });
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3NjcmlwdC9pbmRleC5qcyJdLCJuYW1lcyI6WyJ0aW55bWNlIiwiaW5pdCIsInNlbGVjdG9yIiwiY29udGV4dG1lbnUiLCJmb3JjZWRfcm9vdF9ibG9jayIsIm1lbnViYXIiLCJoZWlnaHQiLCJjb250ZW50X3N0eWxlIiwiZm9ybWF0cyIsImJvbGQiLCJpbmxpbmUiLCJjbGFzc2VzIiwiaDEiLCJibG9jayIsImgyIiwicGFyYSIsImJnQmx1ZSIsImJnUmVkIiwic3R5bGVfZm9ybWF0cyIsInRpdGxlIiwic3R5bGVzIiwidG9vbGJhciIsImNvbG9yX21hcCIsImN1c3RvbV9jb2xvcnMiLCJzZXR1cCIsImVkaXRvciIsInVpIiwicmVnaXN0cnkiLCJhZGRCdXR0b24iLCJpY29uIiwidG9vbHRpcCIsIm9uQWN0aW9uIiwiXyIsImV4ZWNDb21tYW5kIiwib25TZXR1cCIsImFwaSIsImZvcm1hdHRlciIsImZvcm1hdENoYW5nZWQiLCJzdGF0ZSIsImVsZW0iLCJhZGRNZW51QnV0dG9uIiwidGV4dCIsImZldGNoIiwiY2FsbGJhY2siLCJpdGVtcyIsInR5cGUiLCJyZW1vdmUiLCJ0b2dnbGUiLCJhZGRDb250ZXh0VG9vbGJhciIsInByZWRpY2F0ZSIsIm5vZGUiLCJzZWxlY3Rpb24iLCJpc0NvbGxhcHNlZCIsInBvc2l0aW9uIiwic2NvcGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNB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QXREO0FBUUQ7QUFuSlUsQ0FBYixFIiwiZmlsZSI6ImpzL2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4uL3NjcmlwdC9pbmRleC5qc1wiKTtcbiIsInRpbnltY2UuaW5pdCh7XG4gIHNlbGVjdG9yOiAndGV4dGFyZWEjdGV4dGFyZWFfMDEnLFxuICBjb250ZXh0bWVudTogZmFsc2UsXG4gIGZvcmNlZF9yb290X2Jsb2NrOiBmYWxzZSxcbiAgbWVudWJhcjogZmFsc2UsXG4gIGhlaWdodDogNTAwLFxuICAvLyBjb250ZXh0bWVudV9uZXZlcl91c2VfbmF0aXZlOiB0cnVlLFxuICBjb250ZW50X3N0eWxlOiBgXG4gICAgYm9keSB7IGZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmOyBmb250LXNpemU6MTRweCB9XG4gICAgLmxlZnQgeyB0ZXh0LWFsaWduOiBsZWZ0OyB9XG4gICAgLmJvbGQgeyBmb250LXdlaWdodDogYm9sZDsgfSBcbiAgICAudGFibGVyb3cxIHsgYmFja2dyb3VuZC1jb2xvcjogI0QzRDNEMzsgfVxuICAgIC5iZ0JsdWUgeyBwYWRkaW5nOiA4cHg7IGJhY2tncm91bmQtY29sb3I6ICNmNWU5ZjcgfVxuICAgIC5iZ1JlZCB7IHBhZGRpbmc6IDhweDsgYmFja2dyb3VuZC1jb2xvcjogI2ZlZTVlNSB9XG4gICAgYCxcbiAgZm9ybWF0czoge1xuICAgIGJvbGQ6IHsgaW5saW5lOiAnc3BhbicsIGNsYXNzZXM6ICdib2xkJyB9LFxuICAgIGgxOiB7IGJsb2NrOiAnaDEnLCBjbGFzc2VzOiAnaDEnfSxcbiAgICBoMjogeyBibG9jazogJ2gyJywgY2xhc3NlczogJ2gyJ30sXG4gICAgcGFyYTogeyBibG9jazogJ3AnLCBjbGFzc2VzOiAncGFyYSd9LFxuICAgIGJnQmx1ZSA6IHsgc2VsZWN0b3I6ICdwJywgY2xhc3NlczogJ2JnQmx1ZSd9LFxuICAgIGJnUmVkIDogeyBzZWxlY3RvcjogJ3AnLCBjbGFzc2VzOiAnYmdSZWQnfSxcbiAgfSxcbiAgc3R5bGVfZm9ybWF0czogW1xuICAgIHsgdGl0bGU6ICfpu5LmnqAnLCBzZWxlY3RvcjogJ3AnLCBzdHlsZXM6IHsgJ3BhZGRpbmcnOiAnOHB4JywgJ2JvcmRlcic6ICcxcHggc29saWQgIzMzMyd9LCBjbGFzc2VzOiAnYmRyQmxhY2snfVxuICBdLFxuICB0b29sYmFyOiAndW5kbyByZWRvIHwgcGFyYSBib2xkIGZvcmVjb2xvciB8IG15SGVhZGluZyB0ZXh0QmcnLFxuICBjb2xvcl9tYXA6IFtcbiAgICAnMzMzMzMzJywgJ0JsYWNrJyxcbiAgICAnRkYwMDAwJywgJ1JlZCcsXG4gICAgJzAwMDBGRicsICdCbHVlJyxcbiAgXSxcbiAgY3VzdG9tX2NvbG9yczogZmFsc2UsXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHsqfSBlZGl0b3IgXG4gICAqIFxuICAgKi9cbiAgc2V0dXA6IGZ1bmN0aW9uIChlZGl0b3IpIHtcblxuICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3BhcmEnLCB7XG4gICAgICBpY29uOiAnZm9ybWF0JyxcbiAgICAgIHRvb2x0aXA6ICfpgJrluLjjga7mloflrZcnLFxuICAgICAgb25BY3Rpb246IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlVG9nZ2xlRm9ybWF0JywgZmFsc2UsICdwJyk7XG4gICAgICB9LFxuICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLmZvcm1hdENoYW5nZWQoJ3AnLCBmdW5jdGlvbiAoc3RhdGUsZWxlbSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgLy8gYXBpLnNldEFjdGl2ZShzdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICog6KaL5Ye644GXXG4gICAgICovXG4gICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVCdXR0b24oJ215SGVhZGluZycsIHtcbiAgICAgIHRleHQ6ICfjgr/jgqTjg4jjg6snLFxuICAgICAgZmV0Y2g6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgaXRlbXMgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbnVpdGVtJyxcbiAgICAgICAgICAgIHRleHQ6ICflpKfopovlh7rjgZcnLFxuICAgICAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlVG9nZ2xlRm9ybWF0JywgZmFsc2UsICdoMScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU2V0dXA6IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICAgICAgZWRpdG9yLmZvcm1hdHRlci5mb3JtYXRDaGFuZ2VkKCdoMScsIGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIGFwaS5zZXRBY3RpdmUoc3RhdGUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW51aXRlbScsXG4gICAgICAgICAgICB0ZXh0OiAn5Lit6KaL5Ye644GXJyxcbiAgICAgICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoXykge1xuICAgICAgICAgICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVRvZ2dsZUZvcm1hdCcsIGZhbHNlLCAnaDInKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblNldHVwOiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgICAgIGVkaXRvci5mb3JtYXR0ZXIuZm9ybWF0Q2hhbmdlZCgnaDInLCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvLyBhcGkuc2V0QWN0aXZlKHN0YXRlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVudWl0ZW0nLFxuICAgICAgICAgICAgdGV4dDogJ+Wwj+imi+WHuuOBlycsXG4gICAgICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VUb2dnbGVGb3JtYXQnLCBmYWxzZSwgJ2gzJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLmZvcm1hdENoYW5nZWQoJ2gzJywgZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBpLnNldEFjdGl2ZShzdGF0ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNhbGxiYWNrKGl0ZW1zKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIOW6p+W4g+Wbo1xuICAgICAqL1xuICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51QnV0dG9uKCd0ZXh0QmcnLCB7XG4gICAgICB0ZXh0OiAn5bqn5biD5ZujJyxcbiAgICAgIGZldGNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW51aXRlbScsXG4gICAgICAgICAgICB0ZXh0OiAn6Z2S5bqn5biD5ZujJyxcbiAgICAgICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoXykge1xuICAgICAgICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLnJlbW92ZSgnYmdSZWQnKTtcbiAgICAgICAgICAgICAgZWRpdG9yLmZvcm1hdHRlci50b2dnbGUoJ2JnQmx1ZScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU2V0dXA6IGZ1bmN0aW9uKGFwaSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW51aXRlbScsXG4gICAgICAgICAgICB0ZXh0OiAn6LWk5bqn5biD5ZujJyxcbiAgICAgICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoXykge1xuICAgICAgICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLnJlbW92ZSgnYmdCbHVlJyk7XG4gICAgICAgICAgICAgIGVkaXRvci5mb3JtYXR0ZXIudG9nZ2xlKCdiZ1JlZCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU2V0dXA6IGZ1bmN0aW9uKGFwaSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIGNhbGxiYWNrKGl0ZW1zKTtcbiAgICAgIH0sIC8vIGZldGNoXG4gICAgfSk7XG5cblxuICAgIFxuICAgIC8vIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvZG9jcy91aS1jb21wb25lbnRzL2NvbnRleHR0b29sYmFyL1xuICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRDb250ZXh0VG9vbGJhcigndGV4dHNlbGVjdGlvbicsIHtcbiAgICAgIHByZWRpY2F0ZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuICFlZGl0b3Iuc2VsZWN0aW9uLmlzQ29sbGFwc2VkKCk7XG4gICAgICB9LFxuICAgICAgaXRlbXM6ICdib2xkJyxcbiAgICAgIHBvc2l0aW9uOiAnc2VsZWN0aW9uJyxcbiAgICAgIHNjb3BlOiAnbm9kZSdcbiAgICB9KTtcbiAgfSxcblxuXG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==