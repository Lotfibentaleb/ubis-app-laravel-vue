(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notification.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Notification.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: 'Notification',
  data: function data() {
    return {
      isDismissed: false
    };
  },
  methods: {
    dismiss: function dismiss() {
      this.isDismissed = true;
      this.$buefy.snackbar.open({
        message: 'Dismissed',
        queue: false
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProductsTable.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ProductsTable.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ModalTrashBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/ModalTrashBox */ "./resources/js/components/ModalTrashBox.vue");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_json_excel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-json-excel */ "./node_modules/vue-json-excel/dist/vue-json-excel.esm.js");
/* harmony import */ var buefy_src_components_button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! buefy/src/components/button/Button */ "./node_modules/buefy/src/components/button/Button.vue");
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
  name: 'ProductsTable',
  components: {
    BButton: buefy_src_components_button_Button__WEBPACK_IMPORTED_MODULE_3__["default"],
    ModalTrashBox: _components_ModalTrashBox__WEBPACK_IMPORTED_MODULE_0__["default"],
    downloadexcel: vue_json_excel__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    dataUrl: {
      type: String,
      "default": null
    },
    checkable: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      isModalActive: false,
      trashObject: null,
      products: [],
      isLoading: false,
      isExcelLoading: false,
      perPage: 10,
      checkedRows: [],
      sortField: '',
      sortOrder: 'asc',
      defaultSortOrder: 'asc',
      page: 1,
      total: 0,
      filterValues: '{}',
      filterGeneralUrl: '',
      filterEnhancedUrl: '',
      excelProducts: [],
      jsonFields: {
        'Artikel-Nr.': 'st_article_nr',
        'Serial-Nr.': 'st_serial_nr',
        'Status': 'lifecycle',
        'Produktionsdaten': 'production_data_count',
        'Komponenten': 'components_count',
        'Produktionsauftrag': 'production_order_nr',
        'Erstellt': 'created_at'
      }
    };
  },
  watch: {
    perPage: function perPage() {
      this.getData();
    }
  },
  computed: {
    trashObjectName: function trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.st_article_nr + "/" + this.trashObject.st_serial_nr;
      }

      return null;
    }
  },
  created: function created() {
    this.getData();
    this.getFilteringURL();
  },
  methods: {
    onPageChange: function onPageChange(page) {
      this.page = page;
      this.getData();
    },
    onSort: function onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.getData();
    },
    onFilterChange: lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(function (filter) {
      console.warn('filter', Object.entries(filter));
      this.filterValues = '';
      this.filterValues = encodeURIComponent(JSON.stringify(filter));
      this.getData();
      this.getFilteringURL();
    }, 250),
    getData: function getData() {
      var _this = this;

      if (this.dataUrl) {
        this.isLoading = true;
        var params = ["size=".concat(this.perPage), "sort_by=".concat(this.sortField, ".").concat(this.sortOrder), "page=".concat(this.page), "filter=".concat(this.filterValues)].join('&');
        axios.create({
          headers: {
            'Content-Type': 'application/json'
          }
        }).get(this.dataUrl + '?' + params).then(function (r) {
          _this.isLoading = false;

          if (r.data && r.data.data) {
            _this.perPage = r.data.meta.per_page;
            _this.total = r.data.meta.total;
            _this.page = r.data.meta.current_page;
            _this.products = r.data.data;
          }
        })["catch"](function (err) {
          _this.isLoading = false;

          _this.$buefy.toast.open({
            message: "Error: ".concat(err.message),
            type: 'is-danger',
            queue: false
          });
        });
      }
    },
    getFilteringURL: function getFilteringURL() {
      if (this.dataUrl) {
        var paramsGeneral = ["enhanced=0", "sort_by=".concat(this.sortField, ".").concat(this.sortOrder), "page=".concat(this.page), "filter=".concat(this.filterValues)].join('&');
        var paramsEnhance = ["enhanced=1", "sort_by=".concat(this.sortField, ".").concat(this.sortOrder), "page=".concat(this.page), "filter=".concat(this.filterValues)].join('&');
        this.filterGeneralUrl = this.dataUrl + '/excel?' + paramsGeneral;
        this.filterEnhancedUrl = this.dataUrl + '/enhancedExcel?' + paramsEnhance;
      }
    },
    trashModal: function trashModal(trashObject) {
      this.trashObject = trashObject;
      this.isModalActive = true;
    },
    showEditPanel: function showEditPanel(editableObject) {
      this.$emit("onSettingShow", editableObject);
    },
    trashConfirm: function trashConfirm() {
      var _this2 = this;

      this.isModalActive = false;
      axios["delete"]("".concat(this.dataUrl, "/product/").concat(this.trashObject.id)).then(function (r) {
        _this2.getData(); // update list


        _this2.$buefy.snackbar.open({
          message: "Deleted ".concat(r.data.data.st_article_nr, "/").concat(r.data.data.st_serial_nr, " and ").concat(r.data.data.deleted_device_records, " Measurements, ").concat(r.data.data.deleted_sub_components, " Components."),
          queue: false
        });
      })["catch"](function (err) {
        _this2.$buefy.toast.open({
          message: "Error: ".concat(err.message),
          type: 'is-danger',
          queue: false
        });
      });
    },
    trashCancel: function trashCancel() {
      this.isModalActive = false;
    },
    startDownload: function startDownload() {
      console.log("Started Download!");
    },
    finishDownload: function finishDownload() {
      console.log("Finished Download!");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/TableEditPanel.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var buefy_src_components_input_Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buefy/src/components/input/Input */ "./node_modules/buefy/src/components/input/Input.vue");
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
  name: 'TableEditPanel',
  components: {
    BInput: buefy_src_components_input_Input__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['curValue', 'isShow'],
  data: function data() {
    return {
      productOrderNr: '',
      active: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.productOrderNr = this.curValue;
    setTimeout(function () {
      _this.active = true;
    }, 50);
  },
  methods: {
    handleSave: function handleSave() {
      if (this.productOrderNr === '') {
        var infoMessage = "Please input product order number";
        this.$buefy.snackbar.open({
          message: infoMessage,
          type: 'is-danger',
          queue: false
        });
        return;
      } else {
        this.$emit("onSettingSave", this.productOrderNr);
      }
    },
    handleClose: function handleClose() {
      var _this2 = this;

      setTimeout(function () {
        _this2.$emit("onSettingHide", false);
      }, 1000);
      this.active = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Products/ProductsList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Products/ProductsList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Notification */ "./resources/js/components/Notification.vue");
/* harmony import */ var _components_ProductsTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ProductsTable */ "./resources/js/components/ProductsTable.vue");
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
/* harmony import */ var _components_TitleBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/TitleBar */ "./resources/js/components/TitleBar.vue");
/* harmony import */ var _components_HeroBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/HeroBar */ "./resources/js/components/HeroBar.vue");
/* harmony import */ var buefy_src_components_field_Field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! buefy/src/components/field/Field */ "./node_modules/buefy/src/components/field/Field.vue");
/* harmony import */ var _components_TableEditPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/TableEditPanel */ "./resources/js/components/TableEditPanel.vue");
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
  name: 'products.list',
  components: {
    BField: buefy_src_components_field_Field__WEBPACK_IMPORTED_MODULE_5__["default"],
    HeroBar: _components_HeroBar__WEBPACK_IMPORTED_MODULE_4__["default"],
    TitleBar: _components_TitleBar__WEBPACK_IMPORTED_MODULE_3__["default"],
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
    ProductsTable: _components_ProductsTable__WEBPACK_IMPORTED_MODULE_1__["default"],
    Notification: _components_Notification__WEBPACK_IMPORTED_MODULE_0__["default"],
    TableEditPanel: _components_TableEditPanel__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
  computed: {
    titleStack: function titleStack() {
      return ['Production', 'Products'];
    }
  },
  data: function data() {
    return {
      isShow: false,
      tableRowData: {}
    };
  },
  methods: {
    onSettingShow: function onSettingShow(data) {
      this.tableRowData = data;
      this.isShow = true;
    },
    onSettingHide: function onSettingHide(data) {
      this.isShow = false;
    },
    onSettingSave: function onSettingSave(productOrderNr) {
      var _this = this;

      if (productOrderNr === '' || productOrderNr === null) {
        var infoMessage = "Please input product order number";
        this.$buefy.snackbar.open({
          message: infoMessage,
          queue: false
        });
        return;
      }

      this.isShow = false;
      this.tableRowData.production_order_nr = productOrderNr;
      var method = 'put';
      var productId = this.tableRowData.id;
      var url = "/productlist/product/".concat(productId);
      var data = this.tableRowData;
      axios({
        method: method,
        url: url,
        data: data
      }).then(function (r) {
        _this.productDetails = r.data.data;
        var infoMessage = "Product update success";

        _this.$buefy.snackbar.open({
          message: infoMessage,
          queue: false
        });
      })["catch"](function (err) {
        var message = "Fehler: ".concat(err.message);

        if (err.response.status == 404) {
          message = "Product update failed";
        }

        _this.$buefy.toast.open({
          message: message,
          type: 'is-danger',
          queue: false
        });
      })["finally"](function () {});
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.panel-layout{\n    padding: 20px 10px 20px 10px;\n}\n.edit-panel {\n    background: #ffffff;\n    width: 300px;\n    height: 100%;\n    position: absolute;\n    right: -350px;\n    transition: 1s ease;\n    box-shadow: 0px 1px 2px 4px #888888\n}\n.active {\n    right: 0px !important;\n}\n.row-panel-btn {\n    margin: 30px;\n    display: flex;\n    justify-content: space-around;\n}\n.panel-btn {\n    width: 70px;\n}\n.card-content {\n    display: flex;\n    position: relative;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./TableEditPanel.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154& ***!
  \***************************************************************************************************************************************************************************************************************/
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
  return !_vm.isDismissed
    ? _c("div", { staticClass: "notification" }, [
        _c("div", { staticClass: "level" }, [
          _c("div", { staticClass: "level-left" }, [
            _c("div", { staticClass: "level-item" }, [_vm._t("default")], 2)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "level-right" }, [
            _c(
              "button",
              {
                staticClass: "button is-small is-white",
                attrs: { type: "button" },
                on: { click: _vm.dismiss }
              },
              [_vm._v("Dismiss")]
            )
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProductsTable.vue?vue&type=template&id=0fd55f6f&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ProductsTable.vue?vue&type=template&id=0fd55f6f& ***!
  \****************************************************************************************************************************************************************************************************************/
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
      _c("modal-trash-box", {
        attrs: {
          "is-active": _vm.isModalActive,
          "trash-subject": _vm.trashObjectName
        },
        on: { confirm: _vm.trashConfirm, cancel: _vm.trashCancel }
      }),
      _vm._v(" "),
      _c(
        "b-field",
        { attrs: { grouped: "", "group-multiline": "" } },
        [
          _c("b-button", { attrs: { type: "is-info", disabled: "" } }, [
            _vm._v("Anzahl Einträge: " + _vm._s(this.total))
          ]),
          _vm._v(" "),
          _c(
            "a",
            { attrs: { href: this.filterGeneralUrl } },
            [
              _c("b-button", { staticClass: "btn excel-export" }, [
                _vm._v("Download Excel")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "a",
            { attrs: { href: this.filterEnhancedUrl } },
            [
              _c("b-button", { staticClass: "btn excel-export" }, [
                _vm._v("Enhanced Excel")
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-table",
        {
          attrs: {
            "checked-rows": _vm.checkedRows,
            checkable: _vm.checkable,
            loading: _vm.isLoading,
            paginated: "",
            "backend-pagination": "",
            total: _vm.total,
            "per-page": _vm.perPage,
            striped: true,
            hoverable: true,
            "backend-sorting": "",
            "default-sort-direction": _vm.defaultSortOrder,
            "default-sort": [_vm.sortField, _vm.sortOrder],
            "backend-filtering": "",
            data: _vm.products
          },
          on: {
            "update:checkedRows": function($event) {
              _vm.checkedRows = $event
            },
            "update:checked-rows": function($event) {
              _vm.checkedRows = $event
            },
            "page-change": _vm.onPageChange,
            sort: _vm.onSort,
            "filters-change": _vm.onFilterChange
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(props) {
                return [
                  _c(
                    "b-table-column",
                    { staticClass: "has-no-head-mobile is-image-cell" },
                    [
                      props.row.avatar
                        ? _c("div", { staticClass: "image" }, [
                            _c("img", {
                              staticClass: "is-rounded",
                              attrs: { src: props.row.avatar }
                            })
                          ])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Artikel-Nr.",
                        field: "st_article_nr",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(props.row.st_article_nr) +
                          "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Serial-Nr.",
                        field: "st_serial_nr",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(props.row.st_serial_nr) +
                          "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Status",
                        field: "lifecycle",
                        sortable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n        " + _vm._s(props.row.lifecycle) + "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Produktionsdaten",
                        field: "production_data_count"
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(props.row.production_data_count) +
                          "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: { label: "Komponenten", field: "components_count" }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(props.row.components_count) +
                          "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Produktionsauftrag",
                        field: "production_order_nr",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(props.row.production_order_nr) +
                          "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Erstellt",
                        field: "created_at",
                        sortable: ""
                      }
                    },
                    [
                      _c(
                        "small",
                        {
                          staticClass: "has-text-grey is-abbr-like",
                          attrs: { title: props.row.created_at }
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm._f("moment")(
                                props.row.created_at,
                                "DD.MM.YYYY / h:mm:ss"
                              )
                            )
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      staticClass: "is-actions-cell",
                      attrs: { "custom-key": "actions" }
                    },
                    [
                      _c("div", { staticClass: "buttons is-right" }, [
                        _c(
                          "button",
                          {
                            staticClass: "button is-small is-danger",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.trashModal(props.row)
                              }
                            }
                          },
                          [
                            _c("b-icon", {
                              attrs: { icon: "trash-can", size: "is-small" }
                            })
                          ],
                          1
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      staticClass: "is-actions-cell",
                      attrs: { "custom-key": "actions" }
                    },
                    [
                      _c("div", { staticClass: "buttons is-right" }, [
                        _c(
                          "button",
                          {
                            staticClass: "button is-small is-success",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.showEditPanel(props.row)
                              }
                            }
                          },
                          [
                            _c("b-icon", {
                              attrs: { icon: "google-photos", size: "is-small" }
                            })
                          ],
                          1
                        )
                      ])
                    ]
                  )
                ]
              }
            },
            {
              key: "footer",
              fn: function() {
                return [
                  _c(
                    "div",
                    { staticClass: "has-text-right" },
                    [
                      _c(
                        "b-select",
                        {
                          model: {
                            value: _vm.perPage,
                            callback: function($$v) {
                              _vm.perPage = $$v
                            },
                            expression: "perPage"
                          }
                        },
                        [
                          _c("option", { attrs: { value: "10" } }, [
                            _vm._v("10 per page")
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "20" } }, [
                            _vm._v("20 per page")
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "50" } }, [
                            _vm._v("50 per page")
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "100" } }, [
                            _vm._v("100 per page")
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "1000" } }, [
                            _vm._v("1000 per page")
                          ])
                        ]
                      )
                    ],
                    1
                  )
                ]
              },
              proxy: true
            }
          ])
        },
        [
          _vm._v(" "),
          _c(
            "section",
            { staticClass: "section", attrs: { slot: "empty" }, slot: "empty" },
            [
              _c(
                "div",
                { staticClass: "content has-text-grey has-text-centered" },
                [
                  _vm.isLoading
                    ? [
                        _c(
                          "p",
                          [
                            _c("b-icon", {
                              attrs: {
                                icon: "dots-horizontal",
                                size: "is-large"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("p", [_vm._v("Fetching data...")])
                      ]
                    : [
                        _c(
                          "p",
                          [
                            _c("b-icon", {
                              attrs: { icon: "emoticon-sad", size: "is-large" }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("p", [_vm._v("Nothing's here…")])
                      ]
                ],
                2
              )
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=template&id=54dfc317&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/TableEditPanel.vue?vue&type=template&id=54dfc317& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
    { staticClass: "edit-panel", class: { active: _vm.active } },
    [
      _c("div", { staticClass: "panel-layout" }, [
        _c("div", [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "div",
            { staticStyle: { margin: "10px" } },
            [
              _c("b-input", {
                model: {
                  value: _vm.productOrderNr,
                  callback: function($$v) {
                    _vm.productOrderNr = $$v
                  },
                  expression: "productOrderNr"
                }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "row-panel-btn" },
          [
            _c(
              "b-button",
              {
                staticClass: "btn excel-export panel-btn",
                on: { click: _vm.handleSave }
              },
              [_vm._v("Save")]
            ),
            _vm._v(" "),
            _c(
              "b-button",
              {
                staticClass: "btn excel-export panel-btn",
                on: { click: _vm.handleClose }
              },
              [_vm._v("Close")]
            )
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticStyle: { margin: "10px" } }, [
      _c("label", [_vm._v("Product Order Nr")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Products/ProductsList.vue?vue&type=template&id=35067e04&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Products/ProductsList.vue?vue&type=template&id=35067e04& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
          _vm._v("\n    Produkte\n    "),
          _c("p", { staticClass: "subtitle" }, [
            _vm._v(
              "\n       Übersicht aller aktuell in der Datenbank befindlichen Produkte\n    "
            )
          ]),
          _vm._v(" "),
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
            "card-component",
            {
              staticClass: "has-table has-mobile-sort-spaced",
              attrs: { title: "Produkte", icon: "account-multiple" }
            },
            [
              _c("products-table", {
                attrs: { "data-url": "/productlist", checkable: true },
                on: { onSettingShow: _vm.onSettingShow }
              }),
              _vm._v(" "),
              _vm.isShow
                ? _c("table-edit-panel", {
                    attrs: {
                      curValue: _vm.tableRowData.production_order_nr,
                      isShow: _vm.isShow
                    },
                    on: {
                      onSettingHide: _vm.onSettingHide,
                      onSettingSave: _vm.onSettingSave
                    }
                  })
                : _vm._e()
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

/***/ "./resources/js/components/Notification.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/Notification.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification.vue?vue&type=template&id=6a4ce154& */ "./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&");
/* harmony import */ var _Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notification.vue?vue&type=script&lang=js& */ "./resources/js/components/Notification.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Notification.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Notification.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Notification.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Notification.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notification.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Notification.vue?vue&type=template&id=6a4ce154& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/ProductsTable.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/ProductsTable.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductsTable_vue_vue_type_template_id_0fd55f6f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductsTable.vue?vue&type=template&id=0fd55f6f& */ "./resources/js/components/ProductsTable.vue?vue&type=template&id=0fd55f6f&");
/* harmony import */ var _ProductsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductsTable.vue?vue&type=script&lang=js& */ "./resources/js/components/ProductsTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProductsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductsTable_vue_vue_type_template_id_0fd55f6f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProductsTable_vue_vue_type_template_id_0fd55f6f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ProductsTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ProductsTable.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/ProductsTable.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ProductsTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProductsTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ProductsTable.vue?vue&type=template&id=0fd55f6f&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/ProductsTable.vue?vue&type=template&id=0fd55f6f& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsTable_vue_vue_type_template_id_0fd55f6f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ProductsTable.vue?vue&type=template&id=0fd55f6f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ProductsTable.vue?vue&type=template&id=0fd55f6f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsTable_vue_vue_type_template_id_0fd55f6f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsTable_vue_vue_type_template_id_0fd55f6f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/TableEditPanel.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/TableEditPanel.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableEditPanel_vue_vue_type_template_id_54dfc317___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableEditPanel.vue?vue&type=template&id=54dfc317& */ "./resources/js/components/TableEditPanel.vue?vue&type=template&id=54dfc317&");
/* harmony import */ var _TableEditPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableEditPanel.vue?vue&type=script&lang=js& */ "./resources/js/components/TableEditPanel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _TableEditPanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TableEditPanel.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TableEditPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TableEditPanel_vue_vue_type_template_id_54dfc317___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TableEditPanel_vue_vue_type_template_id_54dfc317___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/TableEditPanel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/TableEditPanel.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/TableEditPanel.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./TableEditPanel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./TableEditPanel.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/TableEditPanel.vue?vue&type=template&id=54dfc317&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/TableEditPanel.vue?vue&type=template&id=54dfc317& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_template_id_54dfc317___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./TableEditPanel.vue?vue&type=template&id=54dfc317& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TableEditPanel.vue?vue&type=template&id=54dfc317&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_template_id_54dfc317___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TableEditPanel_vue_vue_type_template_id_54dfc317___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Products/ProductsList.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Products/ProductsList.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductsList_vue_vue_type_template_id_35067e04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductsList.vue?vue&type=template&id=35067e04& */ "./resources/js/views/Products/ProductsList.vue?vue&type=template&id=35067e04&");
/* harmony import */ var _ProductsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductsList.vue?vue&type=script&lang=js& */ "./resources/js/views/Products/ProductsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProductsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductsList_vue_vue_type_template_id_35067e04___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProductsList_vue_vue_type_template_id_35067e04___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Products/ProductsList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Products/ProductsList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Products/ProductsList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProductsList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Products/ProductsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Products/ProductsList.vue?vue&type=template&id=35067e04&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/Products/ProductsList.vue?vue&type=template&id=35067e04& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsList_vue_vue_type_template_id_35067e04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProductsList.vue?vue&type=template&id=35067e04& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Products/ProductsList.vue?vue&type=template&id=35067e04&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsList_vue_vue_type_template_id_35067e04___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsList_vue_vue_type_template_id_35067e04___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);