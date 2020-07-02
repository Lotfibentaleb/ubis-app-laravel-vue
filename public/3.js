(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FilePicker.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FilePicker.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'FilePicker',
  props: {
    label: {
      type: String,
      "default": null
    },
    message: {
      type: String,
      "default": null
    },
    currentFile: {
      "default": null
    }
  },
  data: function data() {
    return {
      errors: {},
      file: null,
      uploadPercent: 0,
      isUploadSuccess: false
    };
  },
  computed: {
    fieldFileMessage: function fieldFileMessage() {
      if (this.errors.file) {
        return this.errors.file[0];
      }

      if (this.isUploadSuccess) {
        return 'File uploaded. Submit to store';
      }

      if (this.uploadPercent) {
        return "Uploading ".concat(this.uploadPercent, "%");
      }

      return this.message;
    },
    uploadButtonText: function uploadButtonText() {
      return this.fileName ? null : 'Pick a file';
    },
    uploadButtonIcon: function uploadButtonIcon() {
      return this.fileName ? 'cloud-sync' : 'cloud-upload';
    },
    fieldFileType: function fieldFileType() {
      return this.errors.file ? 'is-danger' : null;
    },
    fileName: function fileName() {
      if (this.file) {
        return this.file.name;
      }

      if (this.currentFile) {
        return this.currentFile;
      }

      return null;
    }
  },
  methods: {
    upload: function upload(file) {
      var _this = this;

      this.errors = {};
      var formData = new FormData();
      formData.append('file', this.file);
      this.isUploadSuccess = false;
      axios.post('/files/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: this.progressEvent
      }).then(function (r) {
        _this.isUploadSuccess = true; // Display success data & then drop it after a little while
        // setTimeout(() => {
        //   this.file = null
        //   this.isUploadSuccess = false
        //   this.uploadPercent = 0
        // }, 1500)

        _this.$emit('file-updated', r.data.data);

        _this.$emit('file-id-updated', r.data.data.id);
      })["catch"](function (err) {
        _this.file = null;
        _this.uploadPercent = 0;

        if (err.response.data.errors) {
          _this.errors = err.response.data.errors;
        } else {
          _this.errors = {
            _all: ['Upload error']
          };
        }

        lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(_this.errors, function (err) {
          _this.$buefy.toast.open({
            message: err[0],
            type: 'is-danger',
            queue: false
          });
        });
      });
    },
    dropFile: function dropFile() {
      this.file = null;
      this.isUploadSuccess = false;
      this.uploadPercent = 0;
      this.$emit('file-updated', null);
      this.$emit('file-id-updated', null);
    },
    progressEvent: function progressEvent(_progressEvent) {
      this.uploadPercent = Math.round(_progressEvent.loaded * 100 / _progressEvent.total);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PasswordUpdateForm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/PasswordUpdateForm.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PasswordUpdateForm',
  components: {
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      isLoading: false,
      errors: {},
      form: {
        password_current: null,
        password: null,
        password_confirmation: null
      }
    };
  },
  computed: {
    formPasswordCurrentType: function formPasswordCurrentType() {
      return this.errors.password_current ? 'is-danger' : null;
    },
    formPasswordCurrentMessage: function formPasswordCurrentMessage() {
      return this.errors.password_current ? this.errors.password_current[0] : 'Required. Your current password';
    },
    formPasswordType: function formPasswordType() {
      return this.errors.password ? 'is-danger' : null;
    },
    formPasswordMessage: function formPasswordMessage() {
      return this.errors.password ? this.errors.password[0] : 'Required. New password';
    }
  },
  methods: {
    submit: function submit() {
      var _this = this;

      this.isLoading = true;
      this.errors = {};
      axios.patch('/user/password', this.form).then(function (r) {
        _this.isLoading = false;
        _this.form.password_current = null;
        _this.form.password = null;
        _this.form.password_confirmation = null;

        _this.$buefy.snackbar.open({
          message: 'Password updated',
          duration: 1000,
          queue: false
        });
      })["catch"](function (err) {
        _this.isLoading = false;

        if (err.response.data.errors) {
          _this.errors = err.response.data.errors;
        } else {
          _this.errors = {
            _all: ['An error occurred']
          };
        }

        lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(_this.errors, function (err) {
          _this.$buefy.toast.open({
            message: err[0],
            type: 'is-danger',
            queue: false,
            duration: 3000
          });
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProfileUpdateForm.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ProfileUpdateForm.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_FilePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/FilePicker */ "./resources/js/components/FilePicker.vue");
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ProfileUpdateForm',
  components: {
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_3__["default"],
    FilePicker: _components_FilePicker__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      isFileUploaded: false,
      isLoading: false,
      errors: {},
      form: {
        name: null,
        email: null,
        file_id: null
      }
    };
  },
  computed: _objectSpread({
    formNameType: function formNameType() {
      return this.errors.name ? 'is-danger' : null;
    },
    formNameMessage: function formNameMessage() {
      return this.errors.name ? this.errors.name[0] : 'Required. Your name';
    },
    formEmailType: function formEmailType() {
      return this.errors.email ? 'is-danger' : null;
    },
    formEmailMessage: function formEmailMessage() {
      return this.errors.email ? this.errors.email[0] : 'Required. Your e-mail';
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])(['userName', 'userEmail'])),
  mounted: function mounted() {
    this.form.name = this.userName;
    this.form.email = this.userEmail;
  },
  methods: {
    fileStored: function fileStored(file) {
      this.isFileUploaded = true;
      this.form.file_id = file.id;

      if (this.form.name && this.form.email) {
        this.submit();
      }
    },
    emitIsForbidden: function emitIsForbidden() {
      this.$emit('is-forbidden');
    },
    submit: function submit() {
      var _this = this;

      this.isFileUploaded = false;
      this.isLoading = true;
      this.errors = {};
      axios.patch('/user', this.form).then(function (r) {
        _this.isLoading = false;

        _this.$store.commit('user', r.data.data);

        _this.$buefy.snackbar.open({
          message: 'Profile updated',
          duration: 1000,
          queue: false
        });
      })["catch"](function (err) {
        _this.isLoading = false;

        if (err.response.data.errors) {
          _this.errors = err.response.data.errors;
        } else if (err.response.status === 403) {
          _this.$emit('is-forbidden');

          _this.errors = {
            _all: ['Forbidden with demo account']
          };
        } else {
          console.error(err.response);
          _this.errors = {
            _all: ['An error occurred']
          };
        }

        lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(_this.errors, function (err) {
          _this.$buefy.toast.open({
            message: err[0],
            type: 'is-danger',
            queue: false,
            duration: 3000
          });
        });
      });
    }
  },
  watch: {
    userName: function userName(newValue) {
      this.form.name = newValue;
    },
    userEmail: function userEmail(newValue) {
      this.form.email = newValue;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Profile.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Profile.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
/* harmony import */ var _components_TitleBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/TitleBar */ "./resources/js/components/TitleBar.vue");
/* harmony import */ var _components_HeroBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/HeroBar */ "./resources/js/components/HeroBar.vue");
/* harmony import */ var _components_ProfileUpdateForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ProfileUpdateForm */ "./resources/js/components/ProfileUpdateForm.vue");
/* harmony import */ var _components_PasswordUpdateForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/PasswordUpdateForm */ "./resources/js/components/PasswordUpdateForm.vue");
/* harmony import */ var _components_Tiles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/Tiles */ "./resources/js/components/Tiles.vue");
/* harmony import */ var _components_UserAvatar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/UserAvatar */ "./resources/js/components/UserAvatar.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Profile',
  components: {
    UserAvatar: _components_UserAvatar__WEBPACK_IMPORTED_MODULE_7__["default"],
    Tiles: _components_Tiles__WEBPACK_IMPORTED_MODULE_6__["default"],
    PasswordUpdateForm: _components_PasswordUpdateForm__WEBPACK_IMPORTED_MODULE_5__["default"],
    ProfileUpdateForm: _components_ProfileUpdateForm__WEBPACK_IMPORTED_MODULE_4__["default"],
    HeroBar: _components_HeroBar__WEBPACK_IMPORTED_MODULE_3__["default"],
    TitleBar: _components_TitleBar__WEBPACK_IMPORTED_MODULE_2__["default"],
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  computed: _objectSpread({
    titleStack: function titleStack() {
      return ['Admin', 'Profile'];
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])(['userName', 'userEmail']))
});

/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/lodash/_castFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_castFunction.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ }),

/***/ "./node_modules/lodash/each.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/each.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./forEach */ "./node_modules/lodash/forEach.js");


/***/ }),

/***/ "./node_modules/lodash/forEach.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/forEach.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js"),
    castFunction = __webpack_require__(/*! ./_castFunction */ "./node_modules/lodash/_castFunction.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FilePicker.vue?vue&type=template&id=7d05e4d5&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/FilePicker.vue?vue&type=template&id=7d05e4d5& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-field",
    {
      attrs: {
        label: _vm.label,
        message: _vm.fieldFileMessage,
        type: _vm.fieldFileType
      }
    },
    [
      _c(
        "b-field",
        [
          _c(
            "b-upload",
            {
              on: { input: _vm.upload },
              model: {
                value: _vm.file,
                callback: function($$v) {
                  _vm.file = $$v
                },
                expression: "file"
              }
            },
            [
              _c(
                "a",
                { staticClass: "button is-primary" },
                [
                  _c("b-icon", {
                    attrs: {
                      icon: _vm.uploadButtonIcon,
                      "custom-size": "default"
                    }
                  }),
                  _vm._v(" "),
                  _vm.uploadButtonText
                    ? _c("span", [_vm._v(_vm._s(_vm.uploadButtonText))])
                    : _vm._e()
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _vm.fileName
            ? _c("div", { staticClass: "control" }, [
                _c(
                  "a",
                  { staticClass: "button is-static is-file-upload-label" },
                  [
                    _c("span", { attrs: { title: _vm.fileName } }, [
                      _vm._v(_vm._s(_vm.fileName))
                    ]),
                    _vm._v(" "),
                    _c("span", {
                      staticClass: "delete",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.dropFile($event)
                        }
                      }
                    })
                  ]
                )
              ])
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PasswordUpdateForm.vue?vue&type=template&id=c95bd85a&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/PasswordUpdateForm.vue?vue&type=template&id=c95bd85a& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "card-component",
    { attrs: { title: "Change Password", icon: "lock" } },
    [
      _c(
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.submit($event)
            }
          }
        },
        [
          _c(
            "b-field",
            {
              attrs: {
                horizontal: "",
                label: "Current password",
                message: _vm.formPasswordCurrentMessage,
                type: _vm.formPasswordCurrentType
              }
            },
            [
              _c("b-input", {
                attrs: {
                  name: "password_current",
                  type: "password",
                  required: "",
                  autcomplete: "current-password"
                },
                model: {
                  value: _vm.form.password_current,
                  callback: function($$v) {
                    _vm.$set(_vm.form, "password_current", $$v)
                  },
                  expression: "form.password_current"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "b-field",
            {
              attrs: {
                horizontal: "",
                label: "New password",
                message: _vm.formPasswordMessage,
                type: _vm.formPasswordType
              }
            },
            [
              _c("b-input", {
                attrs: {
                  name: "password",
                  type: "password",
                  required: "",
                  autocomplete: "new-password"
                },
                model: {
                  value: _vm.form.password,
                  callback: function($$v) {
                    _vm.$set(_vm.form, "password", $$v)
                  },
                  expression: "form.password"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-field",
            {
              attrs: {
                horizontal: "",
                label: "New password (confirm)",
                message: "Required. New password one more time"
              }
            },
            [
              _c("b-input", {
                attrs: {
                  name: "password_confirmation",
                  type: "password",
                  required: "",
                  autocomplete: "new-password"
                },
                model: {
                  value: _vm.form.password_confirmation,
                  callback: function($$v) {
                    _vm.$set(_vm.form, "password_confirmation", $$v)
                  },
                  expression: "form.password_confirmation"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("b-field", { attrs: { horizontal: "" } }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "button",
                {
                  staticClass: "button is-primary",
                  class: { "is-loading": _vm.isLoading },
                  attrs: { type: "submit" }
                },
                [_vm._v("\n          Submit\n        ")]
              )
            ])
          ])
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProfileUpdateForm.vue?vue&type=template&id=5aad544a&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ProfileUpdateForm.vue?vue&type=template&id=5aad544a& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "card-component",
    { attrs: { title: "Edit Profile", icon: "account-circle" } },
    [
      _c(
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.submit($event)
            }
          }
        },
        [
          _c(
            "b-field",
            { attrs: { horizontal: "", label: "Avatar" } },
            [_c("file-picker", { on: { "file-stored": _vm.fileStored } })],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "b-field",
            {
              attrs: {
                horizontal: "",
                label: "Name",
                message: _vm.formNameMessage,
                type: _vm.formNameType
              }
            },
            [
              _c("b-input", {
                attrs: { name: "name", required: "" },
                model: {
                  value: _vm.form.name,
                  callback: function($$v) {
                    _vm.$set(_vm.form, "name", $$v)
                  },
                  expression: "form.name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-field",
            {
              attrs: {
                horizontal: "",
                label: "E-mail",
                message: _vm.formEmailMessage,
                type: _vm.formEmailType
              }
            },
            [
              _c("b-input", {
                attrs: { name: "email", type: "email", required: "" },
                model: {
                  value: _vm.form.email,
                  callback: function($$v) {
                    _vm.$set(_vm.form, "email", $$v)
                  },
                  expression: "form.email"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("b-field", { attrs: { horizontal: "" } }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "button",
                {
                  staticClass: "button is-primary",
                  class: { "is-loading": _vm.isLoading },
                  attrs: { type: "submit" }
                },
                [_vm._v("\n          Submit\n        ")]
              )
            ])
          ])
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Profile.vue?vue&type=template&id=25b9215a&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Profile.vue?vue&type=template&id=25b9215a& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("title-bar", { attrs: { "title-stack": _vm.titleStack } }),
      _vm._v(" "),
      _c(
        "hero-bar",
        [
          _vm._v("\n    Profile\n    "),
          _c(
            "router-link",
            {
              staticClass: "button",
              attrs: { slot: "right", to: "/" },
              slot: "right"
            },
            [_vm._v("\n      Dashboard\n    ")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "section",
        { staticClass: "section is-main-section" },
        [
          _c(
            "tiles",
            [
              _c("profile-update-form", { staticClass: "tile is-child" }),
              _vm._v(" "),
              _c(
                "card-component",
                {
                  staticClass: "tile is-child",
                  attrs: { title: "Profile", icon: "account" }
                },
                [
                  _c("user-avatar", {
                    staticClass: "image has-max-width is-aligned-center"
                  }),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  _c(
                    "b-field",
                    { attrs: { label: "Name" } },
                    [
                      _c("b-input", {
                        attrs: {
                          value: _vm.userName,
                          "custom-class": "is-static",
                          readonly: ""
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  _c(
                    "b-field",
                    { attrs: { label: "E-mail" } },
                    [
                      _c("b-input", {
                        attrs: {
                          value: _vm.userEmail,
                          "custom-class": "is-static",
                          readonly: ""
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("password-update-form")
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/FilePicker.vue":
/*!************************************************!*\
  !*** ./resources/js/components/FilePicker.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FilePicker_vue_vue_type_template_id_7d05e4d5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FilePicker.vue?vue&type=template&id=7d05e4d5& */ "./resources/js/components/FilePicker.vue?vue&type=template&id=7d05e4d5&");
/* harmony import */ var _FilePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilePicker.vue?vue&type=script&lang=js& */ "./resources/js/components/FilePicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FilePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FilePicker_vue_vue_type_template_id_7d05e4d5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FilePicker_vue_vue_type_template_id_7d05e4d5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/FilePicker.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/FilePicker.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/FilePicker.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./FilePicker.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FilePicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/FilePicker.vue?vue&type=template&id=7d05e4d5&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/FilePicker.vue?vue&type=template&id=7d05e4d5& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePicker_vue_vue_type_template_id_7d05e4d5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./FilePicker.vue?vue&type=template&id=7d05e4d5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/FilePicker.vue?vue&type=template&id=7d05e4d5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePicker_vue_vue_type_template_id_7d05e4d5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePicker_vue_vue_type_template_id_7d05e4d5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/PasswordUpdateForm.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/PasswordUpdateForm.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PasswordUpdateForm_vue_vue_type_template_id_c95bd85a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PasswordUpdateForm.vue?vue&type=template&id=c95bd85a& */ "./resources/js/components/PasswordUpdateForm.vue?vue&type=template&id=c95bd85a&");
/* harmony import */ var _PasswordUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PasswordUpdateForm.vue?vue&type=script&lang=js& */ "./resources/js/components/PasswordUpdateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PasswordUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PasswordUpdateForm_vue_vue_type_template_id_c95bd85a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PasswordUpdateForm_vue_vue_type_template_id_c95bd85a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/PasswordUpdateForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/PasswordUpdateForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/PasswordUpdateForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./PasswordUpdateForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PasswordUpdateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/PasswordUpdateForm.vue?vue&type=template&id=c95bd85a&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/PasswordUpdateForm.vue?vue&type=template&id=c95bd85a& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordUpdateForm_vue_vue_type_template_id_c95bd85a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./PasswordUpdateForm.vue?vue&type=template&id=c95bd85a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PasswordUpdateForm.vue?vue&type=template&id=c95bd85a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordUpdateForm_vue_vue_type_template_id_c95bd85a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordUpdateForm_vue_vue_type_template_id_c95bd85a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/ProfileUpdateForm.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/ProfileUpdateForm.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProfileUpdateForm_vue_vue_type_template_id_5aad544a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileUpdateForm.vue?vue&type=template&id=5aad544a& */ "./resources/js/components/ProfileUpdateForm.vue?vue&type=template&id=5aad544a&");
/* harmony import */ var _ProfileUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileUpdateForm.vue?vue&type=script&lang=js& */ "./resources/js/components/ProfileUpdateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProfileUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProfileUpdateForm_vue_vue_type_template_id_5aad544a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProfileUpdateForm_vue_vue_type_template_id_5aad544a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ProfileUpdateForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ProfileUpdateForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ProfileUpdateForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileUpdateForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProfileUpdateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileUpdateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ProfileUpdateForm.vue?vue&type=template&id=5aad544a&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/ProfileUpdateForm.vue?vue&type=template&id=5aad544a& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileUpdateForm_vue_vue_type_template_id_5aad544a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileUpdateForm.vue?vue&type=template&id=5aad544a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProfileUpdateForm.vue?vue&type=template&id=5aad544a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileUpdateForm_vue_vue_type_template_id_5aad544a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileUpdateForm_vue_vue_type_template_id_5aad544a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Profile.vue":
/*!****************************************!*\
  !*** ./resources/js/views/Profile.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Profile_vue_vue_type_template_id_25b9215a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=25b9215a& */ "./resources/js/views/Profile.vue?vue&type=template&id=25b9215a&");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js& */ "./resources/js/views/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Profile_vue_vue_type_template_id_25b9215a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Profile_vue_vue_type_template_id_25b9215a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Profile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Profile.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/views/Profile.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Profile.vue?vue&type=template&id=25b9215a&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Profile.vue?vue&type=template&id=25b9215a& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_25b9215a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=template&id=25b9215a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Profile.vue?vue&type=template&id=25b9215a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_25b9215a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_25b9215a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);