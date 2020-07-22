module.exports=function(e){var t={};function s(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,s),a.l=!0,a.exports}return s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(r,a,function(t){return e[t]}.bind(null,a));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=21)}([function(e,t){e.exports=flarum.core.compat.app},function(e,t){e.exports=flarum.core.compat.extend},function(e,t){e.exports=flarum.core.compat["components/Button"]},function(e,t){e.exports=flarum.core.compat.Model},function(e,t){e.exports=flarum.core.compat["components/Modal"]},function(e,t){e.exports=flarum.core.compat["components/Alert"]},function(e,t){e.exports=flarum.core.compat["helpers/username"]},function(e,t){e.exports=flarum.core.compat["helpers/humanTime"]},function(e,t){e.exports=flarum.core.compat["components/UserPage"]},function(e,t){e.exports=flarum.core.compat["models/User"]},,function(e,t){e.exports=flarum.core.compat["utils/mixin"]},function(e,t){e.exports=flarum.core.compat["components/SettingsPage"]},function(e,t){e.exports=flarum.core.compat["components/Page"]},function(e,t){e.exports=flarum.core.compat.Component},function(e,t){e.exports=flarum.core.compat["components/LoadingIndicator"]},function(e,t){e.exports=flarum.core.compat["helpers/avatar"]},function(e,t){e.exports=flarum.core.compat["helpers/icon"]},function(e,t){e.exports=flarum.core.compat["components/HeaderSecondary"]},function(e,t){e.exports=flarum.core.compat["components/NotificationsDropdown"]},function(e,t){e.exports=flarum.core.compat["components/LinkButton"]},function(e,t,s){"use strict";s.r(t);var r=s(1),a=s(9),n=s.n(a),o=s(3),u=s.n(o);function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var p=s(11),c=function(e){function t(){return e.apply(this,arguments)||this}return i(t,e),t}(s.n(p)()(u.a,{user:u.a.hasOne("user"),requestedUsername:u.a.attribute("requestedUsername"),status:u.a.attribute("status"),reason:u.a.attribute("reason"),createdAt:u.a.attribute("createdAt",u.a.transformDate)})),l=s(2),f=s.n(l),d=s(12),h=s.n(d),q=s(5),v=s.n(q),y=s(4),b=s.n(y),_=function(e){function t(){return e.apply(this,arguments)||this}i(t,e);var s=t.prototype;return s.init=function(){e.prototype.init.call(this),this.username=m.prop(app.session.user.username()),app.session.user.username_requests()&&this.username(app.session.user.username_requests().requestedUsername()),this.success=!1,this.password=m.prop("")},s.className=function(){return"RequestUsernameModal Modal--small"},s.title=function(){return app.translator.trans("fof-username-request.forum.request.title")},s.content=function(){return this.success?m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("p",{className:"helpText"},app.translator.trans("fof-username-request.forum.request.confirmation_message")),m("div",{className:"Form-group"},m(f.a,{className:"Button Button--primary Button--block",onclick:this.hide.bind(this)},app.translator.trans("fof-username-request.forum.request.dismiss_button"))))):m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},app.session.user.username_requests()?m("p",{className:"helpText"},app.translator.trans("fof-username-request.forum.request.current_request",{username:app.session.user.username_requests().requestedUsername()})):"",m("div",{className:"Form-group"},m("input",{type:"text",name:"text",className:"FormControl",placeholder:app.session.user.username(),bidi:this.username,disabled:this.loading})),m("div",{className:"Form-group"},m("input",{type:"password",name:"password",className:"FormControl",placeholder:app.translator.trans("core.forum.change_email.confirm_password_placeholder"),bidi:this.password,disabled:this.loading})),m("div",{className:"Form-group"},f.a.component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading,children:app.translator.trans("fof-username-request.forum.request.submit_button")})),app.session.user.username_requests()?m("div",{className:"Form-group"},f.a.component({className:"Button Button--primary Button--block",onclick:this.deleteRequest.bind(this),loading:this.loading,children:app.translator.trans("fof-username-request.forum.request.delete_button")})):""))},s.deleteRequest=function(e){e.preventDefault(),this.loading=!0,app.session.user.username_requests().delete(),app.alerts.show(this.successAlert=new v.a({type:"success",children:app.translator.trans("fof-username-request.forum.request.deleted")})),app.session.user.username_requests=m.prop(),this.hide()},s.onsubmit=function(e){var t=this;e.preventDefault(),this.alert=null,this.username()!==app.session.user.username()?(this.loading=!0,app.store.createRecord("username-requests").save({username:this.username()},{meta:{password:this.password()},errorHandler:this.onerror.bind(this)}).then(function(e){app.session.user.username_requests=m.prop(e),t.success=!0}).catch(function(){}).then(this.loaded.bind(this))):this.hide()},s.onerror=function(t){401===t.status&&(t.alert.props.children=app.translator.trans("core.forum.change_email.incorrect_password_message")),e.prototype.onerror.call(this,t)},t}(b.a),N=s(13),g=s.n(N),x=s(14),w=s.n(x),k=s(15),B=s.n(k),F=s(16),j=s.n(F),M=s(6),A=s.n(M),R=s(17),U=s.n(R),O=s(7),P=s.n(O),T=function(e){function t(){return e.apply(this,arguments)||this}i(t,e);var s=t.prototype;return s.init=function(){e.prototype.init.call(this),this.request=this.props.request,this.approved=m.prop("Rejected"),this.reason=m.prop("")},s.title=function(){return app.translator.trans("fof-username-request.forum.action.title")},s.className=function(){return"RequestActionModal Modal--medium"},s.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form"},m("h3",{className:"Notification-content"},app.translator.trans("fof-username-request.forum.action.name",{username:A()(this.request.user()),newUsername:this.request.requestedUsername()})),m("p",{className:"help"},app.translator.trans("fof-username-request.forum.action.help_text")),m("legend",null,app.translator.trans("fof-username-request.forum.action.decision_title")),m("div",{className:"Form-group"},m("label",{className:"checkbox"},m("input",{type:"radio",name:"approved",value:"Approved",checked:"Approved"===this.approved(),onclick:m.withAttr("value",this.approved)}),app.translator.trans("fof-username-request.forum.action.approval_label")),m("label",{className:"checkbox"},m("input",{type:"radio",name:"rejected",value:"Rejected",checked:"Rejected"===this.approved(),onclick:m.withAttr("value",this.approved)}),app.translator.trans("fof-username-request.forum.action.rejected_label"))),"Rejected"===this.approved()?m("div",{className:"Form-group"},m("legend",null,app.translator.trans("fof-username-request.forum.action.reason_title")),m("div",{className:"BasicsPage-reason-input"},m("textarea",{className:"FormControl",value:this.reason(),disabled:this.loading,oninput:m.withAttr("value",this.reason)}))):"",m("div",{className:"Form-group"},f.a.component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading,disabled:"Rejected"===this.approved()&&!this.reason(),children:app.translator.trans("fof-username-request.forum.action.submit_button")}))))},s.onsubmit=function(e){var t=this;e.preventDefault(),this.loading=!0,this.request.save({reason:this.reason(),action:this.approved()}).then(function(){app.alerts.show(t.successAlert=new v.a({type:"success",children:app.translator.trans("fof-username-request.forum.action.success")}))}),app.cache.username_requests.some(function(e,s){e.id()==t.request.id()&&app.cache.username_requests.splice(s,1)}),m.redraw(),this.hide()},t}(b.a),C=function(e){function t(){return e.apply(this,arguments)||this}i(t,e);var s=t.prototype;return s.init=function(){this.loading=!1},s.view=function(){var e=this,t=app.cache.username_requests||[];return m("div",{className:"NotificationList RequestsList"},m("div",{className:"NotificationList-header"},m("h4",{className:"App-titleControl App-titleControl--text"},app.translator.trans("fof-username-request.forum.dropdown.title"))),m("div",{className:"NotificationList-content"},m("ul",{className:"NotificationGroup-content"},t.length?t.map(function(t){return m("li",null,m("a",{onclick:e.showModal.bind(e,t),className:"Notification Request"},j()(t.user()),U()("fas fa-user-edit",{className:"Notification-icon"}),m("span",{className:"Notification-content"},app.translator.trans("fof-username-request.forum.dropdown.item_text",{username:A()(t.user())})),P()(t.createdAt()),m("div",{className:"Notification-excerpt"},app.translator.trans("fof-username-request.forum.dropdown.exerpt",{requestedUsername:t.requestedUsername()}))))}):this.loading?B.a.component({className:"LoadingIndicator--block"}):m("div",{className:"NotificationList-empty"},app.translator.trans("fof-username-request.forum.dropdown.empty_text")))))},s.showModal=function(e){app.modal.show(new T({request:e}))},s.load=function(){var e=this;app.cache.username_requests||(this.loading=!0,m.redraw(),app.store.find("username-requests").then(function(e){delete e.payload,app.cache.username_requests=e.sort(function(e,t){return e.createdAt()-t.createdAt()})}).catch(function(){}).then(function(){e.loading=!1,m.redraw()}))},t}(w.a),S=function(e){function t(){return e.apply(this,arguments)||this}i(t,e);var s=t.prototype;return s.init=function(){e.prototype.init.call(this),app.history.push("requests"),this.list=new C,this.list.load(),this.bodyClass="App--requests"},s.view=function(){return m("div",{className:"RequestsPage"},this.list.render())},t}(g.a),L=s(0),D=s.n(L),H=s(18),I=s.n(H),G=s(19),z=function(e){function t(){return e.apply(this,arguments)||this}i(t,e),t.initProps=function(t){t.label=t.label||app.translator.trans("fof-username-request.forum.dropdown.tooltip"),t.icon=t.icon||"fas fa-user-edit",e.initProps.call(this,t)};var s=t.prototype;return s.init=function(){e.prototype.init.call(this),this.list=new C},s.goToRoute=function(){m.route(app.route("username_requests"))},s.getUnreadCount=function(){return app.cache.username_requests?app.cache.username_requests.length:app.forum.data.relationships.username_requests.data.length},s.getNewCount=function(){return app.cache.username_requests?app.cache.username_requests.length:app.forum.data.relationships.username_requests.data.length},t}(s.n(G).a),E=function(e){function t(){return e.apply(this,arguments)||this}i(t,e);var s=t.prototype;return s.init=function(){e.prototype.init.call(this),this.request=app.session.user.username_requests()},s.className=function(){return"ResultsModal Modal"},s.title=function(){return app.translator.trans("fof-username-request.forum.results.title")},s.content=function(){return"Approved"===this.request.status()?m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("h2",null,app.translator.trans("fof-username-request.forum.results.approved")),m("h3",null,app.translator.trans("fof-username-request.forum.results.new_username",{username:app.session.user.username()})),m("div",{className:"Form-group"},m(f.a,{className:"Button Button--primary Button--block",onclick:this.hide.bind(this)},app.translator.trans("fof-username-request.forum.request.dismiss_button"))))):m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("h2",null,app.translator.trans("fof-username-request.forum.results.rejected")),m("h3",null,app.translator.trans("fof-username-request.forum.results.reason",{reason:this.request.reason(),i:m("i",null)})),m("p",{className:"helpText"},app.translator.trans("fof-username-request.forum.results.resubmit")),m("div",{className:"Form-group"},m(f.a,{className:"Button Button--primary Button--block",onclick:this.hide.bind(this)},app.translator.trans("fof-username-request.forum.request.dismiss_button")))))},s.onhide=function(){app.session.user.username_requests=m.prop(),this.request.save({delete:!0})},t}(b.a),J=s(8),K=s.n(J),Q=function(e){function t(){return e.apply(this,arguments)||this}i(t,e);var s=t.prototype;return s.init=function(){e.prototype.init.call(this),this.loading=!0,this.loadUser(m.route.param("username"))},s.content=function(){var e=this;return m("table",{className:"NotificationGrid"},this.user.usernameHistory().slice(0).reverse().map(function(t){var s=Object.keys(t)[0];return m("tr",null,m("td",null,s),m("td",null,P()(e.calculateTime(t[s]))))}))},s.show=function(e){this.user=e,m.redraw()},s.calculateTime=function(e){return new Date(0).setUTCSeconds(e)},t}(K.a),V=s(20),W=s.n(V);app.initializers.add("fof-username-request",function(){app.store.models["username-requests"]=c,n.a.prototype.username_requests=u.a.hasOne("username_requests"),n.a.prototype.usernameHistory=u.a.attribute("usernameHistory"),app.routes.username_requests={path:"/username-requests",component:m(S,null)},app.routes.username_history={path:"/u/:username/history",component:Q.component()},Object(r.extend)(h.a.prototype,"accountItems",function(e){app.forum.attribute("canRequestUsername")&&e.add("username-request",f.a.component({className:"Button",onclick:function(){app.modal.show(new _)}},[app.translator.trans("fof-username-request.forum.account_label")]),10)}),Object(r.extend)(I.a.prototype,"items",function(e){(D.a.forum.data.relationships.username_requests&&D.a.forum.data.relationships.username_requests.data.length&&!D.a.cache.username_requests||D.a.cache.username_requests&&0!==D.a.cache.username_requests.length)&&e.add("UsernameRequests",m(z,null),20)}),new Promise(function(){setTimeout(function(){D.a.session.user&&D.a.session.user.username_requests()&&"Sent"!==D.a.session.user.username_requests().status()&&D.a.modal.show(new E)},1e3)}),Object(r.extend)(K.a.prototype,"navItems",function(e){this.user.usernameHistory()&&e.add("username-requests",W.a.component({href:D.a.route("username_history",{username:this.user.username()}),children:D.a.translator.trans("fof-username-request.forum.profile_link"),icon:"fas fa-user-edit"}))})})}]);
//# sourceMappingURL=forum.js.map