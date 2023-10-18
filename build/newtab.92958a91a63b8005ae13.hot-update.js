"use strict";
self["webpackHotUpdateAnichinu"]("newtab",{

/***/ "./src/pages/Newtab/components/SettingsDrawer.tsx":
/*!********************************************************!*\
  !*** ./src/pages/Newtab/components/SettingsDrawer.tsx ***!
  \********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-mantine-color-scheme.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/core/MantineProvider/use-mantine-color-scheme/use-computed-color-scheme.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Drawer/Drawer.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Group/Group.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Title/Title.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Stack/Stack.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Card/Card.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Text/Text.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Switch/Switch.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Select/Select.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/Tooltip/Tooltip.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/components/SegmentedControl/SegmentedControl.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tabler_icons_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tabler-icons-react */ "./node_modules/tabler-icons-react/dist/icons/settings.js");
/* harmony import */ var tabler_icons_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tabler-icons-react */ "./node_modules/tabler-icons-react/dist/icons/sun.js");
/* harmony import */ var tabler_icons_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tabler-icons-react */ "./node_modules/tabler-icons-react/dist/icons/moon.js");
/* harmony import */ var tabler_icons_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tabler-icons-react */ "./node_modules/tabler-icons-react/dist/icons/info-circle.js");
/* harmony import */ var _util_saveLocalstorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/saveLocalstorage */ "./src/pages/Newtab/util/saveLocalstorage.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _a;
var _b;
_b = __webpack_require__.$Refresh$.signature();




var SettingsDrawer = function (_c) {
    var settingsOpened = _c.settingsOpened, closeSettings = _c.closeSettings, showBackground = _c.showBackground, setshowBackground = _c.setshowBackground, showAnichinu = _c.showAnichinu, setshowAnichinu = _c.setshowAnichinu, imageCategory = _c.imageCategory, setimageCategory = _c.setimageCategory, animeRedirect = _c.animeRedirect, setanimeRedirect = _c.setanimeRedirect;
    _b();
    var sfwCategories = [
        'waifu',
        'oppai',
        'maid',
        'uniform',
        'selfies',
        'marin-kitagawa',
    ];
    var nsfwCategories = [
        'ass',
        'hentai',
        'milf',
        'oral',
        'paizuri',
        'ecchi',
        'ero',
        'waifu',
        'oppai',
        'uniform',
    ];
    var _d = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_2__.useMantineColorScheme)(), colorScheme = _d.colorScheme, setColorScheme = _d.setColorScheme;
    var computedColorScheme = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.useComputedColorScheme)('light', {
        getInitialValueInEffect: true,
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Drawer, { position: "right", opened: settingsOpened, onClose: closeSettings, size: 525 },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { justify: "center", mb: 35 },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(tabler_icons_react__WEBPACK_IMPORTED_MODULE_6__["default"], { size: 26, color: "#228be6" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_7__.Title, { order: 2, c: 'blue' }, "Settings")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_8__.Stack, { align: "center", justify: "space-between", h: '100%' },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Card, { w: '100%', shadow: "xs", p: 15, radius: 'md', withBorder: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { justify: "space-between" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_10__.Text, null, "Show Background Image"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_11__.Switch, { size: "lg", onLabel: "ON", offLabel: "OFF", checked: showBackground, onChange: function (event) {
                            setshowBackground(event.currentTarget.checked);
                            (0,_util_saveLocalstorage__WEBPACK_IMPORTED_MODULE_1__["default"])('anichinu-bg', event.currentTarget.checked);
                        }, radius: 'md' }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Card, { w: '100%', shadow: "xs", p: 15, radius: 'md', withBorder: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { w: '100%', justify: "space-between" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_10__.Text, null, "Show Anichinu Section"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_11__.Switch, { size: "lg", onLabel: "ON", offLabel: "OFF", checked: showAnichinu, onChange: function (event) {
                            setshowAnichinu(event.currentTarget.checked);
                            (0,_util_saveLocalstorage__WEBPACK_IMPORTED_MODULE_1__["default"])('anichinu-section', event.currentTarget.checked);
                        }, radius: 'md' }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Card, { w: '100%', shadow: "xs", p: 15, radius: 'md', withBorder: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { w: '100%', justify: "space-between" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_10__.Text, null, "Image Category"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_12__.Select, { value: imageCategory, onChange: function (val) {
                            if (val) {
                                setimageCategory(val);
                                (0,_util_saveLocalstorage__WEBPACK_IMPORTED_MODULE_1__["default"])('animechinu-imgCategory', val);
                            }
                        }, variant: "filled", data: sfwCategories, maxDropdownHeight: 150, withScrollArea: false, styles: { dropdown: { maxHeight: 160, overflowY: 'auto' } } }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Card, { w: '100%', shadow: "xs", p: 15, radius: 'md', withBorder: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { w: '100%', justify: "space-between" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_10__.Text, null, "Color Theme"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_13__.Tooltip, { label: colorScheme === 'light'
                            ? 'Turn on Dark mode'
                            : 'Turn on Light mode', position: "left", offset: 10, withArrow: true, arrowSize: 5 },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_14__.ActionIcon, { onClick: function () {
                                return setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
                            }, variant: "default", size: "xl", "aria-label": "Toggle color scheme" }, colorScheme == 'light' ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(tabler_icons_react__WEBPACK_IMPORTED_MODULE_15__["default"], { color: "#FF5349" })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(tabler_icons_react__WEBPACK_IMPORTED_MODULE_16__["default"], { color: "#228be6" })))))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Card, { w: '100%', shadow: "xs", p: 15, radius: 'md', withBorder: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { w: '100%', justify: "space-between" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_10__.Text, null, "Anime Redirect Site"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_17__.SegmentedControl, { value: animeRedirect, onChange: function (val) {
                            setanimeRedirect(val);
                            (0,_util_saveLocalstorage__WEBPACK_IMPORTED_MODULE_1__["default"])('anichinu-redirect', val);
                        }, color: "blue", data: [
                            { label: 'Gogoanime', value: 'gogoanime' },
                            { label: 'Aniwatch', value: 'aniwatch' },
                        ] }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Card, { mt: 75, w: '100%', shadow: "xs", p: 15, radius: 'md', withBorder: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { wrap: "nowrap", justify: "center" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(tabler_icons_react__WEBPACK_IMPORTED_MODULE_18__["default"], { size: 22, color: "orange" }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_10__.Text, { c: '#FFA500' }, "Nsfw feature will be coming soon"))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_9__.Card, { w: '100%', shadow: "xs", p: 15, radius: 'md', withBorder: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_5__.Group, { w: '100%', justify: "center" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_10__.Text, null, "Created By:"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://github.com/JawHawk" }, "Chinmay J"))))));
};
_a = SettingsDrawer;
__webpack_require__.$Refresh$.register(_a, "SettingsDrawer");
_b(SettingsDrawer, "+o3TVYzDjTu3Fb/81v/GkFo4aHc=", false, function () { return [_mantine_core__WEBPACK_IMPORTED_MODULE_2__.useMantineColorScheme, _mantine_core__WEBPACK_IMPORTED_MODULE_3__.useComputedColorScheme]; });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsDrawer);


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1afcc3589214567437ee")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=newtab.92958a91a63b8005ae13.hot-update.js.map