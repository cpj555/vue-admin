(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e377377"],{"8ee8":function(e,s,i){"use strict";var t=function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",[i("div",{staticStyle:{"margin-bottom":"15px"}},[e._v("\n    Your roles: "+e._s(e.roles)+"\n  ")]),e._v("\n  Switch roles:\n  "),i("el-radio-group",{model:{value:e.switchRoles,callback:function(s){e.switchRoles=s},expression:"switchRoles"}},[i("el-radio-button",{attrs:{label:"editor"}}),e._v(" "),i("el-radio-button",{attrs:{label:"admin"}})],1)],1)},n=[],r={computed:{roles:function(){return this.$store.getters.roles},switchRoles:{get:function(){return this.roles[0]},set:function(e){var s=this;this.$store.dispatch("user/changeRoles",e).then((function(){s.$emit("change")}))}}}},a=r,o=i("6691"),l=Object(o["a"])(a,t,n,!1,null,null,null);s["a"]=l.exports},a99f:function(e,s,i){"use strict";i.r(s);var t=function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",{staticClass:"app-container"},[i("switch-roles",{on:{change:e.handleRolesChange}}),e._v(" "),i("div",{key:e.key,staticStyle:{"margin-top":"30px"}},[i("div",[i("span",{directives:[{name:"permission",rawName:"v-permission",value:["admin"],expression:"['admin']"}],staticClass:"permission-alert"},[e._v("\n        Only\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("admin")]),e._v(" can see this\n      ")],1),e._v(" "),i("el-tag",{directives:[{name:"permission",rawName:"v-permission",value:["admin"],expression:"['admin']"}],staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("\n        v-permission=\"['admin']\"\n      ")])],1),e._v(" "),i("div",[i("span",{directives:[{name:"permission",rawName:"v-permission",value:["editor"],expression:"['editor']"}],staticClass:"permission-alert"},[e._v("\n        Only\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("editor")]),e._v(" can see this\n      ")],1),e._v(" "),i("el-tag",{directives:[{name:"permission",rawName:"v-permission",value:["editor"],expression:"['editor']"}],staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("\n        v-permission=\"['editor']\"\n      ")])],1),e._v(" "),i("div",[i("span",{directives:[{name:"permission",rawName:"v-permission",value:["admin","editor"],expression:"['admin','editor']"}],staticClass:"permission-alert"},[e._v("\n        Both\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("admin")]),e._v(" and\n        "),i("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("editor")]),e._v(" can see this\n      ")],1),e._v(" "),i("el-tag",{directives:[{name:"permission",rawName:"v-permission",value:["admin","editor"],expression:"['admin','editor']"}],staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("\n        v-permission=\"['admin','editor']\"\n      ")])],1)]),e._v(" "),i("div",{key:"checkPermission"+e.key,staticStyle:{"margin-top":"60px"}},[e._m(0),e._v(" "),i("el-tabs",{staticStyle:{width:"550px"},attrs:{type:"border-card"}},[e.checkPermission(["admin"])?i("el-tab-pane",{attrs:{label:"Admin"}},[e._v("\n        Admin can see this\n        "),i("el-tag",{staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("\n          v-if=\"checkPermission(['admin'])\"\n        ")])],1):e._e(),e._v(" "),e.checkPermission(["editor"])?i("el-tab-pane",{attrs:{label:"Editor"}},[e._v("\n        Editor can see this\n        "),i("el-tag",{staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("\n          v-if=\"checkPermission(['editor'])\"\n        ")])],1):e._e(),e._v(" "),e.checkPermission(["admin","editor"])?i("el-tab-pane",{attrs:{label:"Admin-OR-Editor"}},[e._v("\n        Both admin or editor can see this\n        "),i("el-tag",{staticClass:"permission-sourceCode",attrs:{type:"info"}},[e._v("\n          v-if=\"checkPermission(['admin','editor'])\"\n        ")])],1):e._e()],1)],1)],1)},n=[function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("aside",[e._v("\n      In some cases, using v-permission will have no effect. For example: Element-UI's Tab component or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.\n      "),i("br"),e._v(" e.g.\n    ")])}],r=(i("f301"),i("df99"),i("4360")),a={inserted:function(e,s,i){var t=s.value,n=r["a"].getters&&r["a"].getters.roles;if(!(t&&t instanceof Array&&t.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var a=t,o=n.some((function(e){return a.includes(e)}));o||e.parentNode&&e.parentNode.removeChild(e)}},o=function(e){e.directive("permission",a)};window.Vue&&(window["permission"]=a,Vue.use(o)),a.install=o;var l=a,c=i("e350"),d=i("8ee8"),m={name:"DirectivePermission",components:{SwitchRoles:d["a"]},directives:{permission:l},data:function(){return{key:1}},methods:{checkPermission:c["a"],handleRolesChange:function(){this.key++}}},v=m,p=(i("df24"),i("6691")),u=Object(p["a"])(v,t,n,!1,null,"1d09f86c",null);s["default"]=u.exports},beb5:function(e,s,i){},df24:function(e,s,i){"use strict";var t=i("beb5"),n=i.n(t);n.a},e350:function(e,s,i){"use strict";i.d(s,"a",(function(){return n}));i("f301"),i("df99");var t=i("4360");function n(e){if(e&&e instanceof Array&&e.length>0){var s=t["a"].getters&&t["a"].getters.roles,i=e,n=s.some((function(e){return i.includes(e)}));return!!n}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}}}]);