(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Forms.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Forms.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_TitleBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/TitleBar */ "./resources/js/components/TitleBar.vue");
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
/* harmony import */ var lodash_mapValues__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/mapValues */ "./node_modules/lodash/mapValues.js");
/* harmony import */ var lodash_mapValues__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_mapValues__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_CheckboxPicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/CheckboxPicker */ "./resources/js/components/CheckboxPicker.vue");
/* harmony import */ var _components_RadioPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/RadioPicker */ "./resources/js/components/RadioPicker.vue");
/* harmony import */ var _components_FilePicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/FilePicker */ "./resources/js/components/FilePicker.vue");
/* harmony import */ var _components_HeroBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/HeroBar */ "./resources/js/components/HeroBar.vue");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  name: 'Forms',
  components: {
    HeroBar: _components_HeroBar__WEBPACK_IMPORTED_MODULE_6__["default"],
    FilePicker: _components_FilePicker__WEBPACK_IMPORTED_MODULE_5__["default"],
    RadioPicker: _components_RadioPicker__WEBPACK_IMPORTED_MODULE_4__["default"],
    CheckboxPicker: _components_CheckboxPicker__WEBPACK_IMPORTED_MODULE_3__["default"],
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"],
    TitleBar: _components_TitleBar__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        phone: null,
        department: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: [],
        radio: null,
        "switch": true,
        file: null
      },
      departments: ['Business Development', 'Marketing', 'Sales']
    };
  },
  computed: {
    titleStack: function titleStack() {
      return ['Admin', 'Forms'];
    }
  },
  methods: {
    submit: function submit() {},
    reset: function reset() {
      this.form = lodash_mapValues__WEBPACK_IMPORTED_MODULE_2___default()(this.form, function (item) {
        if (item && _typeof(item) === 'object') {
          return [];
        }

        return null;
      });
      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Forms.vue?vue&type=template&id=334df9c0&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Forms.vue?vue&type=template&id=334df9c0& ***!
  \***************************************************************************************************************************************************************************************************/
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
          _vm._v("\n    Forms\n    "),
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
          _c("card-component", { attrs: { title: "Forms", icon: "ballot" } }, [
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
                  { attrs: { label: "From", horizontal: "" } },
                  [
                    _c(
                      "b-field",
                      [
                        _c("b-input", {
                          attrs: {
                            icon: "account",
                            placeholder: "Name",
                            name: "name",
                            required: ""
                          },
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
                      [
                        _c("b-input", {
                          attrs: {
                            icon: "email",
                            type: "email",
                            placeholder: "E-mail",
                            name: "email",
                            required: ""
                          },
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
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-field",
                  {
                    attrs: {
                      message: "Do not enter the leading zero",
                      horizontal: ""
                    }
                  },
                  [
                    _c(
                      "b-field",
                      [
                        _c("p", { staticClass: "control" }, [
                          _c("a", { staticClass: "button is-static" }, [
                            _vm._v("\n                +44\n              ")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("b-input", {
                          attrs: { type: "tel", name: "phone", expanded: "" },
                          model: {
                            value: _vm.form.phone,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "phone", $$v)
                            },
                            expression: "form.phone"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-field",
                  { attrs: { label: "Department", horizontal: "" } },
                  [
                    _c(
                      "b-select",
                      {
                        attrs: {
                          placeholder: "Select a department",
                          required: ""
                        },
                        model: {
                          value: _vm.form.department,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "department", $$v)
                          },
                          expression: "form.department"
                        }
                      },
                      _vm._l(_vm.departments, function(department, index) {
                        return _c(
                          "option",
                          { key: index, domProps: { value: department } },
                          [
                            _vm._v(
                              "\n              " +
                                _vm._s(department) +
                                "\n            "
                            )
                          ]
                        )
                      }),
                      0
                    )
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
                      label: "Subject",
                      message: "Message subject",
                      horizontal: ""
                    }
                  },
                  [
                    _c("b-input", {
                      attrs: {
                        placeholder: "e.g. Partnership proposal",
                        required: ""
                      },
                      model: {
                        value: _vm.form.subject,
                        callback: function($$v) {
                          _vm.$set(_vm.form, "subject", $$v)
                        },
                        expression: "form.subject"
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
                      label: "Question",
                      message: "Your question. Max 255 characters",
                      horizontal: ""
                    }
                  },
                  [
                    _c("b-input", {
                      attrs: {
                        type: "textarea",
                        placeholder: "Explain how we can help you",
                        maxlength: "255",
                        required: ""
                      },
                      model: {
                        value: _vm.form.question,
                        callback: function($$v) {
                          _vm.$set(_vm.form, "question", $$v)
                        },
                        expression: "form.question"
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
                  { attrs: { horizontal: "" } },
                  [
                    _c("b-field", { attrs: { grouped: "" } }, [
                      _c(
                        "div",
                        { staticClass: "control" },
                        [
                          _c(
                            "b-button",
                            {
                              attrs: {
                                "native-type": "submit",
                                type: "is-primary"
                              }
                            },
                            [_vm._v("Submit")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "control" },
                        [
                          _c(
                            "b-button",
                            {
                              attrs: { type: "is-primary is-outlined" },
                              on: { click: _vm.reset }
                            },
                            [_vm._v("Reset")]
                          )
                        ],
                        1
                      )
                    ])
                  ],
                  1
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "card-component",
            { attrs: { title: "Custom elements", icon: "ballot-outline" } },
            [
              _c(
                "b-field",
                {
                  staticClass: "has-check",
                  attrs: { label: "Checkbox", horizontal: "" }
                },
                [
                  _c("checkbox-picker", {
                    attrs: {
                      options: {
                        lorem: "Lorem",
                        ipsum: "Ipsum",
                        dolore: "Dolore"
                      },
                      type: "is-primary"
                    },
                    model: {
                      value: _vm.customElementsForm.checkbox,
                      callback: function($$v) {
                        _vm.$set(_vm.customElementsForm, "checkbox", $$v)
                      },
                      expression: "customElementsForm.checkbox"
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
                  staticClass: "has-check",
                  attrs: { label: "Radio", horizontal: "" }
                },
                [
                  _c("radio-picker", {
                    attrs: { options: { one: "One", two: "Two" } },
                    model: {
                      value: _vm.customElementsForm.radio,
                      callback: function($$v) {
                        _vm.$set(_vm.customElementsForm, "radio", $$v)
                      },
                      expression: "customElementsForm.radio"
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
                { attrs: { label: "Switch", horizontal: "" } },
                [
                  _c(
                    "b-switch",
                    {
                      model: {
                        value: _vm.customElementsForm.switch,
                        callback: function($$v) {
                          _vm.$set(_vm.customElementsForm, "switch", $$v)
                        },
                        expression: "customElementsForm.switch"
                      }
                    },
                    [_vm._v("\n          Default\n        ")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c(
                "b-field",
                { attrs: { label: "File", horizontal: "" } },
                [
                  _c("file-picker", {
                    model: {
                      value: _vm.customElementsForm.file,
                      callback: function($$v) {
                        _vm.$set(_vm.customElementsForm, "file", $$v)
                      },
                      expression: "customElementsForm.file"
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Forms.vue":
/*!**************************************!*\
  !*** ./resources/js/views/Forms.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Forms_vue_vue_type_template_id_334df9c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Forms.vue?vue&type=template&id=334df9c0& */ "./resources/js/views/Forms.vue?vue&type=template&id=334df9c0&");
/* harmony import */ var _Forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Forms.vue?vue&type=script&lang=js& */ "./resources/js/views/Forms.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Forms_vue_vue_type_template_id_334df9c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Forms_vue_vue_type_template_id_334df9c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Forms.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Forms.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/views/Forms.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Forms.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Forms.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Forms.vue?vue&type=template&id=334df9c0&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/Forms.vue?vue&type=template&id=334df9c0& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Forms_vue_vue_type_template_id_334df9c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Forms.vue?vue&type=template&id=334df9c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Forms.vue?vue&type=template&id=334df9c0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Forms_vue_vue_type_template_id_334df9c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Forms_vue_vue_type_template_id_334df9c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);